/** Global Constants for the 1.0 Architecture */
export const TILE_W = 3.82;
export const BASE_Y = 0.2;

/** Simple function to darken hex colors for the 'model' look */
export function darken(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#",""), 16),
  amt = Math.round(2.55 * percent),
  R = (num >> 16) - amt,
  G = (num >> 8 & 0x00FF) - amt,
  B = (num & 0x0000FF) - amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}
