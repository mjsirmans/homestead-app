'use client';
import React from 'react';
import { G } from './tokens';
import { GMasthead, GLabel, GAvatar, SectionHead } from './shared';
import { HouseholdSwitcher } from './HouseholdSwitcher';

function LedgerRow({ when, dur, title, who, kind, compact }: {
  when: string; dur?: string; title: string; who: string;
  kind: 'covered' | 'pending' | 'past'; compact?: boolean;
}) {
  const kindMap = {
    covered: { tag: 'Covered',           color: G.green },
    pending: { tag: 'Open · needs someone', color: G.clay },
    past:    { tag: 'Done',               color: G.muted },
  };
  const k = kindMap[kind];
  return (
    <div style={{
      display: 'flex', gap: 12, padding: compact ? '8px 0' : '12px 0',
      borderBottom: `1px solid ${G.hairline}`,
    }}>
      <div style={{ width: 56, flexShrink: 0 }}>
        <div style={{ fontFamily: G.display, fontSize: compact ? 14 : 18, color: G.ink, lineHeight: 1 }}>{when}</div>
        {dur && <div style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 11, color: G.muted, marginTop: 2 }}>{dur}</div>}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: G.display, fontSize: compact ? 14 : 16, fontWeight: 500, color: G.ink, lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 12, color: G.ink2, marginTop: 2 }}>{who}</div>
      </div>
      <div style={{
        fontFamily: G.sans, fontSize: 9, letterSpacing: 1, textTransform: 'uppercase',
        color: k.color, fontWeight: 700, alignSelf: 'center', textAlign: 'right',
        maxWidth: 90, lineHeight: 1.3,
      }}>{k.tag}</div>
    </div>
  );
}

function CaregiverHome() {
  return (
    <div style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: G.bg, color: G.ink }}>
      <GMasthead
        leftAction={<HouseholdSwitcher />} right="Thu · Oct 17"
        title="Ruth's Week"
        tagline="Two shifts claimed. One invitation waiting for you."
        folioLeft="No. 142" folioRight="Homestead Press"
      />
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 24px 120px' }}>
        {/* Next Up */}
        <div style={{ marginBottom: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 24, height: 1, background: G.ink }} />
            <GLabel color={G.ink}>Next Up · Tonight</GLabel>
            <div style={{ flex: 1, height: 1, background: G.hairline }} />
          </div>
          <div style={{
            background: G.paper, border: `1px solid ${G.hairline2}`,
            borderRadius: 8, padding: 16, position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: -1, left: -1, width: 4, height: 'calc(100% + 2px)',
              background: G.green, borderRadius: '8px 0 0 8px',
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <GLabel color={G.green}>5:30 – 8:00 PM · For the Parks</GLabel>
                <div style={{ fontFamily: G.display, fontSize: 22, fontWeight: 500, color: G.ink, marginTop: 4, lineHeight: 1.15 }}>
                  Pickup at school, dinner at home
                </div>
                <div style={{ fontFamily: G.serif, fontStyle: 'italic', color: G.ink2, fontSize: 13, marginTop: 4 }}>
                  Nora (8) &amp; Finn (5) · 412 Oak St.
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: G.display, fontSize: 22, color: G.green }}>2.5h</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
              <GAvatar name="Sarah Park" size={28} />
              <span style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 12, color: G.muted }}>
                Sarah confirmed with you
              </span>
              <div style={{ flex: 1 }} />
              <span style={{ fontFamily: G.sans, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: G.green, fontWeight: 700 }}>✓ Claimed</span>
            </div>
          </div>
        </div>

        {/* Direct Ask */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '18px 0 10px' }}>
          <div style={{ width: 24, height: 1, background: G.ink }} />
          <GLabel color={G.ink}>A Direct Ask</GLabel>
          <div style={{ flex: 1, height: 1, background: G.hairline }} />
        </div>
        <div style={{
          background: G.paper, border: `1px solid ${G.hairline2}`,
          borderRadius: 8, padding: 16, marginBottom: 10, position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: -1, left: -1, width: 4, height: 'calc(100% + 2px)',
            background: G.clay, borderRadius: '8px 0 0 8px',
          }} />
          <GLabel color={G.clay}>Saturday · 6 – 10 PM</GLabel>
          <div style={{ fontFamily: G.display, fontSize: 22, fontWeight: 500, color: G.ink, marginTop: 4, lineHeight: 1.15 }}>
            The Parks&apos; anniversary
          </div>
          <div style={{ fontFamily: G.serif, fontStyle: 'italic', color: G.ink2, fontSize: 13, marginTop: 4 }}>
            &ldquo;We&apos;d love you first if you can — no pressure if not.&rdquo;
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button style={{
              flex: 1, padding: '11px 14px',
              background: G.ink, color: '#FBF7F0',
              border: 'none', borderRadius: 6,
              fontFamily: G.sans, fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
              textTransform: 'uppercase', cursor: 'pointer',
            }}>I&apos;ve Got It</button>
            <button style={{
              flex: 1, padding: '11px 14px',
              background: 'transparent', color: G.ink2,
              border: `1px solid ${G.hairline2}`, borderRadius: 6,
              fontFamily: G.sans, fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
              textTransform: 'uppercase', cursor: 'pointer',
            }}>Can&apos;t this time</button>
          </div>
        </div>

        <SectionHead label="Claimed · This Week" />
        <LedgerRow when="Mon" title="School drop-off · Parks" who="8 AM · 1.5h" kind="past" compact />
        <LedgerRow when="Tue" title="Piano lesson · Nguyens" who="4 PM · 1h" kind="past" compact />
        <LedgerRow when="Thu" title="Dinner sit · Parks" who="5:30 PM · 2.5h" kind="covered" compact />

        <div style={{
          margin: '22px 4px 8px', padding: '18px 16px',
          borderTop: `1px solid ${G.ink}`, borderBottom: `1px solid ${G.ink}`,
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: G.display, fontStyle: 'italic', fontSize: 18, color: G.ink, lineHeight: 1.3 }}>
            &ldquo;Showing up is half the love.&rdquo;
          </div>
          <GLabel style={{ marginTop: 8 }}>— a grandmother, probably</GLabel>
        </div>
      </div>
    </div>
  );
}

export function ScreenHome({ onRing, role = 'parent' }: {
  onRing?: () => void;
  role?: 'parent' | 'caregiver';
}) {
  if (role === 'caregiver') return <CaregiverHome />;

  return (
    <div style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: G.bg, color: G.ink }}>
      <GMasthead
        leftAction={<HouseholdSwitcher />} right="Thu · Oct 17"
        title="The Homestead"
        tagline="Two shifts on the books. One still uncovered for Saturday."
        folioLeft="No. 142" folioRight="Homestead Press"
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 24px 120px' }}>
        {/* TODAY */}
        <div style={{ marginBottom: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 24, height: 1, background: G.ink }} />
            <GLabel color={G.ink}>Today</GLabel>
            <div style={{ flex: 1, height: 1, background: G.hairline }} />
          </div>
          <div style={{
            background: G.paper, border: `1px solid ${G.hairline2}`,
            borderRadius: 8, padding: 16, position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: -1, left: -1, width: 4, height: 'calc(100% + 2px)',
              background: G.green, borderRadius: '8px 0 0 8px',
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <GLabel color={G.green}>5:30 – 8:00 PM · Evening</GLabel>
                <div style={{ fontFamily: G.display, fontSize: 22, fontWeight: 500, color: G.ink, marginTop: 4, lineHeight: 1.15 }}>
                  Grandma Ruth has the kids
                </div>
                <div style={{ fontFamily: G.serif, fontStyle: 'italic', color: G.ink2, fontSize: 13, marginTop: 4 }}>
                  Pickup at school · dinner at home
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: G.display, fontSize: 22, color: G.green }}>2.5h</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
              <GAvatar name="Ruth Park" size={28} />
              <span style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 12, color: G.muted }}>
                Ruth confirmed this morning
              </span>
              <div style={{ flex: 1 }} />
              <span style={{ fontFamily: G.sans, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: G.green, fontWeight: 700 }}>✓ Covered</span>
            </div>
          </div>
        </div>

        {/* TOMORROW */}
        <SectionHead label="Tomorrow · Friday" />
        <LedgerRow when="8:00 AM" dur="2h" title="School drop-off" who="Auntie Mae claimed" kind="covered" />
        <LedgerRow when="3:00 PM" dur="3h" title="Piano + snack" who="Posted to the village" kind="pending" />

        {/* SATURDAY */}
        <SectionHead label="Saturday · Date Night" />
        <div style={{
          background: G.paper, border: `1px solid ${G.hairline2}`,
          borderRadius: 8, padding: 16, marginBottom: 10, position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: -1, left: -1, width: 4, height: 'calc(100% + 2px)',
            background: G.clay, borderRadius: '8px 0 0 8px',
          }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <GLabel color={G.clay}>Still uncovered · 2 days out</GLabel>
              <div style={{ fontFamily: G.display, fontSize: 22, fontWeight: 500, color: G.ink, marginTop: 4, lineHeight: 1.15 }}>
                Anniversary dinner
              </div>
              <div style={{ fontFamily: G.serif, fontStyle: 'italic', color: G.ink2, fontSize: 13, marginTop: 4 }}>
                6 – 10 PM · Lincoln Park
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: G.display, fontSize: 22, color: G.clay }}>4h</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 12, alignItems: 'center' }}>
            <GAvatar name="Ruth Park" size={24} />
            <GAvatar name="Mae Lin" size={24} />
            <GAvatar name="Sam Park" size={24} />
            <span style={{ fontSize: 11, color: G.muted, fontStyle: 'italic', fontFamily: G.serif, marginLeft: 4 }}>
              3 seen · 0 claimed
            </span>
          </div>
          <button onClick={onRing} style={{
            marginTop: 12, width: '100%', padding: '11px 14px',
            background: G.ink, color: '#FBF7F0',
            border: 'none', borderRadius: 6,
            fontFamily: G.sans, fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
            textTransform: 'uppercase', cursor: 'pointer',
          }}>Ring the Bell</button>
        </div>

        {/* LEDGER */}
        <SectionHead label="The Ledger · This Week" />
        <LedgerRow when="Mon" title="Soccer practice" who="Dad covered" kind="past" compact />
        <LedgerRow when="Tue" title="Sick day · flu" who="Mom stayed home" kind="past" compact />
        <LedgerRow when="Wed" title="Dentist" who="Grandpa drove" kind="past" compact />

        <div style={{
          margin: '22px 4px 8px', padding: '18px 16px',
          borderTop: `1px solid ${G.ink}`, borderBottom: `1px solid ${G.ink}`,
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: G.display, fontStyle: 'italic', fontSize: 18, color: G.ink, lineHeight: 1.3 }}>
            &ldquo;It takes a village to raise a child.&rdquo;
          </div>
          <GLabel style={{ marginTop: 8 }}>— old proverb</GLabel>
        </div>
      </div>
    </div>
  );
}
