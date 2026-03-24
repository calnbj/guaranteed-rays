export const roads = [
  { x: 0, z: 0 },   // Victoria Inn
  { x: 0, z: -10 }, 
  { x: 10, z: -20 }, // Montpelier
  { x: 20, z: -20 }, 
  { x: 30, z: -10 },
  { x: 35, z: 30 },  // Gowlett
  { x: 10, z: 40 },
  { x: -40, z: 50 }, // EDT
  { x: -30, z: 90 }, // Clock House
  { x: -35, z: 130 },// Herne
  { x: 80, z: 100 }, // Ivy House
]

export const isLegalMove = (x: number, z: number) => {
  return roads.some(path => {
    const dx = Math.abs(path.x - x);
    const dz = Math.abs(path.z - z);
    return dx < 6 && dz < 6; // Buffer for walking
  });
}
