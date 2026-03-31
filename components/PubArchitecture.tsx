'use client'

import React from 'react'

// Reusable window void
function Win({ x, y, z, w=1.2, h=1.6, d=0.12, color='#1e2d52' }) {
  return <mesh position={[x,y,z]}><boxGeometry args={[w,h,d]}/><meshLambertMaterial color={color}/></mesh>
}

// Window with lighter surround trim
function WinTrim({ x, y, z, w=1.2, h=1.6, d=0.12 }) {
  return (
    <group position={[x,y,z]}>
      {/* Surround */}
      <mesh><boxGeometry args={[w+0.22, h+0.22, d*0.5]}/><meshLambertMaterial color="#d4cfc8"/></mesh>
      {/* Glass */}
      <mesh position={[0,0,d*0.3]}><boxGeometry args={[w,h,d]}/><meshLambertMaterial color="#1e2d52"/></mesh>
    </group>
  )
}

// Hanging pub sign: wall bracket + board + text via a coloured panel
function PubSign({ text, color='#2d3e6a', x=0, y=0, z=0, facingZ=true }) {
  const faceOffset = facingZ ? 0.08 : 0
  return (
    <group position={[x, y, z]}>
      {/* Bracket arm */}
      <mesh position={[0, 0.4, facingZ ? -0.4 : 0]}><boxGeometry args={[0.1, 0.1, 0.8]}/><meshLambertMaterial color="#5a4a3a"/></mesh>
      {/* Sign board */}
      <mesh position={[0, 0, facingZ ? -0.85 : -0.85]}>
        <boxGeometry args={[2.8, 0.9, 0.12]}/>
        <meshLambertMaterial color={color}/>
      </mesh>
      {/* Gold lettering panel */}
      <mesh position={[0, 0, facingZ ? -0.79 : -0.79]}>
        <boxGeometry args={[2.6, 0.65, 0.04]}/>
        <meshLambertMaterial color="#c9a84c"/>
      </mesh>
    </group>
  )
}
// Entrance steps (2 stepped platforms)
function Steps({ x=0, z=0, w=3, d=1.2, facing=1 }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.18, facing*0.3]}><boxGeometry args={[w, 0.36, d*0.5]}/><meshLambertMaterial color="#ccc4b8"/></mesh>
      <mesh position={[0, 0.08, facing*0.65]}><boxGeometry args={[w+0.2, 0.16, d*0.5]}/><meshLambertMaterial color="#bbb4a8"/></mesh>
    </group>
  )
}

// Outdoor bench
function Bench({ x=0, y=0, z=0, rot=0 }) {
  return (
    <group position={[x,y,z]} rotation={[0,rot,0]}>
      <mesh position={[0,0.5,0]}><boxGeometry args={[2,0.12,0.5]}/><meshLambertMaterial color="#7a6040"/></mesh>
      <mesh position={[-0.8,0.2,0]}><boxGeometry args={[0.1,0.4,0.5]}/><meshLambertMaterial color="#5a4030"/></mesh>
      <mesh position={[0.8,0.2,0]}><boxGeometry args={[0.1,0.4,0.5]}/><meshLambertMaterial color="#5a4030"/></mesh>
    </group>
  )
}

// Outdoor table + stools
function TableSet({ x=0, y=0, z=0 }) {
  return (
    <group position={[x,y,z]}>
      <mesh position={[0,0.85,0]}><boxGeometry args={[1.6,0.1,1.6]}/><meshLambertMaterial color="#7a6040"/></mesh>
      <mesh position={[0,0.4,0]}><boxGeometry args={[0.1,0.8,0.1]}/><meshLambertMaterial color="#5a4030"/></mesh>
      {[[-0.7,0.5,0],[0.7,0.5,0],[0,0.5,-0.7],[0,0.5,0.7]].map(([sx,sy,sz],i)=>(
        <mesh key={i} position={[sx,sy,sz]}><boxGeometry args={[0.6,0.1,0.6]}/><meshLambertMaterial color="#6a5030"/></mesh>
      ))}
    </group>
  )
}
// VICTORIA - Hero anchor Victorian pub
function Victoria() {
  return (
    <group>
      {/* Main building block - 3 storeys */}
      <mesh position={[0, 7, 0]}><boxGeometry args={[14, 14, 10]}/><meshLambertMaterial color="#d2824a"/></mesh>
      
      {/* Left bay section - taller, 4 units deep */}
      <mesh position={[-4.5, 8, 0]}><boxGeometry args={[5, 16, 10]}/><meshLambertMaterial color="#d2824a"/></mesh>
      
      {/* Darker brick course bands between floors */}
      <mesh position={[0, 13.5, -5]}><boxGeometry args={[14, 0.5, 10]}/><meshLambertMaterial color="#b86838"/></mesh>
      <mesh position={[0, 9, -5]}><boxGeometry args={[14, 0.5, 10]}/><meshLambertMaterial color="#b86838"/></mesh>
      <mesh position={[-4.5, 15, -5]}><boxGeometry args={[5, 0.5, 10]}/><meshLambertMaterial color="#b86838"/></mesh>
      
      {/* Corner quoins (stone trim) */}
      <mesh position={[-7.2, 7, 0]}><boxGeometry args={[0.6, 14, 0.4]}/><meshLambertMaterial color="#c4b8a8"/></mesh>
      <mesh position={[7.2, 7, 0]}><boxGeometry args={[0.6, 14, 0.4]}/><meshLambertMaterial color="#c4b8a8"/></mesh>
      <mesh position={[-7.2, 8, 0]}><boxGeometry args={[0.4, 16, 0.6]}/><meshLambertMaterial color="#c4b8a8"/></mesh>
      
      {/* Roof cornice band main block */}
      <mesh position={[0, 14.2, -5]}><boxGeometry args={[14.8, 0.8, 10.4]}/><meshLambertMaterial color="#e8d8c8"/></mesh>
      
      {/* Roof cornice band bay */}
      <mesh position={[-4.5, 16.2, -5]}><boxGeometry args={[5.8, 0.8, 10.4]}/><meshLambertMaterial color="#e8d8c8"/></mesh>
    </group>
  )
}      {/* Chimneys on roof */}
      <mesh position={[-2, 15.5, -4.2]}><cylinderGeometry args={[0.35, 0.35, 1.8]}/><meshLambertMaterial color="#b86838"/></mesh>
      <mesh position={[2, 15.5, -4.2]}><cylinderGeometry args={[0.35, 0.35, 1.8]}/><meshLambertMaterial color="#b86838"/></mesh>
      <mesh position={[-4.5, 16.8, -4.2]}><cylinderGeometry args={[0.3, 0.3, 1.6]}/><meshLambertMaterial color="#b86838"/></mesh>
      
      {/* Third floor windows - main block (6 windows) */}
      <WinTrim x={-5.5} y={11.5} z={-5.1} />
      <WinTrim x={-2.5} y={11.5} z={-5.1} />
      <WinTrim x={0.5} y={11.5} z={-5.1} />
      <WinTrim x={3.5} y={11.5} z={-5.1} />
      <WinTrim x={5.5} y={11.5} z={-5.1} />
      <WinTrim x={6.8} y={11.5} z={-5.1} />
      
      {/* Third floor windows - bay */}
      <WinTrim x={-4.5} y={13} z={-5.1} />
      <WinTrim x={-4.5} y={12} z={-5.1} w={0.9} h={1.4} />
      
      {/* Second floor windows - main block (6 windows) */}
      <WinTrim x={-5.5} y={8} z={-5.1} w={1.4} h={1.8} />
      <WinTrim x={-2.5} y={8} z={-5.1} w={1.4} h={1.8} />
      <WinTrim x={0.5} y={8} z={-5.1} w={1.4} h={1.8} />
      <WinTrim x={3.5} y={8} z={-5.1} w={1.4} h={1.8} />
      <WinTrim x={5.5} y={8} z={-5.1} w={1.4} h={1.8} />
      <WinTrim x={6.8} y={8} z={-5.1} w={1.4} h={1.8} />
      
      {/* Second floor windows - bay (tall) */}
      <WinTrim x={-4.5} y={9} z={-5.1} w={1.2} h={2.2} />
      <WinTrim x={-4.5} y={8} z={-5.1} w={1.2} h={2.2} />
      
      {/* Ground floor windows - main block (4 large display windows) */}
      <WinTrim x={-4} y={4.5} z={-5.1} w={2} h={2} />
      <WinTrim x={-0.5} y={4.5} z={-5.1} w={2} h={2} />
      <WinTrim x={3} y={4.5} z={-5.1} w={2} h={2} />
      <WinTrim x={6} y={4.5} z={-5.1} w={1.8} h={2} />
    </group>
  )
}      {/* Ground floor window - bay */}
      <WinTrim x={-4.5} y={4.2} z={-5.1} w={1.8} h={2.2} />
      
      {/* Pub sign - large, mounted high on front */}
      <PubSign text="THE VICTORIA" color="#d2824a" x={2} y={10} z={-5.2} />
      
      {/* Central bay projection on ground floor */}
      <mesh position={[1, 3.5, -5.5]}><boxGeometry args={[3, 7, 1.2]}/><meshLambertMaterial color="#c07050"/></mesh>
      
      {/* Steps at front entrance */}
      <Steps x={1} z={-7} w={3.5} d={1.2} facing={1} />
      
      {/* 4 outdoor benches out front */}
      <Bench x={-4} y={0} z={-8} rot={0.2} />
      <Bench x={-1} y={0} z={-9} rot={-0.15} />
      <Bench x={3} y={0} z={-8.5} rot={0.1} />
      <Bench x={6} y={0} z={-9} rot={-0.2} />
    </group>
  )
}

// GOWLETT - Corner brick building, 2 storeys
function Gowlett() {
  return (
    <group>
      {/* Main block L-shaped */}
      <mesh position={[0, 4, 0]}><boxGeometry args={[10, 8, 8]}/><meshLambertMaterial color="#c07050"/></mesh>
      
      {/* Side wing */}
      <mesh position={[-3.5, 4, -6]}><boxGeometry args={[7, 8, 5]}/><meshLambertMaterial color="#c07050"/></mesh>
      
      {/* Dark brick courses between floors */}
      <mesh position={[0, 8, -4]}><boxGeometry args={[10, 0.4, 8]}/><meshLambertMaterial color="#a05840"/></mesh>
      <mesh position={[-3.5, 8, -6]}><boxGeometry args={[7, 0.4, 5]}/><meshLambertMaterial color="#a05840"/></mesh>
      
      {/* Mortar/trim bands */}
      <mesh position={[0, 8.3, -4]}><boxGeometry args={[10.4, 0.3, 8.4]}/><meshLambertMaterial color="#d4b8a8"/></mesh>
      <mesh position={[-3.5, 8.3, -6]}><boxGeometry args={[7.4, 0.3, 5.4]}/><meshLambertMaterial color="#d4b8a8"/></mesh>
      
      {/* Roof cornice */}
      <mesh position={[0, 8.5, -4]}><boxGeometry args={[10.6, 0.6, 8.6]}/><meshLambertMaterial color="#d4b8a8"/></mesh>
      <mesh position={[-3.5, 8.5, -6]}><boxGeometry args={[7.6, 0.6, 5.6]}/><meshLambertMaterial color="#d4b8a8"/></mesh>
    </group>
  )
}      {/* Corner chimney */}
      <mesh position={[-3.5, 8.8, -3.8]}><cylinderGeometry args={[0.35, 0.35, 1.6]}/><meshLambertMaterial color="#a05840"/></mesh>
      
      {/* Ground floor pub windows - main block (3 large) */}
      <WinTrim x={-3.5} y={3} z={-4.1} w={2.2} h={2.4} />
      <WinTrim x={1} y={3} z={-4.1} w={2.2} h={2.4} />
      <WinTrim x={5.5} y={3} z={-4.1} w={2} h={2.4} />
      
      {/* Ground floor windows - side wing */}
      <WinTrim x={-3.5} y={3} z={-8.5} w={1.8} h={2} />
      
      {/* First floor windows - main block (3) */}
      <WinTrim x={-3.5} y={6.5} z={-4.1} w={1.6} h={1.6} />
      <WinTrim x={1} y={6.5} z={-4.1} w={1.6} h={1.6} />
      <WinTrim x={5.5} y={6.5} z={-4.1} w={1.6} h={1.6} />
      
      {/* First floor windows - side wing (2) */}
      <WinTrim x={-6.5} y={6.5} z={-6} w={1.4} h={1.6} />
      <WinTrim x={-0.5} y={6.5} z={-8.5} w={1.4} h={1.6} />
      
      {/* Pub sign at corner - 'THE GOWLETT' */}
      <PubSign text="THE GOWLETT" color="#c07050" x={-5} y={6.5} z={-4.2} />
      
      {/* Steps at corner entrance */}
      <Steps x={-3.5} z={-3} w={3} d={1} facing={1} />
      
      {/* 2 outdoor tables with stools */}
      <TableSet x={-5} y={0} z={-1.5} />
      <TableSet x={2} y={0} z={-6} />
    </group>
  )
}

// MONTPELIER - Deep navy blue Victorian terrace
function Montpelier() {
  return (
    <group>
      {/* Main building body */}
      <mesh position={[0, 6, 0]}><boxGeometry args={[8, 12, 7]}/><meshLambertMaterial color="#2d3e6a"/></mesh>
      
      {/* Upper storey slightly darker */}
      <mesh position={[0, 8.5, 0]}><boxGeometry args={[8, 5, 7]}/><meshLambertMaterial color="#3d4e7a"/></mesh>
      
      {/* Ivory ground floor band */}
      <mesh position={[0, 2, -3.5]}><boxGeometry args={[8.2, 3.5, 7.2]}/><meshLambertMaterial color="#e8e0d0"/></mesh>
      
      {/* Dark courses between floors */}
      <mesh position={[0, 7.2, -3.5]}><boxGeometry args={[8, 0.4, 7]}/><meshLambertMaterial color="#1d2e5a"/></mesh>
      <mesh position={[0, 11, -3.5]}><boxGeometry args={[8, 0.4, 7]}/><meshLambertMaterial color="#1d2e5a"/></mesh>
      
      {/* Roof cornice */}
      <mesh position={[0, 11.8, -3.5]}><boxGeometry args={[8.4, 0.6, 7.4]}/><meshLambertMaterial color="#e8e0d0"/></mesh>
    </group>
  )
}      {/* Teal/green hanging flower baskets on brackets (3 per floor, 2 floors) */}
      <group position={[-3, 9.5, -3.6]}>
        <mesh><boxGeometry args={[0.08, 0.2, 0.3]}/><meshLambertMaterial color="#5a4a3a"/></mesh>
        <mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.35, 0.35, 0.4]}/><meshLambertMaterial color="#4a9a6a"/></mesh>
      </group>
      
      <group position={[0, 9.5, -3.6]}>
        <mesh><boxGeometry args={[0.08, 0.2, 0.3]}/><meshLambertMaterial color="#5a4a3a"/></mesh>
        <mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.35, 0.35, 0.4]}/><meshLambertMaterial color="#4a9a6a"/></mesh>
      </group>
      
      <group position={[3, 9.5, -3.6]}>
        <mesh><boxGeometry args={[0.08, 0.2, 0.3]}/><meshLambertMaterial color="#5a4a3a"/></mesh>
        <mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.35, 0.35, 0.4]}/><meshLambertMaterial color="#4a9a6a"/></mesh>
      </group>
      
      {/* Lower flower baskets */}
      <group position={[-3, 5, -3.6]}>
        <mesh><boxGeometry args={[0.08, 0.2, 0.3]}/><meshLambertMaterial color="#5a4a3a"/></mesh>
        <mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.35, 0.35, 0.4]}/><meshLambertMaterial color="#4a9a6a"/></mesh>
      </group>
      
      <group position={[0, 5, -3.6]}>
        <mesh><boxGeometry args={[0.08, 0.2, 0.3]}/><meshLambertMaterial color="#5a4a3a"/></mesh>
        <mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.35, 0.35, 0.4]}/><meshLambertMaterial color="#4a9a6a"/></mesh>
      </group>
      
      <group position={[3, 5, -3.6]}>
        <mesh><boxGeometry args={[0.08, 0.2, 0.3]}/><meshLambertMaterial color="#5a4a3a"/></mesh>
        <mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.35, 0.35, 0.4]}/><meshLambertMaterial color="#4a9a6a"/></mesh>
      </group>
      
      {/* Windows - ground floor (3 large on cream) */}
      <WinTrim x={-2.5} y={2.5} z={-3.6} w={1.4} h={2} color="#1e2d52" />
      <WinTrim x={0} y={2.5} z={-3.6} w={1.4} h={2} color="#1e2d52" />
      <WinTrim x={2.5} y={2.5} z={-3.6} w={1.4} h={2} color="#1e2d52" />
      
      {/* Windows - first floor (3) */}
      <WinTrim x={-2.5} y={7.5} z={-3.6} w={1.2} h={1.6} />
      <WinTrim x={0} y={7.5} z={-3.6} w={1.2} h={1.6} />
      <WinTrim x={2.5} y={7.5} z={-3.6} w={1.2} h={1.6} />
      
      {/* Windows - top floor (3) */}
      <WinTrim x={-2.5} y={10.5} z={-3.6} w={1} h={1.4} />
      <WinTrim x={0} y={10.5} z={-3.6} w={1} h={1.4} />
      <WinTrim x={2.5} y={10.5} z={-3.6} w={1} h={1.4} />
    </group>
  )
}      {/* Pub sign - 'THE MONTPELIER' in gold on navy */}
      <PubSign text="THE MONTPELIER" color="#2d3e6a" x={-1} y={9} z={-3.7} />
      
      {/* Steps at front */}
      <Steps x={0} z={-5} w={3.2} d={1} facing={1} />
      
      {/* 3 benches outside */}
      <Bench x={-4} y={0} z={-6} rot={0.1} />
      <Bench x={0} y={0} z={-7} rot={-0.05} />
      <Bench x={4} y={0} z={-6.5} rot={0.15} />
    </group>
  )
}

// CLOCKHOUSE - Converted shop with clock tower on right
function Clockhouse() {
  return (
    <group>
      {/* Main wide storefront block */}
      <mesh position={[0, 4, 0]}><boxGeometry args={[14, 8, 8]}/><meshLambertMaterial color="#9aacb0"/></mesh>
      
      {/* Clock tower on right side */}
      <mesh position={[6, 9, 0]}><boxGeometry args={[4, 18, 4]}/><meshLambertMaterial color="#6e8a8e"/></mesh>
      
      {/* Tower cap - darker */}
      <mesh position={[6, 9.2, 0]}><boxGeometry args={[4.2, 0.8, 4.2]}/><meshLambertMaterial color="#5a7a7e"/></mesh>
      
      {/* Shop-front band - ground floor darker */}
      <mesh position={[0, 2, -4]}><boxGeometry args={[14, 4, 8]}/><meshLambertMaterial color="#8a9ca0"/></mesh>
      
      {/* Large shop-front windows (3 wide display windows) */}
      <WinTrim x={-4.5} y={2} z={-4.1} w={2.8} h={3.2} />
      <WinTrim x={0} y={2} z={-4.1} w={2.8} h={3.2} />
      <WinTrim x={4.5} y={2} z={-4.1} w={2.6} h={3.2} />
      
      {/* Upper floor windows - main building (4) */}
      <WinTrim x={-4.5} y={7} z={-4.1} w={1.6} h={1.8} />
      <WinTrim x={-1.5} y={7} z={-4.1} w={1.6} h={1.8} />
      <WinTrim x={1.5} y={7} z={-4.1} w={1.6} h={1.8} />
      <WinTrim x={4.5} y={7} z={-4.1} w={1.6} h={1.8} />
      
      {/* Tower clock face - ivory disc on front */}
      <mesh position={[6, 9, -2.2]}><cylinderGeometry args={[1.5, 1.5, 0.2]}/><meshLambertMaterial color="#f0ece4"/></mesh>
    </group>
  )
}      {/* Clock numerals - 12 small boxes for roman numerals */}
      {/* 12 position */}
      <mesh position={[6, 10.3, -2.2]}><boxGeometry args={[0.15, 0.3, 0.08]}/><meshLambertMaterial color="#5a7a7e"/></mesh>
      {/* 3 position */}
      <mesh position={[7.3, 9, -2.2]}><boxGeometry args={[0.3, 0.15, 0.08]}/><meshLambertMaterial color="#5a7a7e"/></mesh>
      {/* 6 position */}
      <mesh position={[6, 7.7, -2.2]}><boxGeometry args={[0.15, 0.3, 0.08]}/><meshLambertMaterial color="#5a7a7e"/></mesh>
      {/* 9 position */}
      <mesh position={[4.7, 9, -2.2]}><boxGeometry args={[0.3, 0.15, 0.08]}/><meshLambertMaterial color="#5a7a7e"/></mesh>
      
      {/* Pub sign - 'THE CLOCK HOUSE' */}
      <PubSign text="THE CLOCK HOUSE" color="#9aacb0" x={-3} y={6} z={-4.2} />
      
      {/* Steps at front */}
      <Steps x={-2} z={-6} w={4} d={1.2} facing={1} />
      
      {/* 2 benches */}
      <Bench x={-5} y={0} z={-7} rot={0.15} />
      <Bench x={4} y={0} z={-7.5} rot={-0.1} />
    </group>
  )
}

// EDT (East Dulwich Tavern) - Victorian corner pub, sage green
function EDT() {
  return (
    <group>
      {/* Main building body - 2 storeys */}
      <mesh position={[0, 4.5, 0]}><boxGeometry args={[10, 9, 8]}/><meshLambertMaterial color="#6a9a70"/></mesh>
      
      {/* Upper storey - darker sage */}
      <mesh position={[0, 6.5, 0]}><boxGeometry args={[10, 5, 8]}/><meshLambertMaterial color="#558060"/></mesh>
      
      {/* Gabled roof effect - 2 angled boxes */}
      <mesh position={[-2, 9.8, 0]} rotation={[0, 0, 0.3]}><boxGeometry args={[3, 1.2, 8]}/><meshLambertMaterial color="#558060"/></mesh>
      <mesh position={[2, 9.8, 0]} rotation={[0, 0, -0.3]}><boxGeometry args={[3, 1.2, 8]}/><meshLambertMaterial color="#558060"/></mesh>
      
      {/* Floor divider band */}
      <mesh position={[0, 6.8, -4]}><boxGeometry args={[10, 0.4, 8]}/><meshLambertMaterial color="#f0e8d8"/></mesh>
      
      {/* Trim band along upper */}
      <mesh position={[0, 9.5, -4]}><boxGeometry args={[10.4, 0.5, 8.4]}/><meshLambertMaterial color="#f0e8d8"/></mesh>
      
      {/* Decorative quoins at corners */}
      <mesh position={[-5.2, 4.5, 0]}><boxGeometry args={[0.4, 9, 0.3]}/><meshLambertMaterial color="#f0e8d8"/></mesh>
      <mesh position={[5.2, 4.5, 0]}><boxGeometry args={[0.4, 9, 0.3]}/><meshLambertMaterial color="#f0e8d8"/></mesh>
    </group>
  )
}      {/* Ground floor windows (3 large pub windows) */}
      <WinTrim x={-3.5} y={3.2} z={-4.1} w={2} h={2.4} />
      <WinTrim x={0} y={3.2} z={-4.1} w={2} h={2.4} />
      <WinTrim x={3.5} y={3.2} z={-4.1} w={2} h={2.4} />
      
      {/* Upper floor windows (3) */}
      <WinTrim x={-3.5} y={7} z={-4.1} w={1.4} h={1.8} />
      <WinTrim x={0} y={7} z={-4.1} w={1.4} h={1.8} />
      <WinTrim x={3.5} y={7} z={-4.1} w={1.4} h={1.8} />
      
      {/* Gable windows (2 smaller) */}
      <WinTrim x={-1.5} y={9} z={-4.1} w={1} h={1.2} />
      <WinTrim x={1.5} y={9} z={-4.1} w={1} h={1.2} />
      
      {/* Pub sign - 'EDT' on cream panel */}
      <PubSign text="EDT" color="#6a9a70" x={-2.5} y={7.5} z={-4.2} />
      
      {/* Steps at front */}
      <Steps x={0} z={-6} w={3} d={1} facing={1} />
      
      {/* 2 benches */}
      <Bench x={-3.5} y={0} z={-7} rot={0.1} />
      <Bench x={3.5} y={0} z={-7} rot={-0.1} />
    </group>
  )
}

// Main export function - switch on pubName
export default function PubArchitecture({ pubName }: { pubName: string }) {
  switch (pubName) {
    case 'victoria':   return <Victoria />
    case 'gowlett':    return <Gowlett />
    case 'montpelier': return <Montpelier />
    case 'clockhouse': return <Clockhouse />
    case 'edt':        return <EDT />
    default:           return null
  }
}