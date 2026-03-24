'use client'
import { Canvas } from '@react-three/fiber'
import { Float, Text, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import Player from './Player'
import { mapNodes } from '../lib/mapData'

function Pub({ node }) {
  return (
    <group position={[node.x, 0, node.z]}>
      {/* Name Label */}
      <Float speed={2} floatIntensity={0.5}>
        <Text position={[0, 10, 0]} fontSize={1.5} color="#555" font="https://fonts.gstatic.com/s/raleway/v28/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrQ.woff">
          {node.name}
        </Text>
      </Float>

      {/* Main Building Body */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[5, 5, 5]} />
        <meshLambertMaterial color={node.color} />
      </mesh>

      {/* Architectural Roof (Monument Valley style) */}
      <mesh position={[0, 6, 0]}>
        <cylinderGeometry args={[0, 3, 3, 4]} />
        <meshLambertMaterial color={node.color} />
      </mesh>

      {/* Decorative Base Ring */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.5, 5, 32]} />
        <meshBasicMaterial color="#d1c7b7" />
      </mesh>
    </group>
  )
}

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#e8e2d6' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault fov={30} position={[80, 80, 80]} />
        <color attach="background" args={['#e8e2d6']} />
        
        {/* Soft "Studio" Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[20, 40, 20]} intensity={1.5} />
        <pointLight position={[-20, 10, -20]} intensity={0.5} color="#fff" />

        <Suspense fallback={null}>
          <Player onMove={() => {}} />

          {/* THE PECHKAM CIRCUIT */}
          {mapNodes.map((node, i) => (
            <group key={i}>
              {/* The "Stone" Path Tile */}
              <mesh position={[node.x, 0.1, node.z]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[10, 10]} />
                <meshLambertMaterial color="#d1c7b7" />
              </mesh>
              
              {node.type === 'pub' && <Pub node={node} />}
            </group>
          ))}

          {/* Infinite Baseplate */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
            <planeGeometry args={[2000, 2000]} />
            <meshLambertMaterial color="#e8e2d6" />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  )
}
