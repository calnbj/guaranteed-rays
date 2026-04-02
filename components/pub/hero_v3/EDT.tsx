'use client'

/**
 * EDT.tsx — East Dulwich Tavern, Lordship Lane
 * ─────────────────────────────────────────────────────────
 * Visual character:
 * • Sage green painted Victorian pub — warm and inviting
 * • 2 storeys + gabled dormers on the upper roof
 * • Corner position, L-shaped plan
 * • Decorative off-white trim bands between floors
 * • Ground-floor large bay windows (slight bow outward)
 * • Deep eaves with wooden decorative bargeboards
 * • Double-height entrance canopy in sage/cream
 * • Hanging baskets and window boxes with bright flowers
 * ─────────────────────────────────────────────────────────
 */

import React, { useMemo } from 'react'
import { RoundedBox } from '@react-three/drei'
import {
  ArchedWindow, RectWindow,
  PubHeroSign, Chimney, Awning, ToyBench, PicnicTable,
  NightLight, WallSconce, FlowerBasket, paintMat,
} from './PubShared'

const E = {
  sage:        '#6a9a6a', // sage green
  sageDark:    '#4a7848', // darker sage
  sageLight:   '#8aba8a', // lighter sage highlight
  cream:       '#f0e8d8',
  cornice:     '#e8e0d0',
  trim:        '#d4cfc0',
  chimney:     '#7a9070',
  bargeBoard:  '#3a5a3a',
  awning:      '#5a8a58',
  awningStripe:'#a0c878',
}

// ── Gabled dormer ─────────────────────────────────────

function GableDormer({ position = [0, 0, 0] as [number, number, number] }) {
  const sageMat  = useMemo(() => paintMat(E.sage, { emissive: '#4a7848', emissiveIntensity: 0.03 }), [])
  const creamMat = useMemo(() => paintMat(E.cream), [])
  const bargeMat = useMemo(() => paintMat(E.bargeBoard), [])
  return (
    <group position={position}>
      {/* Dormer body */}
      <RoundedBox args={[3.2, 3.5, 1.0]} radius={0.12} smoothness={3} position={[0, 1.75, 0]}>
        <primitive object={sageMat} attach="material" />
      </RoundedBox>
      {/* Peaked gable rooflet */}
      <mesh position={[0, 3.5, 0]}>
        <coneGeometry args={[2.2, 1.8, 4]} />
        <primitive object={sageMat} attach="material" />
      </mesh>
      {/* Barge boards */}
      <RoundedBox args={[0.12, 2.2, 0.12]} radius={0.04} smoothness={2}
        position={[-1.65, 3.8, 0]} rotation={[0, 0, 0.42]}>
        <primitive object={bargeMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[0.12, 2.2, 0.12]} radius={0.04} smoothness={2}
        position={[1.65, 3.8, 0]} rotation={[0, 0, -0.42]}>
        <primitive object={bargeMat} attach="material" />
      </RoundedBox>
      {/* Dormer window */}
      <group position={[0, 1.8, -0.55]}>
        <RectWindow w={1.4} h={1.55} depth={0.14} frameColor={E.cream} glassColor="#1a2a30" />
      </group>
      {/* Trim band below dormer */}
      <RoundedBox args={[3.4, 0.2, 1.05]} radius={0.05} smoothness={2} position={[0, 0.1, 0]}>
        <primitive object={creamMat} attach="material" />
      </RoundedBox>
    </group>
  )
}

// ── Main body ─────────────────────────────────────────

export default function EDT() {
  const sageMat    = useMemo(() => paintMat(E.sage, { emissive: '#4a7a50', emissiveIntensity: 0.04 }), [])
  const sageDarkM  = useMemo(() => paintMat(E.sageDark, { emissive: '#305830', emissiveIntensity: 0.04 }), [])
  const corniceMat = useMemo(() => paintMat(E.cornice), [])
  const trimMat    = useMemo(() => paintMat(E.trim), [])
  const stepMat    = useMemo(() => paintMat(E.cream), [])

  return (
    <group name="edt-pub">

      {/* ── FRONT WING ──────────────────── */}
      {/* Ground floor */}
      <RoundedBox args={[10, 5.6, 9]} radius={0.2} smoothness={4} position={[0, 2.8, 0]}>
        <primitive object={sageDarkM} attach="material" />
      </RoundedBox>
      {/* Storey 2 */}
      <RoundedBox args={[10, 5.5, 9]} radius={0.16} smoothness={4} position={[0, 9.05, 0]}>
        <primitive object={sageMat} attach="material" />
      </RoundedBox>

      {/* ── SIDE WING ─────────────────── */}
      <RoundedBox args={[9, 5.6, 8]} radius={0.2} smoothness={4} position={[-4.5, 2.8, -4.5]}>
        <primitive object={sageDarkM} attach="material" />
      </RoundedBox>
      <RoundedBox args={[9, 5.5, 8]} radius={0.16} smoothness={4} position={[-4.5, 9.05, -4.5]}>
        <primitive object={sageMat} attach="material" />
      </RoundedBox>

      {/* ── CORNICE BANDS ──────────────── */}
      <RoundedBox args={[10.4, 0.44, 9.35]} radius={0.08} smoothness={3} position={[0, 5.78, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[10.5, 0.65, 9.5]} radius={0.1} smoothness={3} position={[0, 12.1, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      {/* Side wing cornices */}
      <RoundedBox args={[9.4, 0.44, 8.35]} radius={0.08} smoothness={3} position={[-4.5, 5.78, -4.5]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[9.5, 0.65, 8.5]} radius={0.1} smoothness={3} position={[-4.5, 12.1, -4.5]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>

      {/* Decorative trim band mid-storey 2 */}
      <RoundedBox args={[10.2, 0.22, 0.22]} radius={0.05} smoothness={2} position={[0, 10.5, -4.58]}>
        <primitive object={trimMat} attach="material" />
      </RoundedBox>

      {/* ── GABLED DORMERS on roof ──────── */}
      <GableDormer position={[-3, 12.5, -3.5]} />
      <GableDormer position={[3, 12.5, -3.5]} />

      {/* Side wing dormer */}
      <group rotation={[0, Math.PI * 0.5, 0]}>
        <GableDormer position={[0, 12.5, 4.6]} />
      </group>

      {/* ── WINDOWS ──────────────────────── */}
      {/* Ground floor bow windows (3) — slightly projected */}
      {[-3.2, 0, 3.2].map((x, i) => (
        <group key={i} position={[x, 2.7, -4.65]}>
          <RectWindow w={1.9} h={2.2} depth={0.2} frameColor={E.cream} glassColor="#14241a" divisions={false} />
        </group>
      ))}

      {/* Storey 2 arched windows (3) */}
      {[-3.2, 0, 3.2].map((x, i) => (
        <group key={i} position={[x, 9.05, -4.65]}>
          <ArchedWindow w={1.15} h={1.85} d={0.16} frameColor={E.cream} glassColor="#1a3028" archHeight={0.44} />
        </group>
      ))}

      {/* Side wing windows GF (2) */}
      {[-7.5, -2.5].map((z, i) => (
        <group key={i} position={[-8.62, 2.7, z]}>
          <RectWindow w={1.7} h={2.1} depth={0.18} frameColor={E.cream} glassColor="#14241a" divisions={false} />
        </group>
      ))}
      {/* Side storey 2 (2) */}
      {[-7.5, -2.5].map((z, i) => (
        <group key={i} position={[-8.62, 9.05, z]}>
          <ArchedWindow w={1.1} h={1.8} d={0.15} frameColor={E.cream} glassColor="#1a3028" archHeight={0.42} />
        </group>
      ))}

      {/* ── PUB SIGN ────────────────────── */}
      <PubHeroSign position={[0, 5.08, -4.76]} color={E.sageDark} w={8.5} h={0.72} facing="z" />

      {/* ── AWNING ──────────────────────── */}
      <Awning position={[0, 4.42, -5.4]} w={9} color={E.awning} stripeColor={E.awningStripe} />

      {/* ── ENTRANCE DOOR ─────────────── */}
      <group position={[0, 1.42, -4.68]}>
        <RoundedBox args={[1.65, 2.85, 0.22]} radius={0.07} smoothness={3}>
          <primitive object={paintMat(E.cream) as any} attach="material" />
        </RoundedBox>
        <RoundedBox args={[1.32, 2.48, 0.16]} radius={0.06} smoothness={3} position={[0, -0.12, 0.09]}>
          <primitive object={sageDarkM as any} attach="material" />
        </RoundedBox>
        <RoundedBox args={[1.32, 0.4, 0.13]} radius={0.04} smoothness={3} position={[0, 1.32, 0.11]}>
          <primitive
            object={paintMat('#1a2430', { emissive: '#283848', emissiveIntensity: 0.14 }) as any}
            attach="material"
          />
        </RoundedBox>
      </group>

      {/* ── STEPS ────────────────────── */}
      <RoundedBox args={[3.6, 0.22, 0.9]} radius={0.06} smoothness={3} position={[0, 0.11, -5.15]}>
        <primitive object={stepMat as any} attach="material" />
      </RoundedBox>

      {/* ── CHIMNEYS ─────────────────── */}
      <Chimney position={[-2.5, 12.8, -3.2]} color={E.chimney} h={2.2} w={0.72} />
      <Chimney position={[2.5, 12.8, -3.2]} color={E.chimney} h={1.8} w={0.62} />

      {/* ── FLOWER BASKETS ──────────── */}
      <FlowerBasket position={[-3.8, 4.9, -4.68]} />
      <FlowerBasket position={[0, 4.9, -4.68]} />
      <FlowerBasket position={[3.8, 4.9, -4.68]} />

      {/* ── WALL SCONCES ─────────────── */}
      <WallSconce position={[-2, 4.1, -4.7]} />
      <WallSconce position={[2, 4.1, -4.7]} />

      {/* ── NIGHTLIFE LIGHTS ─────────── */}
      <NightLight position={[0, 3.0, -5.5]} color="#ffaa40" intensity={9} distance={12} />
      <NightLight position={[-3.5, 3.5, -5.0]} color="#ffcc60" intensity={4} distance={7} />

      {/* ── SEATING ──────────────────── */}
      <ToyBench position={[-5, 0, -7]} rotation={[0, 0.1, 0]} />
      <ToyBench position={[5, 0, -7]} rotation={[0, -0.1, 0]} />
      <PicnicTable position={[0, 0, -8.5]} />
      <PicnicTable position={[-4, 0, -9]} />
    </group>
  )
}
