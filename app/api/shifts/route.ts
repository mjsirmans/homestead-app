import { NextRequest, NextResponse } from 'next/server';
import { and, eq, gte, desc, asc, inArray } from 'drizzle-orm';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { shifts, users, households } from '@/lib/db/schema';
import { requireHousehold } from '@/lib/auth/household';

export async function GET(req: NextRequest) {
  try {
    const { user } = await requireHousehold();
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'unauth' }, { status: 401 });

    const scope = req.nextUrl.searchParams.get('scope') || 'household';

    // Caregivers can see open shifts across all households they belong to
    if (scope === 'village' && user.role === 'caregiver') {
      const client = await clerkClient();
      const memberships = await client.users.getOrganizationMembershipList({ userId });
      const orgIds = memberships.data.map(m => m.organization.id);
      const hhRows = orgIds.length
        ? await db.select().from(households).where(inArray(households.clerkOrgId, orgIds))
        : [];
      const hhIds = hhRows.map(h => h.id);
      if (!hhIds.length) return NextResponse.json({ shifts: [] });

      const rows = await db.select({
        shift: shifts,
        household: households,
        creator: users,
      })
        .from(shifts)
        .leftJoin(households, eq(shifts.householdId, households.id))
        .leftJoin(users, eq(shifts.createdByUserId, users.id))
        .where(and(
          inArray(shifts.householdId, hhIds),
          eq(shifts.status, 'open'),
          gte(shifts.endsAt, new Date()),
        ))
        .orderBy(asc(shifts.startsAt));

      return NextResponse.json({ shifts: rows });
    }

    // Default: all shifts in active household
    const { household } = await requireHousehold();
    const rows = await db.select({
      shift: shifts,
      household: households,
      creator: users,
    })
      .from(shifts)
      .leftJoin(households, eq(shifts.householdId, households.id))
      .leftJoin(users, eq(shifts.createdByUserId, users.id))
      .where(eq(shifts.householdId, household.id))
      .orderBy(desc(shifts.startsAt));

    return NextResponse.json({ shifts: rows });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { household, user } = await requireHousehold();
    if (user.role !== 'parent') {
      return NextResponse.json({ error: 'Only parents can post shifts' }, { status: 403 });
    }
    const body = await req.json() as {
      title?: string;
      forWhom?: string;
      notes?: string;
      startsAt?: string;
      endsAt?: string;
      rateCents?: number | null;
    };

    if (!body.title || !body.startsAt || !body.endsAt) {
      return NextResponse.json({ error: 'title, startsAt, endsAt required' }, { status: 400 });
    }

    const starts = new Date(body.startsAt);
    const ends = new Date(body.endsAt);
    if (isNaN(+starts) || isNaN(+ends) || ends <= starts) {
      return NextResponse.json({ error: 'invalid time range' }, { status: 400 });
    }

    const [created] = await db.insert(shifts).values({
      householdId: household.id,
      createdByUserId: user.id,
      title: body.title.trim().slice(0, 200),
      forWhom: body.forWhom?.trim().slice(0, 200) || null,
      notes: body.notes?.trim().slice(0, 2000) || null,
      startsAt: starts,
      endsAt: ends,
      rateCents: body.rateCents ?? null,
    }).returning();

    return NextResponse.json({ shift: created });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
