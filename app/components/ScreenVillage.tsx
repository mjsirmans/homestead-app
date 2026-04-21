'use client';
import React from 'react';
import { G } from './tokens';
import { GMasthead, GLabel, GAvatar, GHead } from './shared';

function GroupHeader({ count, label, note }: { count: number; label: string; note: string }) {
  return (
    <div style={{ margin: '4px 0 10px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <GHead size={18}>{label}</GHead>
        <span style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 13, color: G.muted }}>· {count}</span>
      </div>
      <GLabel style={{ marginTop: 2 }}>{note}</GLabel>
    </div>
  );
}

function MemberCard({ name, role, active }: { name: string; role: string; active?: boolean }) {
  return (
    <div style={{
      background: G.bg, border: `1px solid ${G.hairline}`,
      borderRadius: 8, padding: 12, position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <GAvatar name={name} size={40} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: G.display, fontSize: 14, fontWeight: 500, lineHeight: 1.15 }}>{name}</div>
          <div style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 10.5, color: G.muted, marginTop: 2, lineHeight: 1.3 }}>{role}</div>
        </div>
        {active && <div style={{ width: 6, height: 6, borderRadius: 6, background: G.green, flexShrink: 0 }} />}
      </div>
    </div>
  );
}

function SmallMember({ name }: { name: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <GAvatar name={name} size={48} />
      </div>
      <div style={{ fontFamily: G.display, fontSize: 12, fontWeight: 500, marginTop: 6, lineHeight: 1.2 }}>{name}</div>
    </div>
  );
}

function ListMember({ name, role, tag }: { name: string; role: string; tag: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 0', borderBottom: `1px solid ${G.hairline}`,
    }}>
      <GAvatar name={name} size={40} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: G.display, fontSize: 14, fontWeight: 500, lineHeight: 1.15 }}>{name}</div>
        <div style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 11, color: G.muted }}>{role}</div>
      </div>
      <div style={{ fontFamily: G.sans, fontSize: 10, fontWeight: 700, letterSpacing: 1, color: G.mustard }}>{tag}</div>
    </div>
  );
}

export function ScreenVillage() {
  return (
    <div style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: G.bg, color: G.ink }}>
      <GMasthead
        left="14 people" right="+ invite"
        title="The Village"
        tagline="Grouped by how close they are when the call goes out."
        folioLeft="No. 142" folioRight="Homestead Press"
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 24px 120px' }}>
        {/* Inner Circle */}
        <GroupHeader count={4} label="Inner Circle" note="rung first · no asking" />
        <div style={{ background: G.paper, border: `1px solid ${G.hairline2}`, borderRadius: 10, padding: 14, marginBottom: 18 }}>
          <div style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 12, color: G.ink2, marginBottom: 12, lineHeight: 1.4 }}>
            Knows the schedule. Has a key. Can show up in under an hour.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            <MemberCard name="Ruth Park"  role="Grandma · lives 12 min away" active />
            <MemberCard name="Mae Lin"    role="Auntie · has a key" active />
            <MemberCard name="Sam Park"   role="Dad" active />
            <MemberCard name="Omar K."    role="Best friend · next door" active />
          </div>
        </div>

        {/* Family + Close */}
        <GroupHeader count={5} label="Family & Close Friends" note="rung second" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 }}>
          <SmallMember name="Jen R." />
          <SmallMember name="Dad" />
          <SmallMember name="Aunt Lou" />
          <SmallMember name="Priya S." />
          <SmallMember name="Ben T." />
        </div>

        {/* Trusted Sitters */}
        <GroupHeader count={3} label="Trusted Sitters" note="paid · available on demand" />
        <div style={{ marginBottom: 18 }}>
          <ListMember name="Alejandra V." role="$20/hr · 3 kids' worth of CPR" tag="★ 5.0" />
          <ListMember name="Tom H."       role="$18/hr · walks dogs too"       tag="★ 4.9" />
          <ListMember name="Keisha M."    role="$22/hr · certified teacher"    tag="★ 5.0" />
        </div>

        {/* Wider Village */}
        <GroupHeader count={2} label="The Wider Village" note="for when we've exhausted the rest" />
        <div style={{ background: G.paper, border: `1px solid ${G.hairline}`, borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex' }}>
            {['Nina R.', 'Carl S.'].map((n, i) => (
              <div key={i} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                <GAvatar name={n} size={32} />
              </div>
            ))}
          </div>
          <div style={{ flex: 1, fontFamily: G.serif, fontStyle: 'italic', fontSize: 12, color: G.ink2 }}>
            Nina & Carl — neighbors, met once
          </div>
          <span style={{ fontFamily: G.sans, fontSize: 14, color: G.muted }}>›</span>
        </div>

        {/* Invite CTA */}
        <div style={{
          marginTop: 26, padding: 18, textAlign: 'center',
          borderTop: `1px solid ${G.ink}`, borderBottom: `1px solid ${G.ink}`,
        }}>
          <div style={{ fontFamily: G.display, fontStyle: 'italic', fontSize: 17, color: G.ink, lineHeight: 1.3 }}>
            &ldquo;Many hands make light work.&rdquo;
          </div>
          <button style={{
            marginTop: 12, padding: '10px 20px',
            background: G.ink, color: '#FBF7F0', border: 'none', borderRadius: 100,
            fontFamily: G.sans, fontSize: 11, fontWeight: 700, letterSpacing: 1.4,
            textTransform: 'uppercase', cursor: 'pointer',
          }}>Invite someone</button>
        </div>
      </div>
    </div>
  );
}
