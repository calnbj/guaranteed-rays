'use client'
import React from 'react'
import { Text } from '@react-three/drei'
import { mapNodes } from '../lib/mapData'

export default function DioramaPath() {
  return (
    <group>
      {/* 1. THE MAIN BASE SLAB (The "Game Board") */}
      <mesh receiveShadow position={[0, -0.1, 0]}>
        <boxGeometry args={[120, 0.2, 120]} />
        <meshLambertMaterial color="#d1c7b7" />
      </mesh>

      {mapNodes.map((node: any) => (
        <group key={node.id} position={[node.x * 4, 0, node.z * 4]}>
          
          {/* 2. THE ROAD TILE (Tactile Square) */}
          <mesh receiveShadow position={[0, 0.05, 0]}>
            <boxGeometry args={[3.8, 0.15, 3.8]} />
            <meshLambertMaterial color="#c4baaa" />
          </mesh>

          {/* 3. THE PUB (Monument Valley Architecture) */}
          {node.type === 'pub' && (
            <group>
              {/* Bottom Tier */}
              <mesh castShadow position={[0, 1, 0]}>
                <boxGeometry args={[2.5, 2, 2.5]} />
                <meshLambertMaterial color="#e5989b" />
              </mesh>
              {/* Top Tier (The "Tower") */}
              <mesh castShadow position={[0, 2.5, 0]}>
                <boxGeometry args={[1.5, 1.5, 1.5]} />
                <meshLambertMaterial color="#b5838d" />
              </mesh>
              {/* Floating Name Label */}
              <Text
                position={[0, 4, 0]}
                fontSize={0.6}
                color="#6d6875"
                font="/fonts/Geist-Bold.woff"
                anchorX="center"
              >
                {node.name}
              </Text>
            </group>
          )}

          {/* 4. THE DECOR (Trees for Park nodes) */}
          {node.type === 'park' && (
            <group position={[0, 0.1, 0]}>
              <mesh castShadow position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.1, 0.2, 1, 6]} />
                <meshLambertMaterial color="#7a5c3e" />
              </mesh>
              <mesh castShadow position={[0, 1.5, 0]}>
                <sphereGeometry args={[0.8, 8, 8]} />
                <meshLambertMaterial color="#83a35d" />
              </mesh>
            </group>
          )}
        </group>
      ))}
    </group>
  )
}
