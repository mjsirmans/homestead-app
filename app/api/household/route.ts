import { NextRequest, NextResponse } from 'next/server';
import { eq, inArray } from 'drizzle-orm';
import { db } from '@/lib/db';
import { households, users } from '@/lib/db/schema';
import { requireHousehold } from '@/lib/auth/household';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { household, user } = await requireHousehold();
    const { userId } = await auth();
    const client = await clerkClient();
    const memberships = await client.users.getOrganizationMembershipList({ userId: userId! });

    const allHouseholds = await Promise.all(
      memberships.data.map(async m => {
        const [h] = await db.select().from(households).where(eq(households.clerkOrgId, m.organization.id)).limit(1);
        return h ? {
          id: h.id,
          clerkOrgId: h.clerkOrgId,
          name: h.name,
          glyph: h.glyph,
          accentColor: h.accentColor,
          active: m.organization.id === household.clerkOrgId,
        } : null;
      })
    );

    const validHouseholds = allHouseholds.filter(Boolean) as NonNullable<typeof allHouseholds[0]>[];
    const hhIds = validHouseholds.map(h => h.id);

    // Role of this Clerk user in each of their households
    const myRoleRows = hhIds.length
      ? await db.select({ householdId: users.householdId, role: users.role })
          .from(users)
          .where(eq(users.clerkUserId, userId!))
      : [];
    const rolesByHousehold: Record<string, 'parent' | 'caregiver'> = {};
    for (const r of myRoleRows) {
      if (hhIds.includes(r.householdId)) rolesByHousehold[r.householdId] = r.role;
    }
    const roles = Object.values(rolesByHousehold);
    const isDualRole = roles.includes('parent') && roles.includes('caregiver');

    return NextResponse.json({
      household,
      user,
      allHouseholds: validHouseholds,
      rolesByHousehold,
      isDualRole,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { household } = await requireHousehold();
    const body = await req.json();
    const { name, glyph } = body as { name?: string; glyph?: string };

    const updates: { name?: string; glyph?: string; setupCompleteAt?: Date } = {};
    if (typeof name === 'string' && name.trim()) updates.name = name.trim();
    if (typeof glyph === 'string' && glyph.trim()) updates.glyph = glyph.trim();

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
    }

    updates.setupCompleteAt = new Date();

    const [updated] = await db.update(households)
      .set(updates)
      .where(eq(households.id, household.id))
      .returning();

    if (updates.name) {
      const { orgId } = await auth();
      if (orgId) {
        const client = await clerkClient();
        await client.organizations.updateOrganization(orgId, { name: updates.name });
      }
    }

    return NextResponse.json({ household: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
