'use client'

/**
 * Clockhouse.tsx — The Clock House Tavern, Barry Road, Peckham
 * ─────────────────────────────────────────────────────────
 * Reference: illustrated sketch + photo
 * • Victorian red brick / ochre brick, 3 storeys
 * • PROMINENT Gothic gabled clock tower on the RIGHT
 *   (the single most iconic feature — lancet windows, pointed spire)
 * • Wide shopfront building to the left
 * • Deep red/maroon fascia band ground floor
 * • Large clock face with Roman numerals in circular frame
 * • Ornate Gothic pointed arch over tower entrance
 * • Decorative terracotta ridge tiles
 * • Pergola / covered outdoor seating terrace (from illustrations)
 * ─────────────────────────────────────────────────────────
 */

import React, { useMemo } from 'react'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import {
  SoftCyl, ArchedWindow, RectWindow,
  PubHeroSign, Chimney, ToyBench, PicnicTable,
  NightLight, WallSconce, paintMat,
} from './PubShared'

const C = {
  brick:       '#c8884a', // warm red-orange brick
  brickMid:    '#b07238', // mid-tone brick
  facade:      '#9ab4b8', // blue-grey rendered facade (main body)
  facadeDark:  '#7a9498', // shadow facade
  fascia:      '#8a1820', // dark red fascia band
  cream:       '#ece4d4',
  cornice:     '#e0d8c8',
  tower:       '#6a8a5a', // dark green upper tower woodwork
  towerBrick:  '#b07040', // tower brick
  slate:       '#4a5a5a', // slate roof / spire
  clockFace:   '#f8f0e0', // cream clock face
  chimney:     '#a07840',
}

// ── Gothic Clock Tower ────────────────────────────────

function ClockTower({ position = [0, 0, 0] as [number, number, number] }) {
  const towerMat  = useMemo(() => paintMat(C.towerBrick, { emissive: '#a06030', emissiveIntensity: 0.03 }), [])
  const slateMat  = useMemo(() => paintMat(C.slate), [])
  const corniceMat = useMemo(() => paintMat(C.cornice), [])
  const clockMat  = useMemo(() => paintMat(C.clockFace), [])
  const handMat   = useMemo(() => paintMat('#3a4050'), [])
  const greenMat  = useMemo(() => paintMat(C.tower), [])

  return (
    <group position={position}>
      {/* Tower base — brick square */}
      <RoundedBox args={[5, 8, 5]} radius={0.18} smoothness={4} position={[0, 4, 0]}>
        <primitive object={towerMat} attach="material" />
      </RoundedBox>
      {/* Tower mid section */}
      <RoundedBox args={[4.8, 8, 4.8]} radius={0.16} smoothness={4} position={[0, 13, 0]}>
        <primitive object={towerMat} attach="material" />
      </RoundedBox>
      {/* Cornice ring */}
      <RoundedBox args={[5.2, 0.55, 5.2]} radius={0.1} smoothness={3} position={[0, 17.3, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      {/* Belfry / upper section */}
      <RoundedBox args={[4.6, 4.5, 4.6]} radius={0.15} smoothness={4} position={[0, 19.8, 0]}>
        <primitive object={towerMat} attach="material" />
      </RoundedBox>

      {/* ── CLOCK FACE (front) ── */}
      <group position={[0, 13.5, -2.52]}>
        {/* Circular ring */}
        <SoftCyl rt={1.85} rb={1.85} h={0.28} color={C.cornice} position={[0, 0, 0]} segs={24} />
        {/* Face */}
        <SoftCyl rt={1.65} rb={1.65} h={0.2} color={C.clockFace} position={[0, 0, 0.14]} segs={24} />
        {/* Hour hand */}
        <RoundedBox args={[0.12, 1.1, 0.1]} radius={0.04} smoothness={2} position={[0, 0.42, 0.28]} rotation={[0, 0, 0.35]}>
          <primitive object={handMat} attach="material" />
        </RoundedBox>
        {/* Minute hand */}
        <RoundedBox args={[0.09, 1.45, 0.1]} radius={0.03} smoothness={2} position={[0.22, 0.58, 0.28]} rotation={[0, 0, -1.1]}>
          <primitive object={handMat} attach="material" />
        </RoundedBox>
        {/* 12 Roman numeral marks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 12
          const r = 1.48
          return (
            <RoundedBox
              key={i}
              args={[i % 3 === 0 ? 0.22 : 0.12, 0.09, 0.08]}
              radius={0.03}
              smoothness={2}
              position={[Math.sin(angle) * r, Math.cos(angle) * r, 0.28]}
            >
              <primitive object={handMat} attach="material" />
            </RoundedBox>
          )
        })}
      </group>

      {/* ── LANCET WINDOWS (tower mid) ── */}
      {/* Front and back */}
      {[0, Math.PI].map((ry, i) => (
        <group key={i} position={[0, 13.5, i === 0 ? -2.52 : 2.52]} rotation={[0, ry, 0]}>
          {/* These sit above the clock on back, or below on front */}
        </group>
      ))}
      {/* Tower upper lancet windows */}
      {([
        [0, 0, -2.5, 0],
        [Math.PI * 0.5, -2.5, 0, 0],
        [Math.PI, 0, 2.5, 0],
        [Math.PI * 1.5, 2.5, 0, 0],
      ] as [number, number, number, number][]).map(([ry, x, z, _], i) => (
        <group key={i} position={[x, 19.8, z]} rotation={[0, ry, 0]}>
          <ArchedWindow w={0.9} h={2.0} d={0.15} frameColor={C.cream} glassColor="#1a2448" archHeight={0.55} />
        </group>
      ))}

      {/* ── POINTED SPIRE ── */}
      {/* Octagonal base cap */}
      <mesh position={[0, 22.1, 0]}>
        <cylinderGeometry args={[2.65, 2.65, 0.45, 8]} />
        <primitive object={corniceMat} attach="material" />
      </mesh>
      {/* Spire cone */}
      <mesh position={[0, 26, 0]}>
        <coneGeometry args={[2.4, 8.0, 8]} />
        <primitive object={slateMat} attach="material" />
      </mesh>
      {/* Finial ball */}
      <mesh position={[0, 30.2, 0]}>
        <sphereGeometry args={[0.35, 10, 8]} />
        <meshStandardMaterial color="#6a7a5a" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Corner pinnacles */}
      {([[-2, 2], [2, 2], [-2, -2], [2, -2]] as [number, number][]).map(([px, pz], i) => (
        <group key={i} position={[px, 22.3, pz]}>
          <mesh>
            <coneGeometry args={[0.35, 1.6, 6]} />
            <primitive object={slateMat} attach="material" />
          </mesh>
        </group>
      ))}

      {/* ── NIGHTLIFE LIGHT ── */}
      <NightLight position={[0, 2.5, -3.0]} color="#ff9030" intensity={7} distance={11} />
      <WallSconce position={[-1.8, 4.5, -2.6]} />
      <WallSconce position={[1.8, 4.5, -2.6]} />
    </group>
  )
}

// ── Pergola outdoor seating cover ───────────────────

function Pergola({ position = [0, 0, 0] as [number, number, number], w = 10 }) {
  const mat = useMemo(() => paintMat('#5a4020'), [])
  return (
    <group position={position}>
      {/* Posts */}
      {([-w * 0.5 + 0.5, -w * 0.5 + w * 0.33, -w * 0.5 + w * 0.66, w * 0.5 - 0.5] as number[]).map((x, i) => (
        <RoundedBox key={i} args={[0.22, 2.8, 0.22]} radius={0.05} smoothness={3} position={[x, 1.4, 0]}>
          <primitive object={mat} attach="material" />
        </RoundedBox>
      ))}
      {/* Top rails */}
      <RoundedBox args={[w, 0.16, 0.22]} radius={0.04} smoothness={3} position={[0, 2.8, 0]}>
        <primitive object={mat} attach="material" />
      </RoundedBox>
      {/* Cross slats */}
      {Array.from({ length: 7 }).map((_, i) => (
        <RoundedBox key={i} args={[0.1, 0.1, 3.0]} radius={0.03} smoothness={2}
          position={[-w * 0.5 + 0.8 + i * 1.4, 2.85, 0]}>
          <primitive object={mat} attach="material" />
        </RoundedBox>
      ))}
    </group>
  )
}

// ── Main Clockhouse component ────────────────────────

export default function Clockhouse() {
  const facadeMat  = useMemo(() => paintMat(C.facade, { emissive: '#809498', emissiveIntensity: 0.025 }), [])
  const fasciaMat  = useMemo(() => paintMat(C.fascia, { emissive: '#500e10', emissiveIntensity: 0.04 }), [])
  const corniceMat = useMemo(() => paintMat(C.cornice), [])
  const stepMat    = useMemo(() => paintMat(C.cornice), [])
  const brickMat   = useMemo(() => paintMat(C.brick, { emissive: '#a07030', emissiveIntensity: 0.025 }), [])

  return (
    <group name="clockhouse-pub">

      {/* ── MAIN BUILDING BODY (left of tower) ── */}
      {/* Ground floor */}
      <RoundedBox args={[14, 5.5, 9]} radius={0.18} smoothness={4} position={[-3, 2.75, 0]}>
        <primitive object={fasciaMat} attach="material" />
      </RoundedBox>
      {/* Storey 2 */}
      <RoundedBox args={[14, 5.2, 9]} radius={0.15} smoothness={4} position={[-3, 8.85, 0]}>
        <primitive object={facadeMat} attach="material" />
      </RoundedBox>
      {/* Storey 3 */}
      <RoundedBox args={[14, 4.8, 9]} radius={0.14} smoothness={4} position={[-3, 14.0, 0]}>
        <primitive object={brickMat} attach="material" />
      </RoundedBox>

      {/* Cornice bands */}
      <RoundedBox args={[14.4, 0.44, 9.35]} radius={0.08} smoothness={3} position={[-3, 5.72, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[14.4, 0.44, 9.35]} radius={0.08} smoothness={3} position={[-3, 11.68, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>
      <RoundedBox args={[14.5, 0.65, 9.5]} radius={0.1} smoothness={3} position={[-3, 16.6, 0]}>
        <primitive object={corniceMat} attach="material" />
      </RoundedBox>

      {/* Large display windows GF (3) */}
      {[-7, -3, 1].map((x, i) => (
        <group key={i} position={[x, 2.7, -4.62]}>
          <RectWindow w={2.2} h={2.3} depth={0.2} frameColor={C.cream} glassColor="#14202e" divisions={false} />
        </group>
      ))}

      {/* Storey 2 windows (4 arched) */}
      {[-8, -5, -2, 1].map((x, i) => (
        <group key={i} position={[x, 8.95, -4.62]}>
          <ArchedWindow w={1.15} h={1.85} d={0.16} frameColor={C.cream} glassColor="#1a2848" archHeight={0.46} />
        </group>
      ))}

      {/* Storey 3 windows (3) */}
      {[-7.5, -3.5, 0.5].map((x, i) => (
        <group key={i} position={[x, 14.1, -4.62]}>
          <RectWindow w={1.1} h={1.55} depth={0.14} frameColor={C.cream} glassColor="#1a2848" />
        </group>
      ))}

      {/* ── CLOCK TOWER on right ── */}
      <ClockTower position={[8, 0, 0]} />

      {/* ── PUB SIGN ────────────────── */}
      <PubHeroSign position={[-3, 5.06, -4.76]} color={C.fascia} w={12} h={0.72} facing="z" />

      {/* ── ENTRANCE DOOR ─────────── */}
      <group position={[-3.5, 1.45, -4.72]}>
        <RoundedBox args={[1.6, 2.8, 0.22]} radius={0.07} smoothness={3}>
          <primitive object={paintMat(C.cream) as any} attach="material" />
        </RoundedBox>
        <RoundedBox args={[1.28, 2.42, 0.16]} radius={0.06} smoothness={3} position={[0, -0.12, 0.08]}>
          <primitive object={fasciaMat as any} attach="material" />
        </RoundedBox>
        <RoundedBox args={[1.28, 0.4, 0.12]} radius={0.04} smoothness={3} position={[0, 1.3, 0.1]}>
          <primitive
            object={paintMat('#1a2438', { emissive: '#283858', emissiveIntensity: 0.16 }) as any}
            attach="material"
          />
        </RoundedBox>
      </group>

      {/* ── STEPS ────────────────── */}
      <RoundedBox args={[3.8, 0.22, 1.0]} radius={0.07} smoothness={3} position={[-3.5, 0.11, -5.15]}>
        <primitive object={stepMat as any} attach="material" />
      </RoundedBox>

      {/* ── CHIMNEYS ─────────────── */}
      <Chimney position={[-8.5, 17.2, -3.5]} color={C.chimney} h={2.2} w={0.75} />
      <Chimney position={[-2.0, 17.2, -3.5]} color={C.chimney} h={1.8} w={0.6} />

      {/* ── PERGOLA TERRACE ──────── */}
      <Pergola position={[-4, 0, -8.0]} w={11} />

      {/* ── WALL SCONCES ─────────── */}
      <WallSconce position={[-6, 4.2, -4.72]} />
      <WallSconce position={[-1, 4.2, -4.72]} />

      {/* ── NIGHTLIFE LIGHTS ──────── */}
      <NightLight position={[-3.5, 3.0, -5.8]} color="#ffaa40" intensity={10} distance={13} />
      <NightLight position={[2, 3.5, -5.2]} color="#ffcc60" intensity={4} distance={7} />

      {/* ── SEATING ──────────────── */}
      <PicnicTable position={[-8, 0, -9.5]} />
      <PicnicTable position={[-4, 0, -9.5]} />
      <PicnicTable position={[0, 0, -9.5]} />
      <ToyBench position={[5, 0, -8.5]} />
    </group>
  )
}
