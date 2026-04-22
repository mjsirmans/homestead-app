import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { bells } from '@/lib/db/schema';
import { requireHousehold } from '@/lib/auth/household';
import { apiError } from '@/lib/api-error';
// PATCH /api/bell/[id] — { status: 'handled' | 'cancelled' }
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { user } = await requireHousehold();
    const { id: bellId } = await params;
    const { status } = await req.json() as { status: 'handled' | 'cancelled' };

    if (!['handled', 'cancelled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updates: { status: 'handled' | 'cancelled'; handledByUserId?: string; handledAt?: Date } = { status };
    if (status === 'handled') {
      updates.handledByUserId = user.id;
      updates.handledAt = new Date();
    }

    await db.update(bells).set(updates).where(eq(bells.id, bellId));
    return NextResponse.json({ ok: true });
  } catch (err) {
    return apiError(err, 'Bell action failed', 500, 'bell:id');
  }
}
