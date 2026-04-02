'use client'

/**
 * Victoria.tsx — The Victoria Inn, Bellenden Road, Peckham
 * ─────────────────────────────────────────────────────────
 * Reference: classic London Victorian corner pub
 * • Yellow London stock brick upper storeys
 * • Dark bottle-green painted fascia band ground floor
 * • Lime-green awning canopy wrapping the corner
 * • Rounded corner tower (the signature feature)
 * • Deep cornice band with dentils
 * • 3 storeys, corner wrap, 2 facades fully detailed
 * ─────────────────────────────────────────────────────────
 */

import React, { useMemo } from 'react'
import { RoundedBox } from '@react-three/drei'
import {
  ArchedWindow, RectWindow,
  PubHeroSign, Chimney, Awning, ToyBench, PicnicTable,
  NightLight, WallSconce, paintMat,
} from './PubShared'

// Victoria palette
const V = {
  brick:      '#d4b878', // warm yellow London stock
  brickDark:  '#b89858', // shadow brick mortar
  fascia:     '#2e5030', // dark bottle green
  fasciaDark: '#1a3020', // deep fascia shadow
  cornice:    '#ece4d4', // off-white limestone
  cream:      '#f0e8d8',
  awning:     '#3a6a3a',
  awningStripe:'#a0d464',
  trim:       '#c8c0b0',
  chimney:    '#b07848',
}

// ──────────────────────────────
// Sub-components
// ──────────────────────────────

/** The defining cylindrical corner of the Victoria */
function CornerTower() {
  const brickMat  = useMemo(() => paintMat(V.brick, { emissive: '#c8a86a', emissiveIntensity: 0.04 }), [])
  const corniceMat = useMemo(() => paintMat(V.cornice), [])
  const fasciaMat = useMemo(() => paintMat(V.fascia, { emissive: '#1e4028', emissiveIntensity: 0.05 }), [])

  return (
    <group position={[0, 0, 0]}>
      {/* Lower fascia drum */}
      <mesh position={[0, 2.8, 0]}>
        <cylinderGeometry args={[2.6, 2.6, 5.6, 24]} />
        <primitive object={fasciaMat} attach="material" />
      </mesh>
      {/* Mid cornice ring */}
      <mesh position={[0, 5.9, 0]}>
        <cylinderGeometry args={[2.75, 2.75, 0.4, 24]} />
        <primitive object={corniceMat} attach="material" />
      </mesh>
      {/* Upper brick drum storey 2 */}
      <mesh position={[0, 9.2, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 6.6, 24]} />
        <primitive object={brickMat} attach="material" />
      </mesh>
      {/* Cornice ring storey 2 top */}
      <mesh position={[0, 12.7, 0]}>
        <cylinderGeometry args={[2.65, 2.65, 0.45, 24]} />
        <primitive object={corniceMat} attach="material" />
      </mesh>
      {/* Top brick drum storey 3 */}
      <mesh position={[0, 15.5, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 5.2, 24]} />
        <primitive object={brickMat} attach="material" />
      </mesh>
      {/* Roof cornice drum */}
      <mesh position={[0, 18.3, 0]}>
        <cylinderGeometry args={[2.7, 2.7, 0.65, 24]} />
        <primitive object={corniceMat} attach="material" />
      </mesh>
      {/* Lead-flat cap disc */}
      <mesh position={[0, 18.8, 0]}>
        <cylinderGeometry args={[2.55, 2.55, 0.28, 24]} />
        <primitive object={fasciaMat} attach="material" />
      </mesh>

      {/* Corner tower windows — storey 2 arched (4 around cylinder) */}
      {([0, 90, 180, 270] as number[]).map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x   = Math.sin(rad) * 2.55
        const z   = Math.cos(rad) * 2.55
        return (
          <group key={i} position={[x, 9.4, z]} rotation={[0, Math.PI - rad, 0]}>
            <ArchedWindow w={1.05} h={1.8} d={0.14} frameColor={V.cream} glassColor="#1a2a48" archHeight={0.42} />
          </group>
        )
      })}
      {/* Storey 3 windows */}
      {([45, 135, 225, 315] as number[]).map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x   = Math.sin(rad) * 2.55
        const z   = Math.cos(rad) * 2.55
        return (
          <group key={i} position={[x, 15.8, z]} rotation={[0, Math.PI - rad, 0]}>
            <RectWindow w={0.95} h={1.6} depth={0.13} frameColor={V.cream} glassColor="#1a2a48" />
          </group>
        )
      })}
    </group>
  )
}

/** Main façade wing (Z-facing front) */
function FrontWing() {
  const brickMat   = useMemo(() => paintMat(V.brick, { emissive: '#c4a860', emissiveIntensity: 0.03 }), [])
  const fasciaMat  = useMemo(() => paintMat(V.fascia, { emissive: '#1a3820', emissiveIntensity: 0.05 }), [])
  const corniceMat = useMemo(() => paintMat(V.cornice), [])
  const brickDark  = useMemo(() => paintMat(V.brickDark), [])

  return (
    <group>
      {/* Ground floor fascia block */}
      <RoundedBox args={[11, 5.6, 9.5]} radius={0.18} smoothness={4} position={[5.5, 2.8, 0]}>
        <primitive object={fasciaMat} attach="material" />
      </RoundedBox>

      {/* Storey 2 brick */}
      <RoundedBox args={[11, 5.5, 9.5]} radius={0.15} smoothness={4} position={[5.5, 9.0, 0]}>
        <primitive object={brickMat} attach="material" />
      </RoundedBox>

      {/* Storey 3 brick */}
      <RoundedBox args={[11, 5.2, 9.5]} radius={0.15} smoothness={4} position={[5.5, 15.4, 0]}>
        <primitive object={brickMat} attach="material" />
      </RoundedBox>

      {/* Cornice between S1/S2 */}
      <RoundedBox args={[11.4, 0.45, 9.8]} radius={0.08} smoothness={3} position={[5.5, 5.9, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>

      {/* Cornice between S2/S3 */}
      <RoundedBox args={[11.4, 0.45, 9.8]} radius={0.08} smoothness={3} position={[5.5, 12.5, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>

      {/* Roof cornice */}
      <RoundedBox args={[11.6, 0.7, 10.0]} radius={0.1} smoothness={3} position={[5.5, 18.2, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>

      {/* Dentil band below roof cornice */}
      {Array.from({ length: 9 }).map((_, i) => (
        <RoundedBox key={i} args={[0.28, 0.22, 0.18]} radius={0.04} smoothness={2}
          position={[0.7 + i * 1.16, 17.82, -4.8]}>
          <primitive object={corniceMat} attach="material" />
        </RoundedBox>
      ))}

      {/* Storey 2 windows front face (4 arched) */}
      {[1.4, 3.8, 6.2, 8.6].map((x, i) => (
        <group key={i} position={[x, 9.2, -4.85]}>
          <ArchedWindow w={1.1} h={1.85} d={0.16} frameColor={V.cream} glassColor="#1a2a50" archHeight={0.44} />
        </group>
      ))}

      {/* Storey 3 windows front face (4 rect) */}
      {[1.4, 3.8, 6.2, 8.6].map((x, i) => (
        <group key={i} position={[x, 15.5, -4.85]}>
          <RectWindow w={1.0} h={1.62} depth={0.14} frameColor={V.cream} glassColor="#1a2a50" />
        </group>
      ))}

      {/* Ground floor large pub windows (3, with fascia recesses) */}
      {[1.8, 5.0, 8.2].map((x, i) => (
        <group key={i} position={[x, 2.6, -4.88]}>
          <RectWindow w={1.8} h={2.2} depth={0.18} frameColor={V.cream} glassColor="#182240" divisions={false} />
        </group>
      ))}

      {/* Chimneys on roof */}
      <Chimney position={[2.5, 18.8, -3.8]} color={V.chimney} h={2.4} w={0.75} />
      <Chimney position={[8.5, 18.8, -3.8]} color={V.chimney} h={2.0} w={0.65} />
    </group>
  )
}

/** Side wing (X-facing) */
function SideWing() {
  const brickMat  = useMemo(() => paintMat(V.brick, { emissive: '#b89858', emissiveIntensity: 0.025 }), [])
  const fasciaMat = useMemo(() => paintMat(V.fasciaDark), [])
  const corniceMat = useMemo(() => paintMat(V.cornice), [])

  return (
    <group>
      {/* Ground floor fascia */}
      <RoundedBox args={[9, 5.6, 9.5]} radius={0.18} smoothness={4} position={[0, 2.8, -4.5]}>
        <primitive object={fasciaMat} attach="material" />
      </RoundedBox>
      {/* Storey 2 */}
      <RoundedBox args={[9, 5.5, 9.5]} radius={0.15} smoothness={4} position={[0, 9.0, -4.5]}>
        <primitive object={brickMat} attach="material" />
      </RoundedBox>
      {/* Storey 3 */}
      <RoundedBox args={[9, 5.2, 9.5]} radius={0.15} smoothness={4} position={[0, 15.4, -4.5]}>
        <primitive object={brickMat} attach="material" />
      </RoundedBox>
      {/* Cornices */}
      <RoundedBox args={[9.4, 0.45, 9.8]} radius={0.08} smoothness={3} position={[0, 5.9, -4.5]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[9.4, 0.45, 9.8]} radius={0.08} smoothness={3} position={[0, 12.5, -4.5]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[9.6, 0.7, 10.0]} radius={0.1} smoothness={3} position={[0, 18.2, -4.5]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>

      {/* Side windows - storey 2 */}
      {[-3.2, -0.4, 2.4].map((z, i) => (
        <group key={i} position={[-4.62, 9.2, z]}>
          <ArchedWindow w={1.0} h={1.8} d={0.15} frameColor={V.cream} glassColor="#1a2a50" archHeight={0.42} />
        </group>
      ))}
      {/* Side windows - storey 3 */}
      {[-3.2, -0.4, 2.4].map((z, i) => (
        <group key={i} position={[-4.62, 15.5, z]}>
          <RectWindow w={0.95} h={1.55} depth={0.13} frameColor={V.cream} glassColor="#1a2a50" />
        </group>
      ))}

      {/* Ground floor side windows */}
      {[-3.5, 0.2].map((z, i) => (
        <group key={i} position={[-4.62, 2.6, z]}>
          <RectWindow w={1.65} h={2.1} depth={0.17} frameColor={V.cream} glassColor="#182240" divisions={false} />
        </group>
      ))}

      <Chimney position={[-3.5, 18.8, -4.5]} color={V.chimney} h={2.1} w={0.68} />
    </group>
  )
}

// ──────────────────────────────
// Main export
// ──────────────────────────────

export default function Victoria() {
  const groundMat = useMemo(() => paintMat('#c0b8a8'), [])
  const stepMat   = useMemo(() => paintMat(V.cornice), [])

  return (
    <group name="victoria-pub">
      {/* Corner Tower anchors intersection */}
      <CornerTower />

      {/* Two orthogonal wings */}
      <FrontWing />
      <SideWing />

      {/* ==== Ground floor fascia sign wrap ==== */}
      {/* Front sign band — sits on top of fascia */}
      <PubHeroSign position={[5.5, 5.1, -5.15]} color={V.fascia} w={9} h={0.75} facing="z" />

      {/* Side sign band */}
      <group position={[-4.7, 5.1, -4.5]} rotation={[0, -Math.PI * 0.5, 0]}>
        <PubHeroSign position={[0, 0, 0]} color={V.fascia} w={7} h={0.75} facing="z" />
      </group>

      {/* ==== Awning canopy ==== */}
      <Awning position={[5.5, 4.4, -5.4]} w={10} color={V.awning} stripeColor={V.awningStripe} />
      <group rotation={[0, Math.PI * 0.5, 0]}>
        <Awning position={[-4.8, 4.4, -5.4]} w={8} color={V.awning} stripeColor={V.awningStripe} />
      </group>

      {/* ==== Entrance door ==== */}
      <group position={[0.05, 1.45, -5.05]}>
        <PubDoor w={1.4} h={2.2} color={V.fasciaDark} />
      </group>

      {/* ==== Steps ==== */}
      <RoundedBox args={[3.2, 0.22, 1.1]} radius={0.07} smoothness={3} position={[1, 0.11, -5.7]}>
        <primitive object={stepMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[4, 0.12, 1.6]} radius={0.06} smoothness={3} position={[1, 0.06, -6.2]}>
        <primitive object={stepMat} attach="material" />
      </RoundedBox>

      {/* ==== Wall sconces on fascia ==== */}
      <WallSconce position={[2.5, 4.1, -5.1]} />
      <WallSconce position={[8.5, 4.1, -5.1]} />
      <group rotation={[0, Math.PI * 0.5, 0]}>
        <WallSconce position={[-3, 4.1, -5.1]} />
      </group>

      {/* ==== Nightlife point lights at entrance ==== */}
      <NightLight position={[0, 3.2, -5.8]} color="#ffb050" intensity={10} distance={14} />
      <NightLight position={[4, 3.4, -5.5]} color="#ffc070" intensity={5} distance={8} />

      {/* ==== Outdoor seating ==== */}
      <PicnicTable position={[-6, 0, -8]} />
      <PicnicTable position={[-2.5, 0, -9]} />
      <PicnicTable position={[3.5, 0, -8.5]} />
      <ToyBench position={[7.5, 0, -8]} rotation={[0, 0.15, 0]} />
      <ToyBench position={[-5.5, 0, -6.8]} rotation={[0, -Math.PI * 0.5 - 0.15, 0]} />
    </group>
  )
}

// ── internal helper (keep in scope) ────────────────────────
function PubDoor({ w = 1.4, h = 2.2, color = '#1a3020' }: { w?: number; h?: number; color?: string }) {
  const doorMat  = useMemo(() => paintMat(color, { emissive: color, emissiveIntensity: 0.04 }), [color])
  const frameMat = useMemo(() => paintMat(V.cornice), [])
  const glassMat = useMemo(
    () => paintMat('#1a2a40', { emissive: '#2a4060', emissiveIntensity: 0.18, transparent: true, opacity: 0.85 }),
    []
  )
  const panelMat = useMemo(() => paintMat('#c8962e', { emissive: '#c8962e', emissiveIntensity: 0.06 }), [])
  return (
    <group>
      <RoundedBox args={[w + 0.28, h + 0.55, 0.2]} radius={0.07} smoothness={3}>
        <primitive object={frameMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[w, h, 0.15]} radius={0.06} smoothness={3} position={[0, -0.18, 0.06]}>
        <primitive object={doorMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[w - 0.1, 0.5, 0.12]} radius={0.04} smoothness={3} position={[0, h * 0.5 - 0.05, 0.08]}>
        <primitive object={glassMat} attach="material" />
      </RoundedBox>
      {[h * 0.12, -h * 0.2].map((py, i) => (
        <RoundedBox key={i} args={[w - 0.28, 0.52, 0.07]} radius={0.04} smoothness={3} position={[0, py - 0.18, 0.14]}>
          <primitive object={panelMat} attach="material" />
        </RoundedBox>
      ))}
      <mesh position={[w * 0.26, -0.25, 0.2]}>
        <sphereGeometry args={[0.08, 8, 6]} />
        <meshStandardMaterial color="#d4a020" roughness={0.35} metalness={0.65} />
      </mesh>
    </group>
  )
}
