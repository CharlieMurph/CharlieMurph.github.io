// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let dx;
let rect_width;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  dx = 5;
  rect_width = 50;

}

function draw() {
background(100, 0, 255);

//move rectangle
x += dx

//check if the wall was hit
if (x + rect_width > width || x < 0) {
  dx = dx * -1
}

//display rectangle
fill(0, 255, 100);
rect(x, 400, rect_width, 200);

}
