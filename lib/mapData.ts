// =============================================================================
// mapData.ts — Peckham road network, redesigned as a proper grid with
// explicit 90° corners and edge definitions.
//
// Coordinate system: x = east/west, z = north(neg)/south(pos)
// Victoria is the anchor at [0,0]. All other nodes are relative to it.
//
// Road topology:
//   Choumert Rd  ────── Montpelier ── Victoria ── (east) ── Gowlett corner
//                                        │                         │ (south)
//                                   Bellenden Rd              Gowlett Arms
//                                        │
//                                  Adys Rd corner ── (west) ── EDT
//                                        │
//                                   Rye approach
//                                        │
//                                  Barry Rd corner ── Clockhouse
// =============================================================================

export interface MapNode {
  id:       string
  x:        number
  z:        number
  type:     'pub' | 'road' | 'park'
  name:     string
  color:    string
  street:   string
  features: { roof: string; seating: string; levels: number }
}

export const mapNodes: MapNode[] = [

  // ── Choumert Rd (E–W backbone, z = 0) ────────────────────────────────────
  {
    id: 'montpelier', x: -12, z: 0, type: 'pub', name: 'MONTPELIER',
    color: '#2d3e6a', street: 'Choumert Rd',
    features: { roof: 'flat', seating: 'tables', levels: 3 },
  },
  {
    id: 'victoria', x: 0, z: 0, type: 'pub', name: 'THE VICTORIA',
    color: '#c4826a', street: 'Bellenden Rd',
    features: { roof: 'turret', seating: 'benches', levels: 3 },
  },
  {
    id: 'choumert_e', x: 22, z: 0, type: 'road', name: '', color: '',
    street: 'Choumert Rd', features: { roof: '', seating: '', levels: 0 },
  },

  // ── Gowlett Rd branch — 90° corner south from Choumert ───────────────────
  {
    id: 'gowlett_corner', x: 40, z: 0, type: 'road', name: '', color: '',
    street: 'Gowlett Rd', features: { roof: '', seating: '', levels: 0 },
  },
  {
    id: 'gowlett', x: 40, z: -15, type: 'pub', name: 'GOWLETT',
    color: '#b87462', street: 'Gowlett Rd',
    features: { roof: 'stepped', seating: 'stools', levels: 2 },
  },

  // ── Bellenden Rd south (N–S, x = 0) ──────────────────────────────────────
  {
    id: 'bell_s1', x: 0, z: 22, type: 'road', name: '', color: '',
    street: 'Bellenden Rd', features: { roof: '', seating: '', levels: 0 },
  },
  {
    id: 'adys_corner', x: 0, z: 50, type: 'road', name: '', color: '',
    street: 'Adys Rd', features: { roof: '', seating: '', levels: 0 },
  },

  // ── Adys Rd west branch ───────────────────────────────────────────────────
  {
    id: 'adys_w', x: -22, z: 50, type: 'road', name: '', color: '',
    street: 'Adys Rd', features: { roof: '', seating: '', levels: 0 },
  },
  {
    id: 'edt', x: -42, z: 50, type: 'pub', name: 'EDT',
    color: '#eaccad', street: 'Lordship Lane',
    features: { roof: 'gabled', seating: 'booths', levels: 3 },
  },

  // ── South to Peckham Rye ──────────────────────────────────────────────────
  {
    id: 'rye_approach', x: 0, z: 80, type: 'road', name: '', color: '',
    street: 'Rye Lane', features: { roof: '', seating: '', levels: 0 },
  },
  {
    id: 'barry_corner', x: -30, z: 80, type: 'road', name: '', color: '',
    street: 'Barry Rd', features: { roof: '', seating: '', levels: 0 },
  },
  {
    id: 'clockhouse', x: -30, z: 90, type: 'pub', name: 'CLOCK HOUSE',
    color: '#b28dbe', street: 'Peckham Rye',
    features: { roof: 'clock-tower', seating: 'garden', levels: 2 },
  },
]


// ---------------------------------------------------------------------------
// Explicit road connections — used by Path.tsx to draw plinth segments.
// Each tuple [a, b] draws a segment from node a to node b.
// ---------------------------------------------------------------------------
export const mapEdges: [string, string][] = [
  // Choumert Rd backbone (E–W)
  ['montpelier',     'victoria'],
  ['victoria',       'choumert_e'],
  ['choumert_e',     'gowlett_corner'],

  // Gowlett branch — 90° corner then south
  ['gowlett_corner', 'gowlett'],

  // Bellenden Rd south
  ['victoria',       'bell_s1'],
  ['bell_s1',        'adys_corner'],

  // Adys Rd west to EDT
  ['adys_corner',    'adys_w'],
  ['adys_w',         'edt'],

  // South to Peckham Rye / Clockhouse
  ['adys_corner',    'rye_approach'],
  ['rye_approach',   'barry_corner'],
  ['barry_corner',   'clockhouse'],
]

// ---------------------------------------------------------------------------
// Player movement constraint — must stay within 20 units of any node
// ---------------------------------------------------------------------------
export const isLegalMove = (x: number, z: number): boolean => {
  return mapNodes.some(node => {
    const dx = node.x - x
    const dz = node.z - z
    return Math.sqrt(dx * dx + dz * dz) < 20
  })
}
