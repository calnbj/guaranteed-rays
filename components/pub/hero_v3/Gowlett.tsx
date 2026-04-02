'use client'

/**
 * Gowlett.tsx — The Gowlett Arms, Gowlett Road, Peckham
 * ─────────────────────────────────────────────────────────
 * Reference: the real photo
 * • Pale London stock / ochre brick — 2 full storeys + parapet
 * • Chamfered / octagonal CORNER (building has a clipped corner
 *   on plan — this is the key silhouette detail)
 * • Deep maroon ground-floor fascia with cream lettering panels
 * • Cream stone string courses, corbelled cornice
 * • Red decorative brick inset band at cornice level
 * • Wide sash windows storey 2, 3-pane horizontals
 * • Corner entrance (at the chamfered face)
 * • Large picnic bench forecourt
 * ─────────────────────────────────────────────────────────
 */

import React, { useMemo } from 'react'
import { RoundedBox } from '@react-three/drei'
import {
  ArchedWindow, RectWindow,
  PubHeroSign, Chimney, ToyBench, PicnicTable,
  NightLight, WallSconce, paintMat,
} from './PubShared'

const G = {
  brick:       '#d4c888', // pale ochre / London stock
  brickDark:   '#b8aa6a', // shadow brick
  fascia:      '#7a1820', // deep maroon
  fasciaMid:   '#901e28', // maroon highlight
  cream:       '#ece4d4',
  cornice:     '#e0d8c4',
  red:         '#c03020', // decorative red brick inset band
  chimney:     '#b8a060',
}

// ── Chamfered corner face ────────────────────────────

function ChamferCorner() {
  const brickMat  = useMemo(() => paintMat(G.brick, { emissive: '#c4b860', emissiveIntensity: 0.03 }), [])
  const fasciaMat = useMemo(() => paintMat(G.fascia, { emissive: '#500e14', emissiveIntensity: 0.04 }), [])
  const corniceMat = useMemo(() => paintMat(G.cornice), [])

  const angle45: [number, number, number] = [0, Math.PI * 0.25, 0]

  return (
    <group rotation={angle45}>
      {/* Ground floor fascia chamfer */}
      <RoundedBox args={[4.5, 5.5, 0.85]} radius={0.16} smoothness={4} position={[0, 2.75, 0]}>
        <primitive object={fasciaMat} attach="material" />
      </RoundedBox>
      {/* Storey 2 brick chamfer */}
      <RoundedBox args={[4.5, 5.2, 0.85]} radius={0.14} smoothness={4} position={[0, 8.85, 0]}>
        <primitive object={brickMat} attach="material" />
      </RoundedBox>
      {/* Attic chamfer */}
      <RoundedBox args={[4.5, 2.5, 0.85]} radius={0.12} smoothness={4} position={[0, 13.8, 0]}>
        <primitive object={brickMat} attach="material" />
      </RoundedBox>
      {/* Cornice */}
      <RoundedBox args={[4.7, 0.45, 0.92]} radius={0.08} smoothness={3} position={[0, 5.73, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[4.7, 0.45, 0.92]} radius={0.08} smoothness={3} position={[0, 11.7, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      {/* Chamfer window S2 */}
      <group position={[0, 8.9, -0.5]}>
        <RectWindow w={1.5} h={1.55} depth={0.14} frameColor={G.cream} glassColor="#1a2440" />
      </group>
    </group>
  )
}

// ── Main building body ───────────────────────────────

export default function Gowlett() {
  const brickMat   = useMemo(() => paintMat(G.brick, { emissive: '#c4b460', emissiveIntensity: 0.025 }), [])
  const fasciaMat  = useMemo(() => paintMat(G.fascia, { emissive: '#480e12', emissiveIntensity: 0.04 }), [])
  const fasciaMidM = useMemo(() => paintMat(G.fasciaMid), [])
  const corniceMat = useMemo(() => paintMat(G.cornice), [])
  const redBandMat = useMemo(() => paintMat(G.red), [])
  const stepMat    = useMemo(() => paintMat(G.cornice), [])

  // Wing dimensions
  const frontW = 9, sideW = 8, depth = 9

  return (
    <group name="gowlett-pub">

      {/* ── CHAMFERED CORNER ─────────── */}
      {/* Offset so front is at z=-4.5, side at x=-4.5 */}
      <ChamferCorner />

      {/* ── FRONT WING (Z-facing) ────── */}
      {/* Ground floor fascia */}
      <RoundedBox args={[frontW, 5.5, depth]} radius={0.18} smoothness={4} position={[frontW * 0.5 + 1.5, 2.75, 0]}>
        <primitive object={fasciaMat} attach="material" />
      </RoundedBox>
      {/* Storey 2 */}
      <RoundedBox args={[frontW, 5.2, depth]} radius={0.15} smoothness={4} position={[frontW * 0.5 + 1.5, 8.85, 0]}>
        <primitive object={brickMat} attach="material" />
      </RoundedBox>
      {/* Attic parapet */}
      <RoundedBox args={[frontW, 2.8, depth]} radius={0.14} smoothness={4} position={[frontW * 0.5 + 1.5, 13.8, 0]}>
        <primitive object={brickMat} attach="material" />
      </RoundedBox>

      {/* Cornice front wing */}
      <RoundedBox args={[frontW + 0.4, 0.44, depth + 0.3]} radius={0.08} smoothness={3} position={[frontW * 0.5 + 1.5, 5.72, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[frontW + 0.4, 0.44, depth + 0.3]} radius={0.08} smoothness={3} position={[frontW * 0.5 + 1.5, 11.68, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      {/* Roof cornice */}
      <RoundedBox args={[frontW + 0.5, 0.65, depth + 0.4]} radius={0.1} smoothness={3} position={[frontW * 0.5 + 1.5, 15.05, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>

      {/* Decorative RED brick band at cornice 2 */}
      {Array.from({ length: 8 }).map((_, i) => (
        <RoundedBox key={i} args={[0.7, 0.28, depth + 0.32]} radius={0.05} smoothness={2}
          position={[0.5 + i * 1.12, 11.38, 0]}>
          <primitive object={redBandMat} attach="material" />
        </RoundedBox>
      ))}

      {/* Storey 2 front windows (3 wide sash) */}
      {[2.5, 5.5, 8.5].map((x, i) => (
        <group key={i} position={[x, 8.9, -4.62]}>
          <RectWindow w={1.45} h={1.7} depth={0.16} frameColor={G.cream} glassColor="#1a2440" />
        </group>
      ))}
      {/* Attic front windows */}
      {[3.5, 6.5].map((x, i) => (
        <group key={i} position={[x, 13.9, -4.62]}>
          <RectWindow w={1.2} h={1.35} depth={0.13} frameColor={G.cream} glassColor="#1a2440" />
        </group>
      ))}
      {/* Ground floor large pub windows (3) */}
      {[2.2, 5.2, 8.2].map((x, i) => (
        <group key={i} position={[x, 2.7, -4.62]}>
          <RectWindow w={1.9} h={2.15} depth={0.18} frameColor={G.cream} glassColor="#14203a" divisions={false} />
        </group>
      ))}

      {/* ── SIDE WING (X-facing) ─────── */}
      <RoundedBox args={[depth, 5.5, sideW]} radius={0.18} smoothness={4} position={[0, 2.75, -(sideW * 0.5 + 1.5)]}>
        <primitive object={fasciaMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[depth, 5.2, sideW]} radius={0.15} smoothness={4} position={[0, 8.85, -(sideW * 0.5 + 1.5)]}>
        <primitive object={brickMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[depth, 2.8, sideW]} radius={0.14} smoothness={4} position={[0, 13.8, -(sideW * 0.5 + 1.5)]}>
        <primitive object={brickMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[depth + 0.4, 0.44, sideW + 0.3]} radius={0.08} smoothness={3} position={[0, 5.72, -(sideW * 0.5 + 1.5)]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[depth + 0.4, 0.44, sideW + 0.3]} radius={0.08} smoothness={3} position={[0, 11.68, -(sideW * 0.5 + 1.5)]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[depth + 0.5, 0.65, sideW + 0.4]} radius={0.1} smoothness={3} position={[0, 15.05, -(sideW * 0.5 + 1.5)]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>

      {/* Side windows storey 2 */}
      {[-5.5, -2.5, 0.5].map((z, i) => (
        <group key={i} position={[-4.62, 8.9, z]}>
          <RectWindow w={1.4} h={1.65} depth={0.15} frameColor={G.cream} glassColor="#1a2440" />
        </group>
      ))}

      {/* ── ENTRANCE SIGN BANDS ────────── */}
      <PubHeroSign position={[5.5, 5.06, -4.75]} color={G.fascia} w={8.5} h={0.7} facing="z" />
      <group position={[-4.7, 5.06, -5.0]} rotation={[0, Math.PI * 0.5, 0]}>
        <PubHeroSign position={[0, 0, 0]} color={G.fascia} w={6.5} h={0.7} facing="z" />
      </group>

      {/* ── CORNER ENTRANCE DOOR ────────── */}
      <group position={[-0.15, 1.4, -4.8]} rotation={[0, Math.PI * 0.25, 0]}>
        <RoundedBox args={[1.6, 2.85, 0.22]} radius={0.08} smoothness={3}>
          <primitive object={paintMat(G.cream) as any} attach="material" />
        </RoundedBox>
        <RoundedBox args={[1.28, 2.5, 0.16]} radius={0.06} smoothness={3} position={[0, -0.12, 0.08]}>
          <primitive object={fasciaMat as any} attach="material" />
        </RoundedBox>
        <RoundedBox args={[1.28, 0.4, 0.12]} radius={0.04} smoothness={3} position={[0, 1.32, 0.1]}>
          <primitive
            object={paintMat('#1a2640', { emissive: '#2a3a58', emissiveIntensity: 0.14 }) as any}
            attach="material"
          />
        </RoundedBox>
      </group>

      {/* ── STEPS ──────────────────────── */}
      <RoundedBox args={[3.0, 0.22, 1.0]} radius={0.07} smoothness={3} position={[0.4, 0.11, -5.4]} rotation={[0, Math.PI * 0.25, 0]}>
        <primitive object={stepMat as any} attach="material" />
      </RoundedBox>

      {/* ── CHIMNEYS ─────────────────── */}
      <Chimney position={[4.5, 15.7, -3.5]} color={G.chimney} h={2.4} w={0.78} />
      <Chimney position={[-3.0, 15.7, -3.5]} color={G.chimney} h={2.0} w={0.65} />

      {/* ── WALL SCONCES ─────────────── */}
      <WallSconce position={[2.0, 4.2, -4.72]} />
      <WallSconce position={[8.5, 4.2, -4.72]} />

      {/* ── NIGHTLIFE LIGHTS ─────────── */}
      <NightLight position={[0, 3.1, -5.5]} color="#ffaa50" intensity={9} distance={12} />
      <NightLight position={[5, 3.5, -5.0]} color="#ffc060" intensity={4} distance={7} />

      {/* ── SEATING ────────────────── */}
      <PicnicTable position={[-5, 0, -7.5]} />
      <PicnicTable position={[3.5, 0, -7]} />
      <PicnicTable position={[8, 0, -7.5]} />
      <ToyBench position={[-3, 0, -8.5]} />
    </group>
  )
}
