// Interactive Scene
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let mysong;

function preload() {
  soundFormats("mp3");
  mysong = loadSound("assets/allstar.mp3");
}

function keyTyped() {
  if (key === "w") {
    background(255);
  }
  else if (key === "b") {
    background(0);
  }
  else if (key === "p") {
    mysong.Volume(50);
    mysong.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(55);
}

function draw() {
 keytyped();
}
