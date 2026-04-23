export function fmtTimeRange(startIso: string, endIso: string) {
  const s = new Date(startIso);
  const e = new Date(endIso);
  const t = (d: Date) => d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  return `${t(s)} – ${t(e)}`;
}

export function durationH(startIso: string, endIso: string) {
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime();
  return `${(ms / 3600000).toFixed(ms % 3600000 === 0 ? 0 : 1)}h`;
}
