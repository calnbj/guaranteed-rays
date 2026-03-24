export const mapNodes = [
  { x: 0, z: 0, type: 'pub', name: 'VICTORIA', color: '#7b9acc' },
  { x: 0, z: -15, type: 'road' },
  { x: 10, z: -30, type: 'pub', name: 'MONTPELIER', color: '#ce7d78' },
  { x: 25, z: -30, type: 'road' },
  { x: 40, z: -10, type: 'pub', name: 'GOWLETT', color: '#8fb9a8' },
  { x: 20, z: 20, type: 'road' },
  { x: -10, z: 40, type: 'road' },
  { x: -40, z: 50, type: 'pub', name: 'EDT', color: '#eaccad' },
  { x: -25, z: 80, type: 'park' },
  { x: -30, z: 90, type: 'pub', name: 'CLOCK HOUSE', color: '#b28dbe' },
]

export const isLegalMove = (x: number, z: number) => {
  // WIDENED RADIUS: 15 units instead of 7
  return mapNodes.some(node => {
    const distance = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.z - z, 2));
    return distance < 15; 
  });
}
