'use client'
import { Text } from '@react-three/drei'
import { MapNode } from '../../lib/mapData'
import { BASE_Y, TILE_W, darken } from './utils'

export function RoadTile({ node }: { node: MapNode }) {
  return (
    <group position={[node.x, 0, node.z]}>
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[TILE_W + 0.08, 0.04, TILE_W + 0.08]} />
        <meshLambertMaterial color="#c4baaa" />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[TILE_W, 0.2, TILE_W]} />
        <meshLambertMaterial color="#d1c7b7" />
      </mesh>
      {node.street && (
        <Text
          position={[0, BASE_Y + 0.02, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.3}
          color="#a89f94"
          anchorX="center"
          anchorY="middle"
        >
          {node.street}
        </Text>
      )}
    </group>
  )
}

export function PaperTree({ offset, tint = '#4a8a3a' }: { offset: [number, number, number], tint?: string }) {
  return (
    <group position={offset}>
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.07, 0.11, 0.76, 5]} />
        <meshLambertMaterial color="#7a5c3e" />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <coneGeometry args={[0.62, 0.96, 6]} />
        <meshLambertMaterial color={darken(tint, 10)} />
      </mesh>
      <mesh position={[0, 1.52, 0]}>
        <coneGeometry args={[0.43, 0.8, 6]} />
        <meshLambertMaterial color={tint} />
      </mesh>
    </group>
  )
}
