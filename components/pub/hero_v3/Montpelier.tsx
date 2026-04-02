'use client'

/**
 * Montpelier.tsx — The Montpelier, Choumert Road, Peckham
 * ─────────────────────────────────────────────────────────
 * Reference: ink illustration (square corner pub)
 * • Dark brick / slate-grey facade, 3 storeys
 * • Symmetrical composition — two equal flanking wings
 * • Wide sash windows throughout all floors
 * • Ornate projecting cornice with bracketed eaves
 * • Ground floor: large picture windows with deep reveals
 * • Characteristic hanging flower baskets on iron brackets
 * • Flat roof with parapet, central chimney stacks
 * • Corner entrance with a pilastered doorway
 * • Outdoor bench seating with low iron railing
 * ─────────────────────────────────────────────────────────
 */

import React, { useMemo } from 'react'
import { RoundedBox } from '@react-three/drei'
import {
  ArchedWindow, RectWindow,
  PubHeroSign, Chimney, ToyBench, PicnicTable,
  NightLight, WallSconce, FlowerBasket, paintMat,
} from './PubShared'

const M = {
  brick:       '#3a4868', // dark slate-navy brick
  brickMid:    '#2e3c5a',
  brickLight:  '#4a5878',
  fascia:      '#1e2e4a', // very dark navy
  cream:       '#f0e8d8',
  cornice:     '#e8e0d0',
  stone:       '#c8c0b0',
  chimney:     '#324058',
  ironwork:    '#2a2a2a',
}

// ── Iron railing ──────────────────────────────────────

function IronRailing({ position = [0, 0, 0] as [number, number, number], w = 8 }) {
  const mat = useMemo(() => paintMat(M.ironwork), [])
  const posts = Math.floor(w / 0.8)
  return (
    <group position={position}>
      {/* Top rail */}
      <RoundedBox args={[w, 0.1, 0.1]} radius={0.04} smoothness={2} position={[0, 0.9, 0]}>
        <primitive object={mat} attach="material" />
      </RoundedBox>
      {/* Bottom rail */}
      <RoundedBox args={[w, 0.1, 0.1]} radius={0.04} smoothness={2} position={[0, 0.3, 0]}>
        <primitive object={mat} attach="material" />
      </RoundedBox>
      {/* Pickets */}
      {Array.from({ length: posts }).map((_, i) => (
        <RoundedBox key={i} args={[0.07, 0.95, 0.07]} radius={0.02} smoothness={2}
          position={[-w * 0.5 + 0.4 + i * 0.8, 0.48, 0]}>
          <primitive object={mat} attach="material" />
        </RoundedBox>
      ))}
    </group>
  )
}

export default function Montpelier() {
  const brickMat   = useMemo(() => paintMat(M.brick, { emissive: '#2a3858', emissiveIntensity: 0.04 }), [])
  const fasciaMat  = useMemo(() => paintMat(M.fascia, { emissive: '#141e30', emissiveIntensity: 0.05 }), [])
  const corniceMat = useMemo(() => paintMat(M.cornice), [])
  const stoneMat   = useMemo(() => paintMat(M.stone), [])
  const stepMat    = useMemo(() => paintMat(M.stone), [])

  return (
    <group name="montpelier-pub">

      {/* ── MAIN BODY ───────────────────── */}
      {/* Ground floor fascia */}
      <RoundedBox args={[12, 5.5, 8.5]} radius={0.2} smoothness={4} position={[0, 2.75, 0]}>
        <primitive object={fasciaMat} attach="material" />
      </RoundedBox>

      {/* Storey 2 */}
      <RoundedBox args={[12, 5.4, 8.5]} radius={0.16} smoothness={4} position={[0, 8.95, 0]}>
        <primitive object={brickMat} attach="material" />
      </RoundedBox>

      {/* Storey 3 */}
      <RoundedBox args={[12, 5.0, 8.5]} radius={0.14} smoothness={4} position={[0, 14.85, 0]}>
        <primitive object={brickMat} attach="material" />
      </RoundedBox>

      {/* Parapet cap */}
      <RoundedBox args={[12.2, 0.55, 8.7]} radius={0.1} smoothness={3} position={[0, 17.63, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>

      {/* ── CORNICES ──────────────────── */}
      {/* String course S1→S2 */}
      <RoundedBox args={[12.3, 0.44, 8.6]} radius={0.08} smoothness={3} position={[0, 5.72, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      {/* String course S2→S3 */}
      <RoundedBox args={[12.3, 0.44, 8.6]} radius={0.08} smoothness={3} position={[0, 11.92, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      {/* Bracketed eaves cornice */}
      <RoundedBox args={[12.5, 0.72, 8.8]} radius={0.12} smoothness={3} position={[0, 17.2, 0]}>
        <primitive object={stoneMat} attach="material" />
      </RoundedBox>
      {/* Eave dentil brackets */}
      {Array.from({ length: 11 }).map((_, i) => (
        <RoundedBox key={i} args={[0.26, 0.38, 0.3]} radius={0.06} smoothness={2}
          position={[-5.2 + i * 1.04, 16.82, -4.38]}>
          <primitive object={stoneMat} attach="material" />
        </RoundedBox>
      ))}

      {/* ── PILASTERS at corners ──────── */}
      {[-6.08, 6.08].map((x, i) => (
        <RoundedBox key={i} args={[0.48, 17.5, 0.4]} radius={0.08} smoothness={3} position={[x, 8.75, -4.12]}>
          <primitive object={stoneMat} attach="material" />
        </RoundedBox>
      ))}

      {/* ── WINDOWS ──────────────────── */}
      {/* Ground floor - 3 large picture windows */}
      {[-3.8, 0, 3.8].map((x, i) => (
        <group key={i} position={[x, 2.7, -4.38]}>
          <RectWindow w={2.1} h={2.25} depth={0.2} frameColor={M.cream} glassColor="#10182a" divisions={false} />
        </group>
      ))}

      {/* Storey 2 - 4 arched sash windows */}
      {[-4.5, -1.5, 1.5, 4.5].map((x, i) => (
        <group key={i} position={[x, 8.95, -4.38]}>
          <ArchedWindow w={1.1} h={1.9} d={0.16} frameColor={M.cream} glassColor="#182238" archHeight={0.46} />
        </group>
      ))}

      {/* Storey 3 - 4 rect windows */}
      {[-4.5, -1.5, 1.5, 4.5].map((x, i) => (
        <group key={i} position={[x, 14.85, -4.38]}>
          <RectWindow w={1.0} h={1.55} depth={0.14} frameColor={M.cream} glassColor="#182238" />
        </group>
      ))}

      {/* ── PUB SIGN ─────────────────── */}
      <PubHeroSign position={[0, 5.04, -4.5]} color={M.fascia} w={10} h={0.72} facing="z" />

      {/* ── ENTRANCE DOOR ─────────────── */}
      <group position={[0, 1.42, -4.52]}>
        <RoundedBox args={[1.7, 2.9, 0.24]} radius={0.08} smoothness={3}>
          <primitive object={stoneMat as any} attach="material" />
        </RoundedBox>
        <RoundedBox args={[1.35, 2.52, 0.16]} radius={0.06} smoothness={3} position={[0, -0.12, 0.1]}>
          <primitive object={fasciaMat as any} attach="material" />
        </RoundedBox>
        {/* Pilasters on door surround */}
        {[-0.74, 0.74].map((x, i) => (
          <RoundedBox key={i} args={[0.18, 2.9, 0.14]} radius={0.04} smoothness={2} position={[x, 0, 0.05]}>
            <primitive object={stoneMat as any} attach="material" />
          </RoundedBox>
        ))}
        {/* Transom light */}
        <RoundedBox args={[1.35, 0.42, 0.13]} radius={0.04} smoothness={3} position={[0, 1.34, 0.12]}>
          <primitive
            object={paintMat('#1a2440', { emissive: '#283860', emissiveIntensity: 0.16 }) as any}
            attach="material"
          />
        </RoundedBox>
      </group>

      {/* ── STEPS ────────────────────── */}
      <RoundedBox args={[3.8, 0.22, 0.9]} radius={0.06} smoothness={3} position={[0, 0.11, -5.0]}>
        <primitive object={stepMat as any} attach="material" />
      </RoundedBox>
      <RoundedBox args={[4.8, 0.12, 1.4]} radius={0.05} smoothness={3} position={[0, 0.06, -5.46]}>
        <primitive object={stepMat as any} attach="material" />
      </RoundedBox>

      {/* ── IRON RAILINGS ─────────────── */}
      <IronRailing position={[-4.8, 0, -6.5]} w={6.8} />
      <IronRailing position={[4.8, 0, -6.5]} w={6.8} />

      {/* ── CHIMNEYS ─────────────────── */}
      <Chimney position={[-3.5, 18.2, -3.2]} color={M.chimney} h={2.4} w={0.75} />
      <Chimney position={[3.5, 18.2, -3.2]} color={M.chimney} h={2.0} w={0.65} />

      {/* ── FLOWER BASKETS ──────────── */}
      <FlowerBasket position={[-4.5, 5.0, -4.42]} />
      <FlowerBasket position={[-1.5, 5.0, -4.42]} />
      <FlowerBasket position={[1.5, 5.0, -4.42]} />
      <FlowerBasket position={[4.5, 5.0, -4.42]} />

      {/* ── WALL SCONCES ─────────────── */}
      <WallSconce position={[-2.5, 4.2, -4.5]} />
      <WallSconce position={[2.5, 4.2, -4.5]} />

      {/* ── NIGHTLIFE LIGHTS ─────────── */}
      <NightLight position={[0, 3.0, -5.6]} color="#ffaa40" intensity={9} distance={13} />
      <NightLight position={[-4, 3.5, -5.2]} color="#ffcc60" intensity={4.5} distance={7} />

      {/* ── SEATING ──────────────────── */}
      <ToyBench position={[-5, 0, -7]} rotation={[0, 0.1, 0]} />
      <ToyBench position={[0, 0, -8]} />
      <ToyBench position={[5, 0, -7]} rotation={[0, -0.1, 0]} />
      <PicnicTable position={[-3.5, 0, -9]} />
      <PicnicTable position={[3.5, 0, -9]} />
    </group>
  )
}
