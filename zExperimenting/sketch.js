// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let y2;
let r = random(255);
let g = random(255);
let b = random(255);

function setup() {
  createCanvas(windowWidth, windowHeight);
  y2 = windowHeight / 2;

}

function draw() {
  background(255);
  playerPaddle();

}

function playerPaddle() {
  fill(20);
  rect(10,y2 - 25, 20, 50);
  if (y2 - 50 >= 0) {
    if (keyIsPressed) {
      if (keyCode === 38) {
        return y2 -= 10;
      }
  else if (y2 + 50 <= windowHeight) {
    if (keyCode === 40) {
      return y2 += 10;
        }
      }
    }
  }
}
