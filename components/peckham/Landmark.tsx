'use client'
import { Text, Box } from '@react-three/drei'
import { any } from '../../lib/mapData'
import { BASE_Y, TILE_W } from './utils'

export function Landmark({ node }: { node: any }) {
  const levels = node.features?.levels || 1
  const heightPerLevel = 0.8
  
  return (
    <group position={[node.x, 0, node.z]}>
      {/* Base Slab */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[TILE_W, 0.2, TILE_W]} />
        <meshLambertMaterial color="#cdc3b3" />
      </mesh>

      {/* Stacked Levels */}
      {[...Array(levels)].map((_, i) => (
        <Box 
          key={i} 
          args={[1.8 - (i * 0.2), heightPerLevel, 1.8 - (i * 0.2)]} 
          position={[0, BASE_Y + (i * heightPerLevel) + heightPerLevel/2, 0]}
        >
          <meshLambertMaterial color={node.color || "#ffffff"} />
        </Box>
      ))}

      <Text
        position={[0, (levels * heightPerLevel) + 1.5, 0]}
        fontSize={0.3}
        color="#3a3028"
      >
        {node.name}
      </Text>
    </group>
  )
}
