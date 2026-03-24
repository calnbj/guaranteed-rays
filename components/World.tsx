'use client'
import { Canvas } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import Player from './Player'
import { mapNodes } from '../lib/mapData'

function Landmark({ node }) {
  return (
    <group position={[node.x, 0, node.z]}>
      <Text position={[0, 10, 0]} fontSize={1.5} color="#4a4a4a" anchorY="middle">
        {node.name}
      </Text>
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[6, 6, 6]} />
        <meshLambertMaterial color={node.color} />
      </mesh>
      <mesh position={[0, 7.5, 0]}>
        <coneGeometry args={[4, 3, 4]} />
        <meshLambertMaterial color={node.color} />
      </mesh>
    </group>
  )
}

export default function World() {
  useEffect(() => { window.focus(); }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#e8e2d6' }}>
      <Canvas camera={{ fov: 40, position: [60, 60, 60] }}>
        <color attach="background" args={['#e8e2d6']} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} />
        
        <Suspense fallback={null}>
          <Player />
          
          {mapNodes.map((node, i) => (
             <group key={i}>
                {/* The Path Slab */}
                <mesh position={[node.x, 0.1, node.z]}>
                   <boxGeometry args={[12, 0.2, 12]} />
                   <meshLambertMaterial color="#d1c7b7" />
                </mesh>
                
                {/* Street Name Label */}
                <Text 
                  position={[node.x, 0.25, node.z + 7]} 
                  rotation={[-Math.PI/2, 0, 0]} 
                  fontSize={0.8} 
                  color="#888"
                >
                  {node.street || ""}
                </Text>

                {node.type === 'pub' && <Landmark node={node} />}
             </group>
          ))}
        </Suspense>
      </Canvas>
    </div>
  )
}
