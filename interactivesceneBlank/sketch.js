// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {
  if (mouseIsPressed && keyIsPressed) {
    if (key === "r") {
      rect(mouseX, mouseY, 10, 10);
    }
  	if (key === "e") {
      ellipse(mouseX, mouseY, 10, 10);
    }
  }
}

function keyTyped() {
  if (key === "w") {
    background(255);
  }
  else if (key === "b") {
    background(0);
  }
}
