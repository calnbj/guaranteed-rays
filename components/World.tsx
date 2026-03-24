'use client'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls, Grid, Float, Text } from '@react-three/drei'
import { Suspense } from 'react'
import Player from './Player'
import { roads } from '../lib/mapData'

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
]

function Landmark({ position, name, color = "#5B5BFF" }) {
  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text position={[0, 6, 0]} fontSize={1.5} color="white">{name}</Text>
      </Float>
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[4, 5, 4]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
    </group>
  )
}

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#050505' }}>
      <KeyboardControls map={keyboardMap}>
        <Canvas camera={{ fov: 45 }}>
          <color attach="background" args={['#050505']} />
          <Suspense fallback={null}>
            <Player />
            
            {/* NEON ROAD PATHS */}
            {roads.map((road, i) => (
              <mesh key={i} position={[road.x, 0.01, road.z]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[10, 10]} />
                <meshBasicMaterial color="#111" transparent opacity={0.5} />
                {/* Thin glowing border for the path */}
                <lineSegments>
                  <edgesGeometry attach="geometry" args={[new (require('three').PlaneGeometry)(10, 10)]} />
                  <lineBasicMaterial attach="material" color="#5B5BFF" />
                </lineSegments>
              </mesh>
            ))}

            <Grid infiniteGrid cellSize={2} cellColor="#111" sectionSize={10} sectionColor="#222" fadeDistance={100} />

            <Landmark position={[0, 0, 0]} name="THE VICTORIA" color="#5B5BFF" />
            <Landmark position={[10, 0, -20]} name="THE MONTPELIER" color="#333" />
            <Landmark position={[35, 0, 30]} name="THE GOWLETT" color="#333" />
            <Landmark position={[-40, 0, 50]} name="EDT" color="#333" />
            <Landmark position={[-30, 0, 90]} name="CLOCK HOUSE" color="#333" />
            <Landmark position={[-35, 0, 130]} name="THE HERNE" color="#333" />
            <Landmark position={[80, 0, 100]} name="THE IVY HOUSE" color="#333" />

          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  )
}
