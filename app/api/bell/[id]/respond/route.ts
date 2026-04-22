import { NextRequest, NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db';
import { bells, bellResponses, users } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs/server';
import { apiError } from '@/lib/api-error';
type ResponseBody = { response: 'on_my_way' | 'in_thirty' | 'cannot' };

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: bellId } = await params;
    const body = await req.json() as ResponseBody;
    const { response } = body;

    if (!['on_my_way', 'in_thirty', 'cannot'].includes(response)) {
      return NextResponse.json({ error: 'Invalid response' }, { status: 400 });
    }

    const [bell] = await db.select().from(bells).where(eq(bells.id, bellId)).limit(1);
    if (!bell) return NextResponse.json({ error: 'Bell not found' }, { status: 404 });

    // Find this user's DB record for the bell's household
    const [userRow] = await db.select().from(users)
      .where(and(eq(users.clerkUserId, userId), eq(users.householdId, bell.householdId)))
      .limit(1);
    if (!userRow) return NextResponse.json({ error: 'Not a member of this household' }, { status: 403 });

    // Upsert response (one per user per bell)
    const existing = await db.select().from(bellResponses)
      .where(and(eq(bellResponses.bellId, bellId), eq(bellResponses.userId, userRow.id)))
      .limit(1);

    if (existing.length > 0) {
      await db.update(bellResponses)
        .set({ response, respondedAt: new Date() })
        .where(and(eq(bellResponses.bellId, bellId), eq(bellResponses.userId, userRow.id)));
    } else {
      await db.insert(bellResponses).values({
        bellId,
        userId: userRow.id,
        response,
      });
    }

    // If on_my_way, mark bell handled
    if (response === 'on_my_way') {
      await db.update(bells)
        .set({ status: 'handled', handledByUserId: userRow.id, handledAt: new Date() })
        .where(eq(bells.id, bellId));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return apiError(err, 'Could not respond to bell', 500, 'bell:respond');
  }
}
