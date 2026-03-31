// =============================================================================
// lib/mapData.ts
// Single source of truth for the Guaranteed Rays world.
// Park-centric layout: Peckham Rye Park at [0,0,0].
// 5 gates radiate outward to the Peckham road network.
// mapEdges carries a 3rd element — the road name — rendered on path surfaces.
// =============================================================================

export interface MapNode {
  id:       string
  x:        number
  z:        number
  type:     'pub' | 'road' | 'gate'
  name:     string
  color:    string
  street:   string
  features: { roof: string; seating: string; levels: number }
}

// Park bounding box used by isLegalMove (world units)
export const PARK_BOUNDS = { xMin: -45, xMax: 45, zMin: -28, zMax: 28 }

// ---------------------------------------------------------------------------
// MAP NODES
// ---------------------------------------------------------------------------
export const mapNodes: MapNode[] = [

  // ── PARK GATES (5 entry / exit points on the park perimeter) ─────────────
  { id: 'gate_n',  x:  0,   z: -28, type: 'gate', name: 'RYE LN GATE',       color: '#8aad7a', street: 'Rye Lane',       features: { roof: 'flat',   seating: 'none',    levels: 1 } },
  { id: 'gate_ne', x:  32,  z: -20, type: 'gate', name: 'FOREST HILL GATE',  color: '#8aad7a', street: 'Forest Hill Rd', features: { roof: 'flat',   seating: 'none',    levels: 1 } },
  { id: 'gate_e',  x:  45,  z:  5,  type: 'gate', name: 'EAST DULWICH GATE', color: '#8aad7a', street: 'E Dulwich Rd',   features: { roof: 'flat',   seating: 'none',    levels: 1 } },
  { id: 'gate_w',  x: -45,  z:  5,  type: 'gate', name: 'NUNHEAD GATE',      color: '#8aad7a', street: 'Nunhead Ln',     features: { roof: 'flat',   seating: 'none',    levels: 1 } },
  { id: 'gate_s',  x: -8,   z:  28, type: 'gate', name: 'BARRY RD GATE',     color: '#8aad7a', street: 'Barry Rd',       features: { roof: 'flat',   seating: 'none',    levels: 1 } },


  // ── BELLENDEN RD (north from gate_n) ─────────────────────────────────────
  { id: 'rye_n',     x:  0,   z: -55,  type: 'road', name: '',           color: '#c8bfb2', street: 'Rye Lane',     features: { roof: 'flat', seating: 'none', levels: 1 } },
  { id: 'bell_junc', x:  0,   z: -82,  type: 'road', name: '',           color: '#c8bfb2', street: 'Bellenden Rd', features: { roof: 'flat', seating: 'none', levels: 1 } },
  { id: 'bell_n',    x:  0,   z: -115, type: 'road', name: '',           color: '#c8bfb2', street: 'Bellenden Rd', features: { roof: 'flat', seating: 'none', levels: 1 } },
  { id: 'victoria',  x:  0,   z: -145, type: 'pub',  name: 'VICTORIA',   color: '#c4826a', street: 'Bellenden Rd', features: { roof: 'turret', seating: 'benches', levels: 3 } },

  // ── CHOUMERT RD (east from bell_junc) ────────────────────────────────────
  { id: 'chm_e1',    x:  22,  z: -82,  type: 'road', name: '',           color: '#c8bfb2', street: 'Choumert Rd',  features: { roof: 'flat', seating: 'none', levels: 1 } },
  { id: 'chm_e2',    x:  44,  z: -82,  type: 'road', name: '',           color: '#c8bfb2', street: 'Choumert Rd',  features: { roof: 'flat', seating: 'none', levels: 1 } },
  { id: 'gowlett_c', x:  60,  z: -82,  type: 'road', name: '',           color: '#c8bfb2', street: 'Gowlett Rd',   features: { roof: 'flat', seating: 'none', levels: 1 } },
  { id: 'gowlett',   x:  60,  z: -102, type: 'pub',  name: 'GOWLETT',    color: '#b87462', street: 'Gowlett Rd',   features: { roof: 'flat',   seating: 'tables',  levels: 2 } },

  // ── CHOUMERT RD (west from bell_junc) ────────────────────────────────────
  { id: 'chm_w1',    x: -22,  z: -82,  type: 'road', name: '',           color: '#c8bfb2', street: 'Choumert Rd',  features: { roof: 'flat', seating: 'none', levels: 1 } },
  { id: 'montpelier',x: -42,  z: -82,  type: 'pub',  name: 'MONTPELIER', color: '#2d3e6a', street: 'Choumert Rd',  features: { roof: 'flat',   seating: 'tables',  levels: 3 } },

  // ── LORDSHIP LANE (from gate_ne) ─────────────────────────────────────────
  { id: 'lord_s',    x:  50,  z: -48,  type: 'road', name: '',           color: '#c8bfb2', street: 'Lordship Ln',  features: { roof: 'flat', seating: 'none', levels: 1 } },
  { id: 'lord_n',    x:  65,  z: -75,  type: 'road', name: '',           color: '#c8bfb2', street: 'Lordship Ln',  features: { roof: 'flat', seating: 'none', levels: 1 } },
  { id: 'edt',       x:  65,  z: -88,  type: 'pub',  name: 'EDT',        color: '#6a8c5a', street: 'Lordship Ln',  features: { roof: 'gable',  seating: 'benches', levels: 2 } },

  // ── BARRY RD (south from gate_s) ─────────────────────────────────────────
  { id: 'barry_s',   x: -8,   z:  55,  type: 'road', name: '',           color: '#c8bfb2', street: 'Barry Rd',     features: { roof: 'flat', seating: 'none', levels: 1 } },
  { id: 'barry_c',   x: -25,  z:  68,  type: 'road', name: '',           color: '#c8bfb2', street: 'Barry Rd',     features: { roof: 'flat', seating: 'none', levels: 1 } },
  { id: 'clockhouse',x: -25,  z:  82,  type: 'pub',  name: 'CLOCK HOUSE',color: '#9aacb0', street: 'Barry Rd',     features: { roof: 'clock',  seating: 'benches', levels: 2 } },
]


// ---------------------------------------------------------------------------
// MAP EDGES  — [fromId, toId, roadName]
// 3rd element is the label rendered flat on the path plinth surface.
// ---------------------------------------------------------------------------
export const mapEdges: [string, string, string][] = [
  // Rye Lane / Bellenden Rd spine
  ['gate_n',    'rye_n',     'RYE LANE'],
  ['rye_n',     'bell_junc', 'BELLENDEN RD'],
  ['bell_junc', 'bell_n',    'BELLENDEN RD'],
  ['bell_n',    'victoria',  'BELLENDEN RD'],

  // Choumert Rd — east
  ['bell_junc', 'chm_e1',    'CHOUMERT RD'],
  ['chm_e1',    'chm_e2',    'CHOUMERT RD'],
  ['chm_e2',    'gowlett_c', 'GOWLETT RD'],
  ['gowlett_c', 'gowlett',   'GOWLETT RD'],

  // Choumert Rd — west
  ['bell_junc', 'chm_w1',    'CHOUMERT RD'],
  ['chm_w1',    'montpelier','CHOUMERT RD'],

  // Lordship Lane
  ['gate_ne',   'lord_s',    'LORDSHIP LN'],
  ['lord_s',    'lord_n',    'LORDSHIP LN'],
  ['lord_n',    'edt',       'LORDSHIP LN'],

  // Barry Rd
  ['gate_s',    'barry_s',   'BARRY RD'],
  ['barry_s',   'barry_c',   'BARRY RD'],
  ['barry_c',   'clockhouse','BARRY RD'],
]

// ---------------------------------------------------------------------------
// MOVEMENT LOGIC
// ---------------------------------------------------------------------------

// Player is free to walk anywhere inside the park, or within proximity of a node
export const isLegalMove = (x: number, z: number): boolean => {
  if (
    x >= PARK_BOUNDS.xMin && x <= PARK_BOUNDS.xMax &&
    z >= PARK_BOUNDS.zMin && z <= PARK_BOUNDS.zMax
  ) return true
  return mapNodes.some(n => Math.sqrt((n.x - x) ** 2 + (n.z - z) ** 2) < 22)
}
