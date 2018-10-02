// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let i;
let j;
let second;

function setup() {
  createCanvas(windowWidth, windowHeight);
  second = false;
}

function draw() {
  for (i = 0; i < width; i += 50) {
    for (j = 0; j < height; j += 50) {
      if (second === true){
        fill(0);
      }
      else {
        fill(255);
      }
      rect(i, j, 50, 50);
      second = !second;
    }
    second = !second;
  }
}
