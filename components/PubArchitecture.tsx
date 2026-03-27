'use client'

// =============================================================================
// PubArchitecture.tsx — Monument Valley geometric abstractions of Peckham pubs.
// Each facade is researched, then translated into stacked BoxGeometry /
// CylinderGeometry primitives at the map coordinate scale (~8–16 units tall).
//
// CONSTRAINTS: MeshLambertMaterial only. No textures. No shadow maps.
// Fake shadows = thin transparent BoxGeometry slabs (deep purple, 0.22 opacity).
// =============================================================================

import { ReactNode } from 'react'

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
const C = {
  navy:     '#1e2d52',  // window voids
  shadow:   '#3d3560',  // fake cast shadow
  slate:    '#8fa8bc',  // cornice, trim
  teal:     '#5f9ea0',  // accent caps, bosses
  ivory:    '#e0d8cc',  // canopy, clock face
  vicBase:  '#c4826a',  // Victoria — terracotta
  vicBody:  '#d4998e',
  vicDark:  '#8a5848',
  gowBase:  '#b87462',  // Gowlett — honest brick
  gowBody:  '#c9907e',
  monDeep:  '#1e2e54',  // Montpelier — navy blue
  monMid:   '#2d3e6a',
  monLight: '#3d5080',
  clkBody:  '#9aacb0',  // Clockhouse — sage grey
  clkTower: '#6e8a8e',
}

// Shared: window mark (dark navy box proud of facade face)
function Win({ p, w = 1.4, h = 2.2 }: { p: [number, number, number]; w?: number; h?: number }) {
  return (
    <mesh position={p}>
      <boxGeometry args={[w, h, 0.25]} />
      <meshLambertMaterial color={C.navy} />
    </mesh>
  )
}

// Shared: fake cast shadow (flat box on ground plane)
function Shadow({ p, w, d }: { p: [number, number, number]; w: number; d: number }) {
  return (
    <mesh position={p}>
      <boxGeometry args={[w, 0.06, d]} />
      <meshLambertMaterial color={C.shadow} transparent opacity={0.22} />
    </mesh>
  )
}

// ---------------------------------------------------------------------------
// THE VICTORIA (1878, Choumert Rd) — "An imposing pile of a pub."
// Multi-storey hotel-pub. Terracotta, stepped gable crown, paired chimneys.
// ---------------------------------------------------------------------------
function Victoria() {
  return (
    <group>
      {/* Base course — wide, weighty */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[8.0, 1.5, 5.5]} />
        <meshLambertMaterial color={C.vicBase} />
      </mesh>
      {/* First floor body */}
      <mesh position={[0, 3.5, 0]}>
        <boxGeometry args={[7.5, 4.0, 5.0]} />
        <meshLambertMaterial color={C.vicBody} />
      </mesh>
      {/* Second floor body */}
      <mesh position={[0, 7.8, 0]}>
        <boxGeometry args={[7.0, 3.5, 4.5]} />
        <meshLambertMaterial color={C.vicBody} />
      </mesh>
      {/* Ornate cornice band */}
      <mesh position={[0, 9.8, 0]}>
        <boxGeometry args={[7.6, 0.45, 5.1]} />
        <meshLambertMaterial color={C.slate} />
      </mesh>
      {/* Stepped gable — step 1 */}
      <mesh position={[0, 11.2, 0]}>
        <boxGeometry args={[4.5, 2.5, 3.0]} />
        <meshLambertMaterial color={C.vicBase} />
      </mesh>
      {/* Stepped gable — step 2 */}
      <mesh position={[0, 13.2, 0]}>
        <boxGeometry args={[3.0, 2.0, 2.0]} />
        <meshLambertMaterial color={C.vicBody} />
      </mesh>
      {/* Gable peak finial */}
      <mesh position={[0, 15.0, 0]}>
        <boxGeometry args={[1.6, 1.4, 1.2]} />
        <meshLambertMaterial color={C.vicDark} />
      </mesh>
      <mesh position={[0, 15.95, 0]}>
        <boxGeometry args={[1.0, 0.5, 0.8]} />
        <meshLambertMaterial color={C.slate} />
      </mesh>
      {/* Left chimney stack */}
      <mesh position={[-2.8, 13.5, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 3.5, 6]} />
        <meshLambertMaterial color={C.vicDark} />
      </mesh>
      {/* Right chimney stack */}
      <mesh position={[2.8, 13.5, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 3.5, 6]} />
        <meshLambertMaterial color={C.vicDark} />
      </mesh>
      {/* Ground floor windows (front face z=2.76) */}
      <Win p={[-2.5, 1.1, 2.76]} w={1.4} h={2.4} />
      <Win p={[0,    1.1, 2.76]} w={1.4} h={2.4} />
      <Win p={[2.5,  1.1, 2.76]} w={1.4} h={2.4} />
      {/* First floor windows */}
      <Win p={[-2.5, 3.6, 2.51]} />
      <Win p={[0,    3.6, 2.51]} />
      <Win p={[2.5,  3.6, 2.51]} />
      {/* Second floor windows */}
      <Win p={[-2.2, 7.8, 2.26]} w={1.2} h={1.8} />
      <Win p={[0,    7.8, 2.26]} w={1.2} h={1.8} />
      <Win p={[2.2,  7.8, 2.26]} w={1.2} h={1.8} />
      {/* Fake cast shadow toward +x/+z (light at [10,20,10]) */}
      <Shadow p={[3.5, 0.03, 2.8]} w={7.0} d={5.0} />
    </group>
  )
}

// ---------------------------------------------------------------------------
// THE GOWLETT (62 Gowlett Rd) — Street-corner Victorian brick.
// "Sizeable street corner affair." L-shaped plan, large original windows.
// ---------------------------------------------------------------------------
function Gowlett() {
  return (
    <group>
      {/* Low plinth course */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[7.5, 1.2, 4.5]} />
        <meshLambertMaterial color={C.gowBase} />
      </mesh>
      {/* Main front body */}
      <mesh position={[0, 4.5, 0]}>
        <boxGeometry args={[7.0, 7.0, 4.0]} />
        <meshLambertMaterial color={C.gowBody} />
      </mesh>
      {/* Corner wing — perpendicular arm of the L */}
      <mesh position={[-2.8, 4.5, -2.5]}>
        <boxGeometry args={[1.8, 7.0, 3.0]} />
        <meshLambertMaterial color={C.gowBody} />
      </mesh>
      {/* Flat parapet top — front */}
      <mesh position={[0, 8.4, 0]}>
        <boxGeometry args={[7.4, 0.4, 4.4]} />
        <meshLambertMaterial color={C.slate} />
      </mesh>
      {/* Parapet — wing */}
      <mesh position={[-2.8, 8.4, -2.5]}>
        <boxGeometry args={[2.0, 0.4, 3.2]} />
        <meshLambertMaterial color={C.slate} />
      </mesh>
      {/* Corner chimney — defining feature of corner pubs */}
      <mesh position={[-3.5, 10.5, -3.5]}>
        <cylinderGeometry args={[0.4, 0.5, 3.5, 6]} />
        <meshLambertMaterial color={'#5a3e34'} />
      </mesh>
      {/* Large ground-floor windows — characteristic of the Gowlett */}
      <Win p={[-2.2, 2.0, 2.01]} w={1.5} h={3.2} />
      <Win p={[0.5,  2.0, 2.01]} w={1.5} h={3.2} />
      <Win p={[2.8,  2.0, 2.01]} w={1.5} h={3.2} />
      {/* Upper windows */}
      <Win p={[-2.2, 5.8, 2.01]} />
      <Win p={[0.5,  5.8, 2.01]} />
      <Win p={[2.8,  5.8, 2.01]} />
      {/* Side wing window */}
      <Win p={[-3.7, 2.0, -2.5]} w={1.4} h={3.0} />
      <Shadow p={[3.2, 0.03, 2.2]} w={6.5} d={4.0} />
    </group>
  )
}

// ---------------------------------------------------------------------------
// THE MONTPELIER (43 Choumert Rd) — "Regal navy blue, flower baskets."
// Upright, elegant. The COLOUR is the architectural statement.
// ---------------------------------------------------------------------------
function Montpelier() {
  return (
    <group>
      {/* Ground floor */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[6.0, 3.6, 4.8]} />
        <meshLambertMaterial color={C.monDeep} />
      </mesh>
      {/* First floor */}
      <mesh position={[0, 5.8, 0]}>
        <boxGeometry args={[5.6, 3.8, 4.4]} />
        <meshLambertMaterial color={C.monMid} />
      </mesh>
      {/* Second floor — slightly set back */}
      <mesh position={[0, 9.5, 0]}>
        <boxGeometry args={[5.2, 3.2, 4.0]} />
        <meshLambertMaterial color={C.monLight} />
      </mesh>
      {/* Ivory cornice */}
      <mesh position={[0, 11.3, 0]}>
        <boxGeometry args={[5.8, 0.4, 4.6]} />
        <meshLambertMaterial color={C.ivory} />
      </mesh>
      {/* Parapet cap */}
      <mesh position={[0, 12.0, 0]}>
        <boxGeometry args={[5.4, 0.9, 4.2]} />
        <meshLambertMaterial color={C.monMid} />
      </mesh>
      {/* Canopy — protruding horizontal slab, a key feature */}
      <mesh position={[0, 3.8, 2.8]}>
        <boxGeometry args={[6.4, 0.35, 1.6]} />
        <meshLambertMaterial color={C.ivory} />
      </mesh>
      {/* Corner flower-basket bosses — small cylinders at upper corners */}
      {([ [-2.7,6.5,2.25],[2.7,6.5,2.25],[-2.7,6.5,-2.25],[2.7,6.5,-2.25] ] as [number,number,number][]).map(([x,y,z],i) => (
        <mesh key={i} position={[x, y, z]}>
          <cylinderGeometry args={[0.3, 0.3, 0.8, 8]} />
          <meshLambertMaterial color={C.teal} />
        </mesh>
      ))}
      {/* Ground floor windows */}
      <Win p={[-1.6, 2.0, 2.41]} w={1.5} h={2.4} />
      <Win p={[1.6,  2.0, 2.41]} w={1.5} h={2.4} />
      {/* First floor — 3 windows */}
      <Win p={[-1.8, 5.8, 2.21]} />
      <Win p={[0,    5.8, 2.21]} />
      <Win p={[1.8,  5.8, 2.21]} />
      {/* Second floor */}
      <Win p={[-1.6, 9.5, 2.01]} w={1.2} h={1.8} />
      <Win p={[1.6,  9.5, 2.01]} w={1.2} h={1.8} />
      <Shadow p={[2.8, 0.03, 2.5]} w={5.5} d={4.0} />
    </group>
  )
}

// ---------------------------------------------------------------------------
// THE CLOCKHOUSE (196A Peckham Rye) — Victorian shop-to-pub on Peckham Rye.
// Wide horizontal base (shop origin). Central clock tower as defining move.
// ---------------------------------------------------------------------------
function Clockhouse() {
  return (
    <group>
      {/* Wide shop-front base — horizontal proportions */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[11.0, 3.6, 5.0]} />
        <meshLambertMaterial color={C.clkBody} />
      </mesh>
      {/* Left wing — one storey */}
      <mesh position={[-3.5, 4.8, 0]}>
        <boxGeometry args={[3.5, 2.5, 4.5]} />
        <meshLambertMaterial color={C.clkBody} />
      </mesh>
      {/* Right wing — one storey */}
      <mesh position={[3.5, 4.8, 0]}>
        <boxGeometry args={[3.5, 2.5, 4.5]} />
        <meshLambertMaterial color={C.clkBody} />
      </mesh>
      {/* Central clock tower shaft */}
      <mesh position={[0, 7.5, 0]}>
        <boxGeometry args={[3.8, 7.5, 3.8]} />
        <meshLambertMaterial color={C.clkTower} />
      </mesh>
      {/* Belfry cornice — slate band */}
      <mesh position={[0, 11.5, 0]}>
        <boxGeometry args={[4.4, 0.5, 4.4]} />
        <meshLambertMaterial color={C.slate} />
      </mesh>
      {/* Belfry upper */}
      <mesh position={[0, 12.8, 0]}>
        <boxGeometry args={[3.0, 2.2, 3.0]} />
        <meshLambertMaterial color={C.clkTower} />
      </mesh>
      {/* Teal finial */}
      <mesh position={[0, 14.3, 0]}>
        <boxGeometry args={[1.4, 0.8, 1.4]} />
        <meshLambertMaterial color={C.teal} />
      </mesh>
      {/* Clock face — ivory square on tower front */}
      <mesh position={[0, 7.8, 1.92]}>
        <boxGeometry args={[2.2, 2.2, 0.22]} />
        <meshLambertMaterial color={C.ivory} />
      </mesh>
      {/* Clock inner ring — slate */}
      <mesh position={[0, 7.8, 2.03]}>
        <boxGeometry args={[1.3, 1.3, 0.14]} />
        <meshLambertMaterial color={C.slate} />
      </mesh>
      {/* Clock hour markers — N/S/E/W boxes */}
      {([[0,0.55],[0,-0.55],[0.55,0],[-0.55,0]] as [number,number][]).map(([ox,oy],i) => (
        <mesh key={i} position={[ox, 7.8+oy, 2.1]}>
          <boxGeometry args={[0.2, 0.2, 0.1]} />
          <meshLambertMaterial color={C.navy} />
        </mesh>
      ))}
      {/* Wide shop-front windows */}
      <Win p={[-4.0, 1.8, 2.51]} w={2.2} h={1.8} />
      <Win p={[-1.4, 1.8, 2.51]} w={2.0} h={1.8} />
      <Win p={[1.4,  1.8, 2.51]} w={2.0} h={1.8} />
      <Win p={[4.0,  1.8, 2.51]} w={2.2} h={1.8} />
      {/* Wing windows */}
      <Win p={[-3.5, 4.8, 2.26]} w={1.8} h={1.6} />
      <Win p={[3.5,  4.8, 2.26]} w={1.8} h={1.6} />
      <Shadow p={[4.5, 0.03, 2.8]} w={9.5} d={5.0} />
    </group>
  )
}

// ---------------------------------------------------------------------------
// Default fallback — generic pub silhouette for unmapped names
// ---------------------------------------------------------------------------
function DefaultPub() {
  return (
    <group>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[5.5, 1.6, 4.0]} />
        <meshLambertMaterial color={'#b09ab8'} />
      </mesh>
      <mesh position={[0, 4.0, 0]}>
        <boxGeometry args={[4.8, 4.0, 3.5]} />
        <meshLambertMaterial color={'#c4b0cc'} />
      </mesh>
      <mesh position={[0, 6.4, 0]}>
        <boxGeometry args={[5.2, 0.5, 3.8]} />
        <meshLambertMaterial color={C.slate} />
      </mesh>
      <Win p={[-1.4, 3.8, 1.76]} />
      <Win p={[1.4,  3.8, 1.76]} />
      <Shadow p={[2.4, 0.03, 2.0]} w={5.0} d={3.5} />
    </group>
  )
}

// ---------------------------------------------------------------------------
// Public interface
// ---------------------------------------------------------------------------

export type PubName = 'victoria' | 'gowlett' | 'montpelier' | 'clockhouse'

interface PubArchitectureProps { pubName: string }

/**
 * PubArchitecture — renders at [0,0,0]; position via parent Group in World.tsx.
 * Switch on pubName matches the mapNodes name → pubName mapping in World.tsx.
 */
export default function PubArchitecture({ pubName }: PubArchitectureProps): ReactNode {
  switch (pubName) {
    case 'victoria':   return <Victoria />
    case 'gowlett':    return <Gowlett />
    case 'montpelier': return <Montpelier />
    case 'clockhouse': return <Clockhouse />
    default:           return <DefaultPub />
  }
}
