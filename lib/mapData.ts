export const roads = [
  { x: 0, z: 0 },   // Victoria
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
  // We increase the check to 8 units to make the 'roads' feel walkable
  return roads.some(path => {
    const distance = Math.sqrt(Math.pow(path.x - x, 2) + Math.pow(path.z - z, 2));
    return distance < 12; 
  });
}
