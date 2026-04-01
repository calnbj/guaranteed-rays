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
const Victoria   = dynamic(() => import('./pub/Victoria'),   { ssr: false })
const Skehans    = dynamic(() => import('./pub/Skehans'),    { ssr: false })
const Gowlett    = dynamic(() => import('./pub/Gowlett'),    { ssr: false })
const Montpelier = dynamic(() => import('./pub/Montpelier'), { ssr: false })
const Clockhouse = dynamic(() => import('./pub/Clockhouse'), { ssr: false })
const EDT        = dynamic(() => import('./pub/EDT'),        { ssr: false })

// ─────────────────────────────────────────────────────────
// Route table  — maps mapData node IDs → Hero components
// ─────────────────────────────────────────────────────────
const PUB_MAP: Record<string, React.ComponentType> = {
  victoria:   Victoria,
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
