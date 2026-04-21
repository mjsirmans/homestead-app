'use client';
import React, { useState } from 'react';
import { G } from './tokens';
import { GMasthead, GLabel, GAvatar } from './shared';
import { HouseholdSwitcher } from './HouseholdSwitcher';

function AlmanacRow({ date, time, who, what, status, tone }: {
  date?: string; time: string; who: string; what: string;
  status?: 'done' | 'active'; tone?: 'clay' | 'muted';
}) {
  const c = tone === 'clay' ? G.clay : tone === 'muted' ? G.muted : G.ink;
  const dot = status === 'done' ? G.muted : status === 'active' ? G.clay : G.ink;
  return (
    <div style={{
      display: 'flex', gap: 12, padding: '10px 0',
      borderBottom: `1px solid ${G.hairline}`,
      opacity: status === 'done' ? 0.55 : 1,
    }}>
      <div style={{
        width: 6, height: 6, borderRadius: 6, background: dot, marginTop: 9, flexShrink: 0,
        boxShadow: status === 'active' ? `0 0 0 4px ${G.claySoft}` : 'none',
      }} />
      <div style={{ width: 62, flexShrink: 0 }}>
        {date && <div style={{ fontFamily: G.sans, fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', color: G.muted, fontWeight: 700 }}>{date}</div>}
        <div style={{ fontFamily: G.display, fontSize: 14, color: G.ink, fontWeight: 500 }}>{time}</div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: G.display, fontSize: 15, color: c, fontWeight: 500, lineHeight: 1.2 }}>{what}</div>
        <div style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 12, color: G.ink2, marginTop: 2 }}>{who}</div>
      </div>
    </div>
  );
}

function TonightView() {
  return (
    <>
      <div style={{
        marginTop: 4, padding: '22px 20px',
        background: G.paper, border: `1px solid ${G.ink}`, borderRadius: 10,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 10, right: 12,
          fontFamily: G.display, fontStyle: 'italic', fontSize: 60,
          color: G.cream, lineHeight: 1, userSelect: 'none',
        }}>R</div>
        <GLabel color={G.clay}>Active now · 5:30 – 8:00 PM</GLabel>
        <div style={{ fontFamily: G.display, fontSize: 40, fontWeight: 500, color: G.ink, marginTop: 8, lineHeight: 1, letterSpacing: '-0.01em' }}>
          <span style={{ fontStyle: 'italic' }}>Grandma Ruth</span>
        </div>
        <div style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 15, color: G.ink2, marginTop: 6, lineHeight: 1.4 }}>
          has the kids until bedtime.
        </div>
        <div style={{ height: 1, background: G.hairline, margin: '16px 0 12px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <GAvatar name="Ruth Park" size={36} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: G.sans, fontSize: 11, fontWeight: 600, color: G.ink }}>Pickup at 5:30</div>
            <div style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 12, color: G.muted }}>Dinner at home · lights out by 9</div>
          </div>
          <div style={{ width: 8, height: 8, borderRadius: 8, background: G.clay, boxShadow: `0 0 0 4px ${G.claySoft}` }} />
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 24, height: 1, background: G.ink }} />
          <GLabel color={G.ink}>Today&apos;s Shifts</GLabel>
          <div style={{ flex: 1, height: 1, background: G.hairline }} />
        </div>
        <AlmanacRow time="7:30 AM" who="Sam (dad)" what="School drop-off" status="done" />
        <AlmanacRow time="3:00 PM" who="Mom" what="Pickup + snack" status="done" />
        <AlmanacRow time="5:30 PM" who="Ruth (grandma)" what="Dinner + bedtime" status="active" />
      </div>

      <div style={{ marginTop: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 24, height: 1, background: G.ink }} />
          <GLabel color={G.ink}>Coming Up</GLabel>
          <div style={{ flex: 1, height: 1, background: G.hairline }} />
        </div>
        <AlmanacRow date="Fri · 18" time="8 AM" who="Mae (auntie)" what="School drop-off" />
        <AlmanacRow date="Sat · 19" time="6 PM" who="Open · needs someone" what="Anniversary dinner" tone="clay" />
        <AlmanacRow date="Sun · 20" time="10 AM" who="Family day" what="— no shifts —" tone="muted" />
      </div>
    </>
  );
}

function Legend({ color, label, ring }: { color: string; label: string; ring?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <div style={{
        width: ring ? 10 : 12, height: ring ? 10 : 3, borderRadius: ring ? 10 : 2,
        background: ring ? 'transparent' : color,
        border: ring ? `2px solid ${color}` : 'none',
      }} />
      <span style={{ letterSpacing: 0.6, textTransform: 'uppercase', fontSize: 9, fontWeight: 700 }}>{label}</span>
    </div>
  );
}

function MonthPending({ day, title, time }: { day: string; title: string; time: string }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 0', borderBottom: `1px solid ${G.hairline}`,
    }}>
      <div>
        <div style={{ fontFamily: G.sans, fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', color: G.clay, fontWeight: 700 }}>{day}</div>
        <div style={{ fontFamily: G.display, fontSize: 15, fontWeight: 500, marginTop: 2 }}>{title}</div>
        <div style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 12, color: G.muted }}>{time}</div>
      </div>
      <div style={{
        padding: '6px 12px', borderRadius: 100,
        border: `1px solid ${G.ink}`, fontFamily: G.sans,
        fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: G.ink,
      }}>Cover</div>
    </div>
  );
}

function MonthView() {
  const days: (number | null)[] = [];
  for (let i = 0; i < 35; i++) {
    const d = i - 2;
    days.push(d >= 1 && d <= 31 ? d : null);
  }
  const stat: Record<number, 'covered' | 'open'> = {
    2: 'covered', 3: 'covered', 4: 'covered', 7: 'covered', 8: 'covered',
    9: 'covered', 10: 'open', 14: 'covered', 15: 'covered', 16: 'covered',
    17: 'covered', 18: 'covered', 19: 'open', 21: 'covered', 22: 'covered',
    23: 'covered', 24: 'covered', 25: 'open', 28: 'covered', 29: 'covered', 30: 'covered',
  };

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 10 }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{
            textAlign: 'center', fontFamily: G.sans, fontSize: 9, fontWeight: 700,
            letterSpacing: 1.2, color: G.muted, textTransform: 'uppercase', paddingBottom: 6,
            borderBottom: `1px solid ${G.hairline}`,
          }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {days.map((d, i) => (
          <div key={i} style={{
            aspectRatio: '1', position: 'relative', padding: 4,
            background: d === 17 ? G.ink : G.paper,
            border: `1px solid ${G.hairline}`,
            color: d === 17 ? '#FBF7F0' : G.ink,
          }}>
            {d && (
              <>
                <div style={{ fontFamily: G.display, fontSize: 14, fontWeight: 500, fontStyle: d === 17 ? 'italic' : 'normal' }}>{d}</div>
                {stat[d] && (
                  <div style={{
                    position: 'absolute', bottom: 4, left: 4, right: 4, height: 3, borderRadius: 2,
                    background: stat[d] === 'open' ? G.clay : (d === 17 ? '#FBF7F0' : G.green),
                    opacity: stat[d] === 'open' ? 1 : 0.7,
                  }} />
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 18, marginTop: 18, justifyContent: 'center', fontFamily: G.sans, fontSize: 10, color: G.ink2, fontWeight: 500 }}>
        <Legend color={G.green} label="Covered" />
        <Legend color={G.clay} label="Needs someone" />
        <Legend color={G.ink} label="Today" ring />
      </div>

      <div style={{ marginTop: 22, paddingTop: 14, borderTop: `1px solid ${G.hairline2}` }}>
        <GLabel color={G.clay}>3 open this month</GLabel>
        <div style={{ marginTop: 8 }}>
          <MonthPending day="Sat · 19" title="Anniversary dinner" time="6–10 PM" />
          <MonthPending day="Sat · 25" title="Kids' soccer tourney" time="9 AM–1 PM" />
        </div>
      </div>
    </>
  );
}

export function ScreenAlmanac({ role = 'parent' }: { role?: 'parent' | 'caregiver' }) {
  const [view, setView] = useState<'tonight' | 'month'>('tonight');
  const isCg = role === 'caregiver';

  return (
    <div style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: G.bg, color: G.ink }}>
      <GMasthead
        leftAction={<HouseholdSwitcher />} right="October 2025"
        title={isCg ? 'My Schedule' : 'The Almanac'}
        tagline={
          isCg
            ? (view === 'tonight' ? 'Where you are tonight, and whom with.' : "The month you\u2019ve signed up for.")
            : (view === 'tonight' ? "Who\u2019s on tonight, and where." : 'The month at a glance.')
        }
        folioLeft="No. 142" folioRight="Homestead Press"
      />

      <div style={{ padding: '4px 24px 10px' }}>
        <div style={{
          display: 'flex', gap: 4, padding: 3,
          background: G.paper, border: `1px solid ${G.hairline2}`, borderRadius: 100,
        }}>
          {(['tonight', 'month'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              flex: 1, padding: '8px 12px', borderRadius: 100,
              background: view === v ? G.ink : 'transparent',
              color: view === v ? '#FBF7F0' : G.ink2,
              border: 'none', cursor: 'pointer',
              fontFamily: G.sans, fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
              textTransform: 'uppercase',
            }}>{v === 'tonight' ? 'Tonight' : 'The Month'}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px 120px' }}>
        {view === 'tonight' ? <TonightView /> : <MonthView />}
      </div>
    </div>
  );
}
