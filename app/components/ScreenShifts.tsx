'use client';
import React from 'react';
import { G } from './tokens';
import { GMasthead, GLabel } from './shared';

const shifts = [
  { when: 'Tonight', dayLarge: '17', month: 'OCT', dow: 'Thu', time: '5:30 – 8:00 PM', dur: '2.5h', family: 'The Parks', title: 'Pickup + dinner', note: "Maya (7) & Theo (4). Pasta's in the fridge.", pay: '$18/hr', fresh: false },
  { when: 'Saturday · Anniversary', dayLarge: '19', month: 'OCT', dow: 'Sat', time: '6:00 – 10:00 PM', dur: '4h', family: 'The Parks', title: 'Date night', note: 'Bedtime routine. Parents nearby all night.', pay: '$22/hr', fresh: true },
  { when: 'Next Tuesday', dayLarge: '22', month: 'OCT', dow: 'Tue', time: '3:00 – 5:30 PM', dur: '2.5h', family: 'The Okonkwos', title: 'Piano + homework', note: 'Chidi (9). Walking distance from school.', pay: '$20/hr', fresh: false },
  { when: 'Next Saturday', dayLarge: '26', month: 'OCT', dow: 'Sat', time: '10:00 AM – 2:00 PM', dur: '4h', family: 'The Lees', title: 'Park + lunch', note: 'Two kids, siblings. Has a dog.', pay: '$20/hr', fresh: false },
];

function ShiftRow({ when, dayLarge, month, dow, time, dur, family, title, note, pay, fresh, first }: typeof shifts[0] & { first?: boolean }) {
  return (
    <article style={{ paddingTop: first ? 4 : 16, paddingBottom: 16, borderBottom: `1px solid ${G.hairline}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <GLabel color={G.ink}>{when}</GLabel>
        {fresh && (
          <div style={{
            padding: '2px 8px', borderRadius: 100,
            background: G.claySoft, color: G.clay,
            fontFamily: G.sans, fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
          }}>New</div>
        )}
        <div style={{ flex: 1, height: 1, background: G.hairline }} />
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{
          width: 58, flexShrink: 0,
          border: `1px solid ${G.ink}`, borderRadius: 6, overflow: 'hidden',
          textAlign: 'center', background: G.paper,
        }}>
          <div style={{ background: G.ink, color: '#FBF7F0', fontFamily: G.sans, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, padding: '3px 0' }}>{month}</div>
          <div style={{ fontFamily: G.display, fontSize: 26, fontWeight: 500, color: G.ink, padding: '4px 0 0', lineHeight: 1 }}>{dayLarge}</div>
          <div style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 10, color: G.muted, paddingBottom: 4 }}>{dow}</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: G.display, fontSize: 18, fontWeight: 500, color: G.ink, lineHeight: 1.15 }}>{title}</div>
          <div style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 12, color: G.ink2, marginTop: 2 }}>
            {time} · <span style={{ fontStyle: 'normal', color: G.muted }}>{family}</span>
          </div>
          <div style={{ fontSize: 12, color: G.ink2, marginTop: 6, lineHeight: 1.4 }}>{note}</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingLeft: 70 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontFamily: G.display, fontSize: 14, color: G.ink }}>{pay}</span>
          <span style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 12, color: G.muted }}>· {dur}</span>
        </div>
        <button style={{
          padding: '7px 14px',
          background: G.ink, color: '#FBF7F0',
          border: 'none', borderRadius: 100,
          fontFamily: G.sans, fontSize: 10, fontWeight: 700, letterSpacing: 1.4,
          textTransform: 'uppercase', cursor: 'pointer',
        }}>Claim</button>
      </div>
    </article>
  );
}

export function ScreenShifts() {
  return (
    <div style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: G.bg, color: G.ink }}>
      <GMasthead
        left="Thursday · Oct 17" right="4 open"
        title="Open Shifts"
        tagline="From three families in your village. Claim one to lock it in."
        folioLeft="No. 142" folioRight="The Slate"
      />

      <div style={{ padding: '4px 24px 10px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {['All', 'This week', 'Weekends', 'Evenings', 'Parks fam'].map((f, i) => (
          <div key={i} style={{
            padding: '6px 12px', borderRadius: 100, flexShrink: 0,
            background: i === 0 ? G.ink : 'transparent',
            color: i === 0 ? '#FBF7F0' : G.ink2,
            border: `1px solid ${i === 0 ? G.ink : G.hairline2}`,
            fontFamily: G.sans, fontSize: 11, fontWeight: 500,
          }}>{f}</div>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 24px 120px' }}>
        {shifts.map((s, i) => <ShiftRow key={i} {...s} first={i === 0} />)}
        <div style={{
          marginTop: 18, padding: '14px 12px', textAlign: 'center',
          borderTop: `1px solid ${G.hairline}`,
          fontFamily: G.serif, fontStyle: 'italic', color: G.muted, fontSize: 12,
        }}>
          That&apos;s the whole slate. Check back tomorrow.
        </div>
      </div>
    </div>
  );
}
