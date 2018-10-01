// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state;
const BUTTON_WIDTH = 200;
const BUTTON_HEIGHT = 100;
let diameter, sliceWidth;
let x, y;
let mouseReticleColour = ["white", "red", "white", "red"];
let i;

function setup() {
  createCanvas(windowWidth, windowHeight);
  state = 0;
}

function draw() {
  determineState();
  mouseReticle();
}

function determineState() {
  if (state === 0) {
    displayMainMenu();
  }
}

function displayMainMenu() {
  background(100);
  displayButton1();
  displayButton2();
}

function displayButton1() {
  fill(100, 200, 0);
  strokeWeight(5);
  stroke(255, 0, 0);
  rect(windowWidth / 2 - BUTTON_WIDTH/ 2, windowHeight / 2 - BUTTON_HEIGHT, BUTTON_WIDTH,BUTTON_HEIGHT);
  fill (0);
  noStroke();
  textSize(32);
  textAlign(CENTER);
  text("Game 1", windowWidth / 2 - BUTTON_WIDTH / 2, windowHeight / 2 - BUTTON_HEIGHT, BUTTON_WIDTH, BUTTON_HEIGHT /2);
}

function displayButton2() {
  fill(100, 200, 0);
  strokeWeight(5);
  stroke(255, 0, 0);
  rect(windowWidth / 2 - BUTTON_WIDTH/ 2, windowHeight / 2 + BUTTON_HEIGHT, BUTTON_WIDTH,BUTTON_HEIGHT);
  fill (0);
  noStroke();
  textSize(32);
  textAlign(CENTER);
  text("Game 2", windowWidth / 2 - BUTTON_WIDTH / 2, windowHeight / 2 + BUTTON_HEIGHT, BUTTON_WIDTH, BUTTON_HEIGHT /2);
}

function mouseReticle() {
  diameter = 40;
  sliceWidth = diameter/ 4;
  for (let i = 0; i < 4; i++) {
    fill (mouseReticleColour[i]);
    stroke (0);
    strokeWeight(2);
    ellipse(mouseX,mouseY,diameter, diameter);
    diameter -= sliceWidth;
  }
}
