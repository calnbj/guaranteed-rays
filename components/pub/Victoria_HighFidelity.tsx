'use client'

/**
 * Victoria_HighFidelity.tsx  — v2 "Foam Block" reset
 * ─────────────────────────────────────────────────────────────────────────
 * Monument Valley aesthetic rules
 * ① All geometry: THREE.Shape + ExtrudeGeometry. No BoxGeometry.
 * ② Soft-Body bevel: bevelSize 0.25, bevelSegments 5 on every shape.
 *    Think carved foam / rounded clay — zero sharp edges anywhere.
 * ③ Wall thickness 0.8 — it should look like a thick foam block, not wood.
 * ④ "Wora" gradient: ShaderMaterial world-Y lerp, deep ochre → sun-gold.
 * ⑤ Windows: arch HOLES cut into the facade — true structural voids.
 *    Big, chunky openings. No thin glazing bars or micro-details.
 * ⑥ ContactShadows for the floating-toy ground feel.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { useMemo } from 'react'
import * as THREE from 'three'
import { ContactShadows } from '@react-three/drei'
import { paintMat } from './hero_v3/PubShared'

/* ═══════════════════════════════════════════════════════════════════════
   PALETTE  — "Wora" warm London-stock identity
═══════════════════════════════════════════════════════════════════════ */
const W = {
  brickBase:  '#b87220',  // deep amber-ochre, heavy at the ground
  brickTop:   '#ddc46a',  // sun-bleached gold, airy at the crown
  fascia:     '#1a3a1c',  // Victorian bottle-green
  cornice:    '#ede3c8',  // limestone off-white
  glass:      '#111e30',  // flat opaque night-navy — chunky void, no micro-gloss
  chimney:    '#96561e',
  corniceGrey:'#cdc4aa',
} as const

/* ═══════════════════════════════════════════════════════════════════════
   BUILDING DIMENSIONS
═══════════════════════════════════════════════════════════════════════ */
const FW   = 7.2    // front width
const SD   = 5.2    // side depth
const GFH  = 2.8    // ground-floor height
const FFH  = 2.45   // first-floor height
const PAR  = 0.6    // parapet band
const TH   = GFH + FFH + PAR   // ≈ 5.85 total height

// Thick walls — "carved foam block"
const WALL_D    = 0.80
const FASCIA_D  = 0.80   // fascia extrudes the same depth for bold shadow
const FASCIA_H  = 1.20
const CORNICE_D = 0.80
const CORNICE_H = 0.42

/* ═══════════════════════════════════════════════════════════════════════
   BEVEL PRESETS  — 0.25 everywhere for soft-body foam look
═══════════════════════════════════════════════════════════════════════ */
const BV = { bevelEnabled: true, bevelThickness: 0.25, bevelSize: 0.25, bevelSegments: 5 }

const MV_BODY: THREE.ExtrudeGeometryOptions = { depth: TH,     ...BV }
const MV_WALL: THREE.ExtrudeGeometryOptions = { depth: WALL_D, ...BV }
const MV_TRIM = (depth: number): THREE.ExtrudeGeometryOptions => ({ depth, ...BV })
const MV_CHIM: THREE.ExtrudeGeometryOptions = { depth: 0.60,   ...BV }

/* ═══════════════════════════════════════════════════════════════════════
   GRADIENT SHADER
   World-space Y mapped to colour: brickBase (y=0) → brickTop (y=TH).
   Smooth-step keeps the warm ochre dominant in the lower two-thirds.
═══════════════════════════════════════════════════════════════════════ */
function makeGradMat(bot: string, top: string): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uB:    { value: new THREE.Color(bot) },
      uT:    { value: new THREE.Color(top) },
      uYMax: { value: TH },
    },
    vertexShader: /* glsl */`
      varying float vY;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vY = wp.y;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3  uB;
      uniform vec3  uT;
      uniform float uYMax;
      varying float vY;
      void main() {
        float t = clamp(vY / uYMax, 0.0, 1.0);
        t = t * t * (3.0 - 2.0 * t);
        gl_FragColor = vec4(mix(uB, uT, t), 1.0);
      }
    `,
    side: THREE.FrontSide,
  })
}

/* ═══════════════════════════════════════════════════════════════════════
   ARCH HOLE  — clockwise path → Three.js hole subtraction
   (cx, cy) = window centre-x, sill-y in shape coords
   Semicircle radius = w/2.  Windows are BIG — chunky voids.
═══════════════════════════════════════════════════════════════════════ */
function archHole(cx: number, cy: number, w: number, h: number): THREE.Path {
  const hw = w * 0.5
  const ay = cy + h - hw      // Y at which semicircle starts
  const p  = new THREE.Path()
  p.moveTo(cx - hw, cy)
  p.lineTo(cx + hw, cy)
  p.lineTo(cx + hw, ay)
  p.absarc(cx, ay, hw, 0, Math.PI, true)   // CW → hole
  p.closePath()
  return p
}

/* ═══════════════════════════════════════════════════════════════════════
   ARCH GLASS SHAPE — opaque flat panel, sits inside the void
═══════════════════════════════════════════════════════════════════════ */
function makeArchGlassGeo(w: number, h: number): THREE.ShapeGeometry {
  const hw = w * 0.5
  const ay = h - hw
  const s  = new THREE.Shape()
  s.moveTo(-hw, 0)
  s.lineTo( hw, 0)
  s.lineTo( hw, ay)
  s.absarc(0, ay, hw, 0, Math.PI, false)
  s.closePath()
  return new THREE.ShapeGeometry(s, 12)
}

/* ═══════════════════════════════════════════════════════════════════════
   WINDOW LAYOUTS  — chunky openings, fewer but bolder
═══════════════════════════════════════════════════════════════════════ */
// Front facade: 3 GF + 4 FF — wide arched voids
const F_GF = { w: 1.10, h: 2.10, y: 0.55, xs: [-2.4, 0.0, 2.4] }
const F_FF = { w: 1.00, h: 1.75, y: GFH + 0.42, xs: [-2.6, -0.87, 0.87, 2.6] }
// Side facade: 2 per floor
const S_GF = { w: 1.10, h: 2.10, y: 0.55, xs: [1.2, 3.5] }
const S_FF = { w: 1.00, h: 1.75, y: GFH + 0.42, xs: [1.2, 3.5] }

/* ═══════════════════════════════════════════════════════════════════════
   BUILDING BODY
   XY floor-plan extruded along Z by TH, rotated Rx(-π/2) so:
     shape Y  (0 → −SD)  → world Z  (0 → SD)
     extrude Z (0 → TH)  → world Y  (0 → TH)
═══════════════════════════════════════════════════════════════════════ */
function BuildingBody() {
  const { geo, mat } = useMemo(() => {
    const hw = FW * 0.5
    const s  = new THREE.Shape()
    s.moveTo(-hw,   0)
    s.lineTo( hw,   0)
    s.lineTo( hw,  -SD)
    s.lineTo(-hw,  -SD)
    s.closePath()
    return { geo: new THREE.ExtrudeGeometry(s, MV_BODY), mat: makeGradMat(W.brickBase, W.brickTop) }
  }, [])

  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   FRONT FACADE  — XY shape with arch holes, extruded +Z by WALL_D.
   Face is just proud of the body (z=−0.01); glass set back at 60% depth.
═══════════════════════════════════════════════════════════════════════ */
function FrontFacade() {
  const wallGeo = useMemo(() => {
    const hw = FW * 0.5
    const s  = new THREE.Shape()
    s.moveTo(-hw, 0); s.lineTo(hw, 0)
    s.lineTo(hw, TH); s.lineTo(-hw, TH)
    s.closePath()
    F_GF.xs.forEach(cx => s.holes.push(archHole(cx, F_GF.y, F_GF.w, F_GF.h)))
    F_FF.xs.forEach(cx => s.holes.push(archHole(cx, F_FF.y, F_FF.w, F_FF.h)))
    return new THREE.ExtrudeGeometry(s, MV_WALL)
  }, [])

  const wallMat  = useMemo(() => makeGradMat(W.brickBase, W.brickTop), [])
  const glassMat = useMemo(() => paintMat(W.glass, { roughness: 1.0 }), [])
  const gfGeo    = useMemo(() => makeArchGlassGeo(F_GF.w, F_GF.h), [])
  const ffGeo    = useMemo(() => makeArchGlassGeo(F_FF.w, F_FF.h), [])
  const glassZ   = WALL_D * 0.60

  return (
    <group>
      <mesh geometry={wallGeo} position={[0, 0, -0.01]} castShadow>
        <primitive object={wallMat} attach="material" />
      </mesh>
      {F_GF.xs.map((cx, i) => (
        <mesh key={`fg${i}`} geometry={gfGeo} position={[cx, F_GF.y, glassZ]}>
          <primitive object={glassMat} attach="material" />
        </mesh>
      ))}
      {F_FF.xs.map((cx, i) => (
        <mesh key={`ff${i}`} geometry={ffGeo} position={[cx, F_FF.y, glassZ]}>
          <primitive object={glassMat} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   SIDE FACADE  — shape in XY (x=0..SD), extruded +Z by WALL_D,
   rotated Ry(−π/2).  Face at x = FW/2 + 0.01.
   Glass panels face +X at x = FW/2 − WALL_D*0.60.
═══════════════════════════════════════════════════════════════════════ */
function SideFacade() {
  const wallGeo = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo( 0,  0); s.lineTo(SD,  0)
    s.lineTo(SD, TH); s.lineTo( 0, TH)
    s.closePath()
    S_GF.xs.forEach(cx => s.holes.push(archHole(cx, S_GF.y, S_GF.w, S_GF.h)))
    S_FF.xs.forEach(cx => s.holes.push(archHole(cx, S_FF.y, S_FF.w, S_FF.h)))
    return new THREE.ExtrudeGeometry(s, MV_WALL)
  }, [])

  const wallMat  = useMemo(() => makeGradMat(W.brickBase, W.brickTop), [])
  const glassMat = useMemo(() => paintMat(W.glass, { roughness: 1.0 }), [])
  const gfGeo    = useMemo(() => makeArchGlassGeo(S_GF.w, S_GF.h), [])
  const ffGeo    = useMemo(() => makeArchGlassGeo(S_FF.w, S_FF.h), [])
  const glassX   = FW / 2 - WALL_D * 0.60

  return (
    <group>
      <mesh
        geometry={wallGeo}
        position={[FW / 2 + 0.01, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        castShadow
      >
        <primitive object={wallMat} attach="material" />
      </mesh>
      {S_GF.xs.map((cz, i) => (
        <mesh key={`sg${i}`} geometry={gfGeo} position={[glassX, S_GF.y, cz]} rotation={[0, Math.PI / 2, 0]}>
          <primitive object={glassMat} attach="material" />
        </mesh>
      ))}
      {S_FF.xs.map((cz, i) => (
        <mesh key={`sf${i}`} geometry={ffGeo} position={[glassX, S_FF.y, cz]} rotation={[0, Math.PI / 2, 0]}>
          <primitive object={glassMat} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   FASCIA  — bold green register band, protrudes well out from facade
═══════════════════════════════════════════════════════════════════════ */
function Fascias() {
  const mat = useMemo(() =>
    paintMat(W.fascia, { emissive: W.fascia, emissiveIntensity: 0.06 }), [])
  const protrude = 0.38   // how far the face sits proud of z=0 / x=FW/2

  const frontGeo = useMemo(() => {
    const hw = FW * 0.5 + 0.08
    const s  = new THREE.Shape()
    s.moveTo(-hw, 0); s.lineTo(hw, 0)
    s.lineTo(hw, FASCIA_H); s.lineTo(-hw, FASCIA_H)
    s.closePath()
    return new THREE.ExtrudeGeometry(s, MV_TRIM(FASCIA_D))
  }, [])

  const sideGeo = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-0.08, 0); s.lineTo(SD + 0.08, 0)
    s.lineTo(SD + 0.08, FASCIA_H); s.lineTo(-0.08, FASCIA_H)
    s.closePath()
    return new THREE.ExtrudeGeometry(s, MV_TRIM(FASCIA_D))
  }, [])

  return (
    <group>
      <mesh geometry={frontGeo} position={[0, 0, -protrude]} castShadow>
        <primitive object={mat} attach="material" />
      </mesh>
      <mesh geometry={sideGeo} position={[FW / 2 + protrude, 0, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow>
        <primitive object={mat} attach="material" />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   CORNICE  — chunky limestone crown, casts a strong shadow line
═══════════════════════════════════════════════════════════════════════ */
function Cornices() {
  const mat   = useMemo(() =>
    paintMat(W.cornice, { roughness: 0.92, emissive: W.cornice, emissiveIntensity: 0.04 }), [])
  const yPos  = TH - PAR - CORNICE_H
  const protrude = 0.38

  const frontGeo = useMemo(() => {
    const hw = FW * 0.5 + 0.18
    const s  = new THREE.Shape()
    s.moveTo(-hw, 0); s.lineTo(hw, 0)
    s.lineTo(hw, CORNICE_H); s.lineTo(-hw, CORNICE_H)
    s.closePath()
    return new THREE.ExtrudeGeometry(s, MV_TRIM(CORNICE_D))
  }, [])

  const sideGeo = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-0.18, 0); s.lineTo(SD + 0.18, 0)
    s.lineTo(SD + 0.18, CORNICE_H); s.lineTo(-0.18, CORNICE_H)
    s.closePath()
    return new THREE.ExtrudeGeometry(s, MV_TRIM(CORNICE_D))
  }, [])

  return (
    <group>
      <mesh geometry={frontGeo} position={[0, yPos, -protrude]} castShadow>
        <primitive object={mat} attach="material" />
      </mesh>
      <mesh geometry={sideGeo} position={[FW / 2 + protrude, yPos, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow>
        <primitive object={mat} attach="material" />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   CHIMNEY  — chunky shaft + wide projecting cap, reads at a distance
═══════════════════════════════════════════════════════════════════════ */
function ChimneyStack({ position }: { position: [number, number, number] }) {
  const shaftGeo = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-0.38, 0); s.lineTo(0.38, 0)
    s.lineTo(0.38, 2.2); s.lineTo(-0.38, 2.2)
    s.closePath()
    return new THREE.ExtrudeGeometry(s, MV_CHIM)
  }, [])

  const capGeo = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-0.56, 0); s.lineTo(0.56, 0)
    s.lineTo(0.56, 0.28); s.lineTo(-0.56, 0.28)
    s.closePath()
    return new THREE.ExtrudeGeometry(s, MV_TRIM(0.80))
  }, [])

  const shaftMat = useMemo(() => paintMat(W.chimney,    { emissive: W.chimney, emissiveIntensity: 0.04 }), [])
  const capMat   = useMemo(() => paintMat(W.corniceGrey, { roughness: 0.94 }), [])
  const cx = -0.30, cz = -0.30   // centre offset so shaft reads as square from ISO view

  return (
    <group position={position}>
      <mesh geometry={shaftGeo} position={[cx, 0, cz]} castShadow>
        <primitive object={shaftMat} attach="material" />
      </mesh>
      <mesh geometry={capGeo} position={[cx - 0.18, 2.2, cz - 0.10]} castShadow>
        <primitive object={capMat} attach="material" />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════════════ */
export default function VictoriaHighFidelity() {
  return (
    <group name="victoria-high-fidelity">
      {/* Floating-toy contact shadow — blur 2.5, opacity 0.4 */}
      <ContactShadows
        position={[0, 0.02, SD / 2]}
        width={FW + 4}
        height={SD + 4}
        blur={2.5}
        opacity={0.4}
        far={8}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Solid building mass — gradient brick */}
      <BuildingBody />

      {/* Facade walls with true arch-hole windows */}
      <FrontFacade />
      <SideFacade />

      {/* Bold architectural trim */}
      <Fascias />
      <Cornices />

      {/* Chunky roof chimneys */}
      <ChimneyStack position={[-2.0, TH, 1.0]} />
      <ChimneyStack position={[ 1.6, TH, 3.6]} />
    </group>
  )
}
