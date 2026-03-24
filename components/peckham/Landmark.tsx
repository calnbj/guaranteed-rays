'use client'
import { Text, Box } from '@react-three/drei'
import { BASE_Y, TILE_W, darken } from './utils'

export function Landmark({ node }: { node: any }) {
  const levels = node.features?.levels || 2
  const heightPerLevel = 0.7
  const color = node.color || "#ffffff"
  
  return (
    <group position={[node.x, 0, node.z]}>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[TILE_W, 0.2, TILE_W]} />
        <meshLambertMaterial color="#cdc3b3" />
      </mesh>
      {[...Array(levels)].map((_, i) => (
        <Box 
          key={i} 
          args={[1.8 - (i * 0.2), heightPerLevel, 1.8 - (i * 0.2)]} 
          position={[0, BASE_Y + (i * heightPerLevel) + heightPerLevel/2, 0]}
        >
          <meshLambertMaterial color={i === 0 ? color : darken(color, i * 15)} />
        </Box>
      ))}
      <Text
        position={[0, (levels * heightPerLevel) + 1, 0]}
        fontSize={0.3}
        color="#3a3028"
        anchorY="bottom"
      >
        {node.name}
      </Text>
    </group>
  )
}
