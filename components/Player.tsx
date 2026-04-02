'use client'

// =============================================================================
// Player.tsx
// Low-poly humanoid character — head, torso, arms, legs all BoxGeometry.
// Walk animation driven entirely by useFrame (no keyframe library).
// WASD / arrow key movement with isLegalMove constraint.
// Camera follows player with [50, 50, 50] offset.
//
// CONSTRAINTS: MeshLambertMaterial, BoxGeometry/CylinderGeometry only.
// =============================================================================

import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { isLegalMove } from '../lib/mapData'

// ── Skin / clothing palette ──────────────────────────────────────────────────
const SKIN   = '#f5c99a'
const COAT   = '#2e3d52'   // dark navy coat
const TROUSER= '#4a3e35'   // dark brown trousers
const SHOE   = '#1a1510'   // near-black shoes
const HAIR   = '#2a1f14'

export default function Player() {
  const group    = useRef<THREE.Group>(null!)
  const lArmRef  = useRef<THREE.Group>(null!)
  const rArmRef  = useRef<THREE.Group>(null!)
  const lLegRef  = useRef<THREE.Group>(null!)
  const rLegRef  = useRef<THREE.Group>(null!)

  const { camera } = useThree()
  const pos      = useRef(new THREE.Vector3(0, 0, 0))
  const keys     = useRef<Record<string, boolean>>({})
  const moving   = useRef(false)
  const camYaw   = useRef(0)

  useEffect(() => {
    const down = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = true  }
    const up   = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup',   up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])

  useFrame(({ clock }, delta) => {
    const speed = 28 * delta
    const next  = pos.current.clone()
    const k     = keys.current

    if (k['w'] || k['arrowup'])    next.z -= speed
    if (k['s'] || k['arrowdown'])  next.z += speed
    if (k['a'] || k['arrowleft'])  next.x -= speed
    if (k['d'] || k['arrowright']) next.x += speed

    moving.current = (next.x !== pos.current.x || next.z !== pos.current.z)

    if (moving.current && isLegalMove(next.x, next.z)) {
      pos.current.copy(next)
    }

    // Smooth character position
    group.current.position.lerp(
      new THREE.Vector3(pos.current.x, 0, pos.current.z), 0.18
    )

    // Face direction of travel
    if (moving.current) {
      const dir = new THREE.Vector3(
        next.x - group.current.position.x,
        0,
        next.z - group.current.position.z
      )
      if (dir.lengthSq() > 0.0001) {
        const angle = Math.atan2(dir.x, dir.z)
        group.current.rotation.y = THREE.MathUtils.lerp(
          group.current.rotation.y, angle, 0.2
        )
      }
    }


    // Walk cycle — limb swing via pivot rotation
    const t     = clock.getElapsedTime()
    const swing = moving.current ? Math.sin(t * 8) * 0.55 : 0
    if (lArmRef.current)  lArmRef.current.rotation.x  =  swing
    if (rArmRef.current)  rArmRef.current.rotation.x  = -swing
    if (lLegRef.current)  lLegRef.current.rotation.x  = -swing
    if (rLegRef.current)  rLegRef.current.rotation.x  =  swing

    // Third-person camera: smooth follow behind player
    const CAM_DIST = 28, CAM_H = 14
    const facingYaw = group.current.rotation.y
    let yawDiff = facingYaw - camYaw.current
    while (yawDiff >  Math.PI) yawDiff -= Math.PI * 2
    while (yawDiff < -Math.PI) yawDiff += Math.PI * 2
    camYaw.current += yawDiff * Math.min(1, delta * 5)

    const gp = group.current.position
    const camTarget = new THREE.Vector3(
      gp.x - Math.sin(camYaw.current) * CAM_DIST,
      CAM_H,
      gp.z - Math.cos(camYaw.current) * CAM_DIST,
    )
    camera.position.lerp(camTarget, Math.min(1, delta * 8))
    camera.lookAt(gp.x, 3, gp.z)
  })

  // ── Character geometry — all BoxGeometry, pivot groups for limb rotation ──
  return (
    <group ref={group} position={[0, 0, 0]}>

      {/* HEAD */}
      <mesh position={[0, 5.6, 0]}>
        <boxGeometry args={[1.1, 1.1, 1.1]} />
        <meshLambertMaterial color={SKIN} />
      </mesh>
      {/* Hair cap */}
      <mesh position={[0, 6.25, 0]}>
        <boxGeometry args={[1.15, 0.35, 1.15]} />
        <meshLambertMaterial color={HAIR} />
      </mesh>

      {/* TORSO */}
      <mesh position={[0, 4.0, 0]}>
        <boxGeometry args={[1.4, 1.8, 0.9]} />
        <meshLambertMaterial color={COAT} />
      </mesh>

      {/* LEFT ARM (pivot at shoulder) */}
      <group ref={lArmRef} position={[-0.95, 4.7, 0]}>
        <mesh position={[0, -0.75, 0]}>
          <boxGeometry args={[0.5, 1.5, 0.5]} />
          <meshLambertMaterial color={COAT} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -1.6, 0]}>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          <meshLambertMaterial color={SKIN} />
        </mesh>
      </group>

      {/* RIGHT ARM (pivot at shoulder) */}
      <group ref={rArmRef} position={[0.95, 4.7, 0]}>
        <mesh position={[0, -0.75, 0]}>
          <boxGeometry args={[0.5, 1.5, 0.5]} />
          <meshLambertMaterial color={COAT} />
        </mesh>
        <mesh position={[0, -1.6, 0]}>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          <meshLambertMaterial color={SKIN} />
        </mesh>
      </group>


      {/* LEFT LEG (pivot at hip) */}
      <group ref={lLegRef} position={[-0.38, 3.0, 0]}>
        <mesh position={[0, -0.85, 0]}>
          <boxGeometry args={[0.55, 1.7, 0.55]} />
          <meshLambertMaterial color={TROUSER} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -1.82, 0.15]}>
          <boxGeometry args={[0.55, 0.35, 0.75]} />
          <meshLambertMaterial color={SHOE} />
        </mesh>
      </group>

      {/* RIGHT LEG (pivot at hip) */}
      <group ref={rLegRef} position={[0.38, 3.0, 0]}>
        <mesh position={[0, -0.85, 0]}>
          <boxGeometry args={[0.55, 1.7, 0.55]} />
          <meshLambertMaterial color={TROUSER} />
        </mesh>
        <mesh position={[0, -1.82, 0.15]}>
          <boxGeometry args={[0.55, 0.35, 0.75]} />
          <meshLambertMaterial color={SHOE} />
        </mesh>
      </group>

    </group>
  )
}
