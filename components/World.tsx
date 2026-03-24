'use client'
import { Canvas } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import { Suspense } from 'react'
import Player from './Player'
import { mapNodes } from '../lib/mapData'

function Pub({ node }) {
  return (
    <group position={[node.x, 0, node.z]}>
      <Float speed={1.5} floatIntensity={0.3}>
        <Text 
          position={[0, 9, 0]} 
          fontSize={1.8} 
          color="#555"
        >
          {node.name}
        </Text>
      </Float>

      {/* Main Building */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[5, 5, 5]} />
        <meshLambertMaterial color={node.color} />
      </mesh>

      {/* Monument Valley Style Roof */}
      <mesh position={[0, 6, 0]}>
        <coneGeometry args={[3.5, 3, 4]} />
        <meshLambertMaterial color={node.color} />
      </mesh>
    </group>
  )
}

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#e8e2d6' }}>
      <Canvas 
        camera={{ fov: 35, position: [70, 70, 70] }}
        onCreated={({ gl }) => {
          gl.setClearColor('#e8e2d6')
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[20, 40, 20]} intensity={1.2} />
        
        <Suspense fallback={null}>
          <Player onMove={() => {}} />

          {mapNodes.map((node, i) => (
            <group key={i}>
              {/* Road Tile */}
              <mesh position={[node.x, 0.1, node.z]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[12, 12]} />
                <meshLambertMaterial color="#d1c7b7" />
              </mesh>
              
              {node.type === 'pub' && <Pub node={node} />}
            </group>
          ))}

          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
            <planeGeometry args={[1000, 1000]} />
            <meshLambertMaterial color="#e8e2d6" />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  )
}
