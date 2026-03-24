'use client'
import { Canvas } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import { Suspense } from 'react'
import Player from './Player'
import { mapNodes } from '../lib/mapData'

function DecorativeTree({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[1.5, 4, 6]} />
        <meshLambertMaterial color="#8fb98f" />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1]} />
        <meshLambertMaterial color="#8b5a2b" />
      </mesh>
    </group>
  )
}

function Landmark({ node }) {
  return (
    <group position={[node.x, 0, node.z]}>
      <Float speed={1.5} floatIntensity={0.3}>
        <Text position={[0, 9, 0]} fontSize={1.8} color="#4a4a4a">{node.name}</Text>
      </Float>
      {/* THE BUILDING */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[5, 6, 5]} />
        <meshLambertMaterial color={node.color} />
      </mesh>
      {/* DECORATIVE TOP */}
      <mesh position={[0, 6.5, 0]}>
        <cylinderGeometry args={[0, 2.5, 2, 4]} />
        <meshLambertMaterial color={node.color} />
      </mesh>
    </group>
  )
}

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#e8e2d6' }}>
      <Canvas camera={{ fov: 30, position: [100, 100, 100] }}>
        <color attach="background" args={['#e8e2d6']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} />
        
        <Suspense fallback={null}>
          <Player />
          
          {/* THE PHYSICAL ROADS & BUILDINGS */}
          {mapNodes.map((node, i) => (
            <group key={i}>
              {/* ROAD TILE */}
              <mesh position={[node.x, 0.1, node.z]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[10, 10]} />
                <meshLambertMaterial color="#d1c7b7" />
              </mesh>
              
              {node.type === 'pub' && <Landmark node={node} />}
              {node.type === 'park' && <DecorativeTree position={[node.x, 0, node.z]} />}
            </group>
          ))}

          {/* LARGE BASE PLATE */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
            <planeGeometry args={[2000, 2000]} />
            <meshLambertMaterial color="#e8e2d6" />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  )
}
