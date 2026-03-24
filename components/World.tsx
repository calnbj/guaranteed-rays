'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#111' }}>
      {/* Turn off shadows and use a basic renderer to stop the GL errors */}
      <Canvas shadows={false} gl={{ antialias: false, alpha: true }}>
        <color attach="background" args={['#111']} />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        
        {/* THE ISLAND */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[100, 32]} />
          <meshBasicMaterial color="#222" />
        </mesh>

        {/* THE VICTORIA (Start) - Using Basic Material (no shadows/lights needed) */}
        <mesh position={[0, 4, 0]}>
          <boxGeometry args={[5, 8, 5]} />
          <meshBasicMaterial color="#5B5BFF" />
        </mesh>

        {/* THE MONTPELIER */}
        <mesh position={[15, 4, -20]}>
          <boxGeometry args={[4, 7, 4]} />
          <meshBasicMaterial color="#444" />
        </mesh>

        <OrbitControls />
      </Canvas>
    </div>
  )
}
