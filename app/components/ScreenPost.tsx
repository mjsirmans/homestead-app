'use client';
import React from 'react';
import { G } from './tokens';
import { GMasthead, GLabel } from './shared';
import { useHousehold } from './HouseholdSwitcher';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginTop: 22 }}>
      <GLabel>{label}</GLabel>
      <div style={{
        marginTop: 6, paddingBottom: 8,
        borderBottom: `1px solid ${G.ink}`,
        fontFamily: G.display, fontSize: 22, fontWeight: 500, color: G.ink,
      }}>{value}</div>
    </div>
  );
}

function PillField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      padding: '10px 12px', borderRadius: 8,
      border: `1px solid ${G.hairline2}`, background: G.paper,
    }}>
      <div style={{ fontFamily: G.sans, fontSize: 9, letterSpacing: 1.2, textTransform: 'uppercase', color: G.muted, fontWeight: 700 }}>{label}</div>
      <div style={{ fontFamily: G.display, fontSize: 14, color: G.ink, marginTop: 3, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

export function ScreenPost({ onCancel, onPost }: {
  onCancel?: () => void;
  onPost?: () => void;
}) {
  const { active, all } = useHousehold();
  const multi = all.length > 1;
  return (
    <div style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: G.bg, color: G.ink }}>
      <GMasthead
        leftAction={
          <button onClick={onCancel} style={{
            fontFamily: G.display, fontSize: 26, color: G.ink, lineHeight: 1,
            background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
          }}>×</button>
        }
        right="Saturday · Oct 19"
        title="Post a Need"
        tagline="For a last-minute need, ring the bell instead."
        folioLeft="No. 143"
        folioRight="Homestead Press"
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px 120px' }}>
        {multi && active && (
          <div style={{
            marginTop: 4, padding: '10px 12px',
            background: G.paper, border: `1px solid ${G.hairline2}`,
            borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>{active.glyph}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: G.sans, fontSize: 9, letterSpacing: 1.2, textTransform: 'uppercase', color: G.muted, fontWeight: 700 }}>
                Posting to
              </div>
              <div style={{ fontFamily: G.display, fontSize: 14, color: G.ink, fontWeight: 500 }}>
                {active.name}
              </div>
            </div>
            <div style={{ fontFamily: G.serif, fontStyle: 'italic', fontSize: 11, color: G.muted }}>
              switch in masthead
            </div>
          </div>
        )}
        <Field label="For" value="Maya & Theo" />

        <div style={{ marginTop: 22 }}>
          <GLabel>When</GLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
            <PillField label="Starts" value="Sat Oct 19 · 6:00 PM" />
            <PillField label="Ends" value="10:00 PM" />
          </div>
          <div style={{
            marginTop: 8, display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: G.serif, fontStyle: 'italic', fontSize: 12, color: G.muted,
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke={G.muted} strokeWidth="1" />
              <path d="M6 3v3l2 1.5" stroke={G.muted} strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span>Posting now gives 6 days notice · good window</span>
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <GLabel>What</GLabel>
          <div style={{
            marginTop: 8, padding: 14, borderRadius: 8,
            border: `1px solid ${G.hairline2}`, background: G.paper,
            fontFamily: G.serif, fontStyle: 'italic', fontSize: 14, color: G.ink, lineHeight: 1.5,
            minHeight: 88,
          }}>
            Pickup from school at 6, dinner at home (leftover pasta), stories by 8:30, lights out at 9. Anniversary dinner — will have phones on.
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <GLabel>Ask the village</GLabel>
            <GLabel color={G.muted}>tap to adjust</GLabel>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {['Inner circle', 'Family & close friends', 'Trusted sitters'].map((n, i) => (
              <div key={i} style={{
                padding: '8px 13px', borderRadius: 100,
                border: `1px solid ${i < 2 ? G.ink : G.hairline2}`,
                background: i < 2 ? G.ink : 'transparent',
                color: i < 2 ? '#FBF7F0' : G.ink2,
                fontFamily: G.sans, fontSize: 11, fontWeight: 500,
              }}>{i < 2 && '✓ '}{n}</div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontFamily: G.serif, fontStyle: 'italic', fontSize: 12, color: G.muted }}>
            9 people will see this.
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <GLabel>Offer</GLabel>
          <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <PillField label="Rate" value="$22/hr" />
            <PillField label="Extras" value="Leftover pasta" />
          </div>
        </div>

        <button onClick={onPost} style={{
          marginTop: 28, width: '100%', padding: '16px 14px',
          background: G.ink, color: '#FBF7F0', border: 'none', borderRadius: 8,
          fontFamily: G.sans, fontSize: 12, fontWeight: 700, letterSpacing: 1.8,
          textTransform: 'uppercase', cursor: 'pointer',
        }}>Post to the Village</button>

        <div style={{
          marginTop: 14, textAlign: 'center',
          fontFamily: G.serif, fontStyle: 'italic', fontSize: 12, color: G.muted,
        }}>
          Last-minute?{' '}
          <span style={{ color: G.clay, borderBottom: `1px solid ${G.clay}`, paddingBottom: 1 }}>
            Ring the bell instead →
          </span>
        </div>
      </div>
    </div>
  );
}
