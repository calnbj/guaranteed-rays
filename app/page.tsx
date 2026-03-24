'use client'
import dynamic from 'next/dynamic'

// We use dynamic loading to prevent SSR issues with Three.js
const World = dynamic(() => import('./components/World'), { ssr: false })

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}>
      <World />
    </main>
  )
}
