'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei'
import { Landmark } from './Landmark'
import { RoadTile, ParkTile } from './Environment'
import { mapNodes } from '../../lib/mapData'

export default function World() {
  return (
    <div className="w-full h-screen bg-[#e8e2d6]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[-15, 15, -15]} fov={35} />
        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2.1} />
        <color attach="background" args={['#e8e2d6']} />
        <fog attach="fog" args={['#e8e2d6', 10, 50]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
        {mapNodes.map((node: any) => {
          if (node.type === 'pub') return <Landmark key={node.id} node={node} />
          if (node.type === 'road') return <RoadTile key={node.id} node={node} />
          if (node.type === 'park') return <ParkTile key={node.id} node={node} />
          return null
        })}
        <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={20} blur={2} />
      </Canvas>
    </div>
  )
}
