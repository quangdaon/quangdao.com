export type Coordinates = [number, number];

export const rotateAngle = (
  [x, y]: Coordinates,
  theta: number
): Coordinates => {
  return [
    x * Math.cos(theta) - y * Math.sin(theta),
    x * Math.sin(theta) + y * Math.cos(theta),
  ];
};

export const rotateAngleAroundOrigin = (
  [x,y]: Coordinates,
  [originX, originY]: Coordinates,
  theta: number
) => {
  const [newX, newY] = rotateAngle([x - originX, y - originY], theta);
  return [newX + originX, newY + originY];
}