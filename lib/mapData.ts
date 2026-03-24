export const mapNodes = [
  { 
    x: 0, z: 0, type: 'pub', name: 'THE VICTORIA', 
    color: '#7b9acc', street: 'Bellenden Rd',
    features: { roof: 'turret', seating: 'benches', levels: 2 } 
  },
  { x: 0, z: -15, type: 'road', street: 'Choumert Rd' },
  { 
    x: 10, z: -30, type: 'pub', name: 'MONTPELIER', 
    color: '#ce7d78', street: 'Choumert Rd',
    features: { roof: 'flat', seating: 'tables', levels: 1 } 
  },
  { x: 25, z: -30, type: 'road', street: 'Gowlett Rd' },
  { 
    x: 40, z: -10, type: 'pub', name: 'GOWLETT', 
    color: '#8fb9a8', street: 'Gowlett Rd',
    features: { roof: 'stepped', seating: 'stools', levels: 1 } 
  },
  { x: 20, z: 20, type: 'road', street: 'Adys Rd' },
  { 
    x: -40, z: 50, type: 'pub', name: 'EDT', 
    color: '#eaccad', street: 'Lordship Lane',
    features: { roof: 'gabled', seating: 'booths', levels: 3 } 
  },
  { x: -25, z: 80, type: 'park', street: 'Peckham Rye' },
  { 
    x: -30, z: 90, type: 'pub', name: 'CLOCK HOUSE', 
    color: '#b28dbe', street: 'Barry Rd',
    features: { roof: 'clock-tower', seating: 'garden', levels: 2 } 
  },
]

export const isLegalMove = (x: number, z: number) => {
  return mapNodes.some(node => {
    const distance = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.z - z, 2));
    return distance < 15; 
  });
}
