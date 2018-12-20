// Fractal TRIANGLE
// Charlie Murphy
// Dec. 20th, 2018
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let startingPoints = [{x: 500, y: 50}, {x: 100, y: 750}, {x: 900, y: 750}];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // background(random(255), random(255), random(255));
  coolTriangle(startingPoints, 5);

}

function coolTriangle(points, depth) {
  let theColors = ["blue", "red", "yellow", "white", "cyan", "orange"];
  fill(theColors[depth]);
  triangle(points[0].x, points[0].y,points[1].x, points[1].y, points[2].x, points[2].y);
  if (depth > 0) {
    coolTriangle([points[0], midPoint(points[0], points[1]), midPoint(points[0], points[2])], depth - 1);
    coolTriangle([points[1], midPoint(points[0], points[1]), midPoint(points[1], points[2])], depth - 1);
    coolTriangle([points[2], midPoint(points[0], points[2]), midPoint(points[1], points[2])], depth - 1);
  }
}

function midPoint(point1, point2) {
  let x = (point1.x + point2.x) / 2;
  let y = (point1.y + point2.y) / 2;
  return {x: x, y: y};
}
