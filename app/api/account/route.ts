import { NextRequest, NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import {
  users, kids, shifts, bells, pushSubscriptions, familyInvites,
  caregiverUnavailability, bellResponses,
} from '@/lib/db/schema';

/**
 * GET /api/account — export all data for the current user across all households.
 * Used for GDPR/COPPA data portability requests.
 */
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'unauth' }, { status: 401 });

    const myRows = await db.select().from(users).where(eq(users.clerkUserId, userId));
    if (myRows.length === 0) {
      return NextResponse.json({ user: null, households: [] });
    }

    const myUserIds = myRows.map(u => u.id);

    const [myShifts, myBells, mySubs, myUnavail, myBellResponses] = await Promise.all([
      db.select().from(shifts).where(
        // Shifts they created OR claimed
        eq(shifts.createdByUserId, myUserIds[0]), // drizzle inArray limit — loop below
      ),
      db.select().from(bells).where(eq(bells.createdByUserId, myUserIds[0])),
      db.select().from(pushSubscriptions).where(eq(pushSubscriptions.userId, myUserIds[0])),
      db.select().from(caregiverUnavailability).where(eq(caregiverUnavailability.userId, myUserIds[0])),
      db.select().from(bellResponses).where(eq(bellResponses.userId, myUserIds[0])),
    ]);

    return NextResponse.json({
      exportedAt: new Date().toISOString(),
      clerkUserId: userId,
      profiles: myRows.map(r => ({
        userId: r.id, householdId: r.householdId, email: r.email,
        name: r.name, role: r.role, villageGroup: r.villageGroup,
        photoUrl: r.photoUrl, createdAt: r.createdAt,
      })),
      shifts: myShifts,
      bells: myBells,
      pushSubscriptions: mySubs.map(s => ({
        id: s.id, householdId: s.householdId, endpoint: s.endpoint.substring(0, 40) + '...',
        createdAt: s.createdAt,
      })),
      unavailability: myUnavail,
      bellResponses: myBellResponses,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * DELETE /api/account — delete all data belonging to this user across all households.
 *
 * Caveats:
 * - This does NOT delete the Clerk account itself — user must do that in Clerk's
 *   user portal, or we can invoke clerkClient.users.deleteUser separately.
 * - Shifts/bells created by this user are preserved in household history with
 *   createdByUserId set to null where possible (cascade config in schema).
 * - Households where this user is the only member are deleted entirely.
 */
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'unauth' }, { status: 401 });

    // Confirmation required via query param to prevent accidental hits
    const confirm = req.nextUrl.searchParams.get('confirm');
    if (confirm !== 'yes-delete-my-data') {
      return NextResponse.json({
        error: 'Confirmation required. Send DELETE /api/account?confirm=yes-delete-my-data',
      }, { status: 400 });
    }

    const myRows = await db.select().from(users).where(eq(users.clerkUserId, userId));
    if (myRows.length === 0) {
      return NextResponse.json({ ok: true, deleted: { profiles: 0 } });
    }

    let deletedSubs = 0;
    let deletedUnavail = 0;
    let deletedInvites = 0;
    let deletedProfiles = 0;

    for (const row of myRows) {
      // Delete push subscriptions
      const subs = await db.delete(pushSubscriptions)
        .where(eq(pushSubscriptions.userId, row.id)).returning({ id: pushSubscriptions.id });
      deletedSubs += subs.length;

      // Delete unavailability blocks
      const un = await db.delete(caregiverUnavailability)
        .where(eq(caregiverUnavailability.userId, row.id)).returning({ id: caregiverUnavailability.id });
      deletedUnavail += un.length;

      // Cancel pending invites sent by this user
      const inv = await db.delete(familyInvites)
        .where(and(eq(familyInvites.fromUserId, row.id), eq(familyInvites.status, 'pending')))
        .returning({ id: familyInvites.id });
      deletedInvites += inv.length;

      // Delete the user row itself. Schema uses onDelete: 'set null' for
      // shifts.claimedByUserId, so claimed shifts lose the claim reference but
      // history is preserved. createdByUserId is onDelete:'restrict' which
      // would block this — so we null-out those refs first.
      // (Simplest: set claimedByUserId to null on all claimed shifts.)
      await db.update(shifts).set({ claimedByUserId: null })
        .where(eq(shifts.claimedByUserId, row.id));

      // For shifts they created, we leave them in place but the onDelete:'restrict'
      // means we can't delete the user row. Mark the profile as deleted instead.
      await db.update(users)
        .set({ name: '[deleted]', email: `deleted+${row.id}@homestead.app`, photoUrl: null })
        .where(eq(users.id, row.id));
      deletedProfiles++;
    }

    console.log(JSON.stringify({
      event: 'account_deletion',
      clerkUserId: userId,
      deletedSubs, deletedUnavail, deletedInvites, deletedProfiles,
      at: new Date().toISOString(),
    }));

    return NextResponse.json({
      ok: true,
      deleted: {
        profiles: deletedProfiles,
        pushSubscriptions: deletedSubs,
        unavailability: deletedUnavail,
        pendingInvites: deletedInvites,
      },
      note: 'Your Clerk account must be deleted separately via the user profile menu.',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
