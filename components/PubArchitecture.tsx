'use client'

/**
 * PubArchitecture.tsx
 * ─────────────────────────────────────────────────────────
 * Top-level barrel file for the High-Fidelity Pub Hero system.
 *
 * Architecture:
 *   PubArchitecture  ← single entry point used by World.tsx
 *     ├── Victoria   (Bellenden Rd — corner Victorian, bottle-green fascia, lime awning)
 *     ├── Gowlett    (Gowlett Rd  — ochre brick, maroon fascia, chamfered corner)
 *     ├── Skehans    (sub for 'gowlett' node — orange brick, green frames, stepped gable)
 *     ├── Montpelier (Choumert Rd — dark navy brick, iron railings)
 *     ├── Clockhouse (Barry Rd   — rendered facade, Gothic clock tower)
 *     └── EDT        (Lordship Ln — sage green, gabled dormers)
 *
 * Design system: Monument Valley / WoraWork "Soft-Surface" aesthetic
 * All geometry uses RoundedBox / bevelled shapes — zero raw 90° corners.
 * MeshStandardMaterial configured for painterly/matcap look (roughness=1,
 * metalness=0, warm emissive tint on light faces).
 * Localized warm PointLights at every entryway for nightlife atmosphere.
 * ─────────────────────────────────────────────────────────
 */

import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import each hero asset so they split cleanly
// STATIC IMPORT (Forces the new 'Clay' look to load immediately)
import VictoriaHF from './pub/Victoria_HighFidelity'

// These stay dynamic for now
const Skehans    = dynamic(() => import('./pub/hero_v3/Skehans'),    { ssr: false })
const Gowlett    = dynamic(() => import('./pub/hero_v3/Gowlett'),    { ssr: false })
const Montpelier = dynamic(() => import('./pub/hero_v3/Montpelier'), { ssr: false })
const Clockhouse = dynamic(() => import('./pub/hero_v3/Clockhouse'), { ssr: false })
const EDT        = dynamic(() => import('./pub/hero_v3/EDT'),        { ssr: false })

// ─────────────────────────────────────────────────────────
// Route table  — maps mapData node IDs → Hero components
// ─────────────────────────────────────────────────────────
const PUB_MAP: Record<string, React.ComponentType> = {
  victoria:   VictoriaHF,
  gowlett:    Gowlett,
  skehans:    Skehans,
  montpelier: Montpelier,
  clockhouse: Clockhouse,
  edt:        EDT,
}

// ─────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────
export default function PubArchitecture({ pubName }: { pubName: string }) {
  const Component = PUB_MAP[pubName]
  if (!Component) return null
  return <Component />
}
