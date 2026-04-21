export const G = {
  bg:        '#FBF7F0',
  paper:     '#FFFFFF',
  ink:       '#1B1713',
  ink2:      '#4A423A',
  muted:     '#8A8078',
  hairline:  'rgba(27,23,19,0.12)',
  hairline2: 'rgba(27,23,19,0.22)',
  green:     '#2F4A2A',
  greenSoft: '#E8EDE2',
  clay:      '#B05A3A',
  claySoft:  '#F1DCC9',
  mustard:   '#B8893B',
  cream:     '#F5EFE3',
  display: '"Fraunces", "Spectral", Georgia, serif',
  serif:   '"Spectral", Georgia, serif',
  sans:    '"Inter Tight", -apple-system, system-ui, sans-serif',
} as const;

export const RED      = '#B5342B';
export const RED_DARK = '#7D1F14';
export const BELL_BG  = '#FFF6F1';

const TONES = ['#B05A3A','#2F4A2A','#B8893B','#7A4A38','#5D6E54','#C48A5B','#8A9A7B'];
export function avatarColor(name: string): string {
  const seed = (name.charCodeAt(0) || 0) + (name.charCodeAt(1) || 0);
  return TONES[seed % TONES.length];
}
