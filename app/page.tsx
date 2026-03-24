'use client'
import dynamic from 'next/dynamic'

// This loads the 3D world directly, no iframes, no localhost
const World = dynamic(() => import('./components/World'), { ssr: false })

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}>
      <World />
    </main>
  )
}
