'use client'

/**
 * Skehans.tsx — Skehans Pub, Kitto Road, Peckham
 * ─────────────────────────────────────────────────────────
 * Reference study from the illustrated artwork:
 * • Red-orange Victorian brick, 2.5 storeys
 * • Large arched windows ground floor with green wooden frames
 * • Prominent central gable with stepped parapet
 * • Decorative corbelled cornice course in cream stone
 * • Brick quoins at corners (alternating light/dark)
 * • Climbing ivy tendrils on upper facade (represented as green
 *   SoftBox clusters)
 * • Dark green painted ground floor fascia / shopfront
 * • Two chimneys — one tall left, one squat right
 * • 5-panel entrance door, fanlight over, 3 wide steps
 * ─────────────────────────────────────────────────────────
 */

import React, { useMemo } from 'react'
import { RoundedBox } from '@react-three/drei'
import {
  SoftCyl, ArchedWindow, RectWindow,
  PubHeroSign, Chimney, ToyBench, PicnicTable,
  NightLight, WallSconce, FlowerBasket, paintMat,
} from './PubShared'

const S = {
  brick:       '#c8784a', // warm orange-red Victorian brick
  brickMid:    '#b86840', // mid shadow brick
  brickLight:  '#d89060', // highlight brick
  fascia:      '#1e4428', // dark bottle green
  fasciaDark:  '#122818', // deeper green
  cream:       '#ece4d4',
  corbel:      '#e0d8c4',
  ivy:         '#3a7a3a',
  ivyDark:     '#2a5a28',
  chimney:     '#a06038',
  quoin:       '#d8d0c0',
  gable:       '#c07050',
}

// ── Stepped parapet gable ──────────────────────────────

function SteppedGable({ position = [0, 0, 0] as [number, number, number] }) {
  const mat  = useMemo(() => paintMat(S.brick), [])
  const capMat = useMemo(() => paintMat(S.corbel), [])
  return (
    <group position={position}>
      {/* Vertical center mast */}
      <RoundedBox args={[1.8, 4.0, 1.0]} radius={0.1} smoothness={3} position={[0, 2.0, 0]}>
        <primitive object={mat} attach="material" />
      </RoundedBox>
      {/* Left step low */}
      <RoundedBox args={[1.4, 0.55, 1.0]} radius={0.08} smoothness={3} position={[-1.6, 0.28, 0]}>
        <primitive object={mat} attach="material" />
      </RoundedBox>
      {/* Left step mid */}
      <RoundedBox args={[1.2, 0.55, 1.0]} radius={0.08} smoothness={3} position={[-1.6, 0.9, 0]}>
        <primitive object={mat} attach="material" />
      </RoundedBox>
      {/* Right step low */}
      <RoundedBox args={[1.4, 0.55, 1.0]} radius={0.08} smoothness={3} position={[1.6, 0.28, 0]}>
        <primitive object={mat} attach="material" />
      </RoundedBox>
      {/* Right step mid */}
      <RoundedBox args={[1.2, 0.55, 1.0]} radius={0.08} smoothness={3} position={[1.6, 0.9, 0]}>
        <primitive object={mat} attach="material" />
      </RoundedBox>
      {/* Coping caps */}
      <RoundedBox args={[2.0, 0.2, 1.1]} radius={0.06} smoothness={3} position={[0, 4.1, 0]}>
        <primitive object={capMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[1.55, 0.18, 1.1]} radius={0.05} smoothness={3} position={[-1.6, 1.08, 0]}>
        <primitive object={capMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[1.55, 0.18, 1.1]} radius={0.05} smoothness={3} position={[1.6, 1.08, 0]}>
        <primitive object={capMat} attach="material" />
      </RoundedBox>
    </group>
  )
}

// ── Ivy cluster ──────────────────────────────────────

function IvyCluster({ position = [0, 0, 0] as [number, number, number], scale = 1 }) {
  const mat1 = useMemo(() => paintMat(S.ivy, { emissive: S.ivy, emissiveIntensity: 0.04 }), [])
  const mat2 = useMemo(() => paintMat(S.ivyDark), [])
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Main leaf mass */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 8, 6]} />
        <primitive object={mat1} attach="material" />
      </mesh>
      {/* Secondary clusters */}
      <mesh position={[0.4, 0.3, 0]}>
        <sphereGeometry args={[0.35, 7, 5]} />
        <primitive object={mat2} attach="material" />
      </mesh>
      <mesh position={[-0.38, -0.2, 0.1]}>
        <sphereGeometry args={[0.3, 7, 5]} />
        <primitive object={mat1} attach="material" />
      </mesh>
      <mesh position={[0.1, 0.5, 0]}>
        <sphereGeometry args={[0.28, 6, 5]} />
        <primitive object={mat2} attach="material" />
      </mesh>
    </group>
  )
}

// ── Corner quoins ────────────────────────────────────

function QuoinColumn({ position = [0, 0, 0] as [number, number, number], h = 12 }) {
  const mat = useMemo(() => paintMat(S.quoin), [])
  return (
    <group position={position}>
      {Array.from({ length: Math.floor(h / 1.1) }).map((_, i) => (
        <RoundedBox
          key={i}
          args={i % 2 === 0 ? [0.5, 0.42, 0.52] : [0.42, 0.42, 0.6]}
          radius={0.05}
          smoothness={2}
          position={[0, i * 1.1 + 0.21, 0]}
        >
          <primitive object={mat} attach="material" />
        </RoundedBox>
      ))}
    </group>
  )
}

// ── Main Skehans component ───────────────────────────

export default function Skehans() {
  const brickMat   = useMemo(() => paintMat(S.brick, { emissive: '#c07040', emissiveIntensity: 0.035 }), [])
  const fasciaMat  = useMemo(() => paintMat(S.fascia, { emissive: '#1a3820', emissiveIntensity: 0.05 }), [])
  const corbelMat  = useMemo(() => paintMat(S.corbel), [])
  const stepMat    = useMemo(() => paintMat(S.corbel), [])

  return (
    <group name="skehans-pub">

      {/* ── BODY ─────────────────────────── */}
      {/* Ground floor fascia */}
      <RoundedBox args={[13, 5.5, 9]} radius={0.2} smoothness={4} position={[0, 2.75, 0]}>
        <primitive object={fasciaMat} attach="material" />
      </RoundedBox>
      {/* Storey 2 brick */}
      <RoundedBox args={[13, 5.2, 9]} radius={0.16} smoothness={4} position={[0, 8.85, 0]}>
        <primitive object={brickMat} attach="material" />
      </RoundedBox>
      {/* Partial storey 3 / attic */}
      <RoundedBox args={[13, 2.8, 9]} radius={0.14} smoothness={4} position={[0, 13.9, 0]}>
        <primitive object={brickMat} attach="material" />
      </RoundedBox>

      {/* Corbelled cornice courses */}
      <RoundedBox args={[13.4, 0.48, 9.35]} radius={0.1} smoothness={3} position={[0, 5.74, 0]}>
        <primitive object={corbelMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[13.4, 0.48, 9.35]} radius={0.1} smoothness={3} position={[0, 11.72, 0]}>
        <primitive object={corbelMat} attach="material" />
      </RoundedBox>
      {/* Dentil row below storey 2 cornice */}
      {Array.from({ length: 10 }).map((_, i) => (
        <RoundedBox key={i} args={[0.3, 0.24, 0.2]} radius={0.04} smoothness={2}
          position={[-5.6 + i * 1.18, 11.38, -4.58]}>
          <primitive object={corbelMat} attach="material" />
        </RoundedBox>
      ))}

      {/* ── STEPPED GABLE ────────────────── */}
      <SteppedGable position={[0, 15.3, -3.5]} />

      {/* ── CORNER QUOINS ────────────────── */}
      <QuoinColumn position={[-6.56, 0, -4.52]} h={16} />
      <QuoinColumn position={[6.56, 0, -4.52]} h={16} />

      {/* ── GROUND FLOOR WINDOWS (4 wide arched) ── */}
      {[-4.5, -1.5, 1.5, 4.5].map((x, i) => (
        <group key={i} position={[x, 2.8, -4.62]}>
          <ArchedWindow w={1.55} h={2.3} d={0.18} frameColor={S.cream} glassColor="#1a2840" archHeight={0.52} />
        </group>
      ))}

      {/* ── STOREY 2 WINDOWS (5 rect) ──── */}
      {[-5.0, -2.5, 0, 2.5, 5.0].map((x, i) => (
        <group key={i} position={[x, 8.9, -4.62]}>
          <RectWindow w={1.1} h={1.65} depth={0.15} frameColor={S.cream} glassColor="#1a2840" />
        </group>
      ))}

      {/* ── ATTIC WINDOWS (2 rect) ────── */}
      {[-2.5, 2.5].map((x, i) => (
        <group key={i} position={[x, 14.1, -4.62]}>
          <RectWindow w={0.95} h={1.4} depth={0.13} frameColor={S.cream} glassColor="#1a2840" />
        </group>
      ))}

      {/* ── IVY CLUSTERS on upper facade ── */}
      <IvyCluster position={[-5.8, 9.5, -4.55]} scale={0.9} />
      <IvyCluster position={[-3.8, 11.0, -4.55]} scale={0.75} />
      <IvyCluster position={[4.5, 10.5, -4.55]} scale={0.85} />
      <IvyCluster position={[6.0, 8.8, -4.55]} scale={0.7} />
      <IvyCluster position={[5.2, 13.0, -4.55]} scale={0.65} />
      <IvyCluster position={[-5.0, 13.5, -4.55]} scale={0.6} />

      {/* ── ENTRANCE DOOR ──────────────── */}
      <group position={[0, 1.4, -4.72]}>
        <RoundedBox args={[1.6, 2.85, 0.22]} radius={0.08} smoothness={3}>
          <primitive object={paintMat(S.cream) as any} attach="material" />
        </RoundedBox>
        <RoundedBox args={[1.3, 2.5, 0.17]} radius={0.06} smoothness={3} position={[0, -0.1, 0.08]}>
          <primitive object={fasciaMat as any} attach="material" />
        </RoundedBox>
        {/* Fanlight */}
        <RoundedBox args={[1.3, 0.42, 0.12]} radius={0.04} smoothness={3} position={[0, 1.32, 0.1]}>
          <primitive
            object={paintMat('#1a2a48', { emissive: '#2a4060', emissiveIntensity: 0.15 }) as any}
            attach="material"
          />
        </RoundedBox>
      </group>

      {/* ── STEPS ──────────────────────── */}
      <RoundedBox args={[3.5, 0.22, 1.0]} radius={0.07} smoothness={3} position={[0, 0.11, -5.2]}>
        <primitive object={stepMat as any} attach="material" />
      </RoundedBox>
      <RoundedBox args={[4.4, 0.12, 1.5]} radius={0.06} smoothness={3} position={[0, 0.06, -5.7]}>
        <primitive object={stepMat as any} attach="material" />
      </RoundedBox>

      {/* ── PUB SIGN ──────────────────── */}
      <PubHeroSign position={[0, 5.05, -4.75]} color={S.fascia} w={8.5} h={0.72} facing="z" />

      {/* ── CHIMNEYS ─────────────────── */}
      <Chimney position={[-4.5, 15.6, -3.5]} color={S.chimney} h={3.2} w={0.8} />
      <Chimney position={[4.0, 15.6, -3.5]} color={S.chimney} h={2.0} w={0.65} />

      {/* ── WALL SCONCES ─────────────── */}
      <WallSconce position={[-3.5, 4.0, -4.7]} />
      <WallSconce position={[3.5, 4.0, -4.7]} />

      {/* ── NIGHTLIFE LIGHTS ─────────── */}
      <NightLight position={[0, 3.0, -5.6]} color="#ffaa40" intensity={9} distance={13} />
      <NightLight position={[-4, 3.5, -5.0]} color="#ffcc60" intensity={4} distance={7} />

      {/* ── FLOWER BASKETS ──────────── */}
      <FlowerBasket position={[-2.5, 4.8, -4.65]} />
      <FlowerBasket position={[2.5, 4.8, -4.65]} />

      {/* ── SEATING ────────────────── */}
      <PicnicTable position={[-5.5, 0, -7]} />
      <PicnicTable position={[4.5, 0, -7.5]} />
      <ToyBench position={[0, 0, -8]} />
    </group>
  )
}
