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
  else if (state === 1) {
    displaySmashMouth();
  }
}

function displayMainMenu() {
  background(100);
  displayButton1();
  displayButton2();
  if (buttonHover() === 1) {
    displayButton1Alt();
  }
  else if (buttonHover() === 2){
    displayButton2Alt();
  }
  // Add in "if mouseisclicked()"
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
  text("Game 1", windowWidth / 2 - BUTTON_WIDTH / 2, windowHeight / 2 - BUTTON_HEIGHT + 30, BUTTON_WIDTH, BUTTON_HEIGHT /2);
}

function displayButton1Alt() {
  fill(255, 0, 0);
  strokeWeight(5);
  stroke(100, 200, 0);
  rect(windowWidth / 2 - BUTTON_WIDTH/ 2, windowHeight / 2 - BUTTON_HEIGHT, BUTTON_WIDTH,BUTTON_HEIGHT);
  fill (0);
  noStroke();
  textSize(32);
  textAlign(CENTER);
  text("Game 1", windowWidth / 2 - BUTTON_WIDTH / 2, windowHeight / 2 - BUTTON_HEIGHT + 30, BUTTON_WIDTH, BUTTON_HEIGHT /2);
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
  text("Game 2", windowWidth / 2 - BUTTON_WIDTH / 2, windowHeight / 2 + BUTTON_HEIGHT + 30, BUTTON_WIDTH, BUTTON_HEIGHT /2);
}

function displayButton2Alt() {
  fill(255, 0, 0);
  strokeWeight(5);
  stroke(100, 200, 0);
  rect(windowWidth / 2 - BUTTON_WIDTH/ 2, windowHeight / 2 + BUTTON_HEIGHT, BUTTON_WIDTH,BUTTON_HEIGHT);
  fill (0);
  noStroke();
  textSize(32);
  textAlign(CENTER);
  text("Game 2", windowWidth / 2 - BUTTON_WIDTH / 2, windowHeight / 2 + BUTTON_HEIGHT + 30, BUTTON_WIDTH, BUTTON_HEIGHT /2);
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

function buttonHover() {
  if (windowWidth / 2 - BUTTON_WIDTH/ 2 <= mouseX && windowWidth / 2 + BUTTON_WIDTH / 2 >= mouseX) {
    // Hovering over button 1
    if (windowHeight / 2 - BUTTON_HEIGHT <= mouseY && windowHeight / 2 >= mouseY) {
      return 1;
    }
    // Hovering over button 2
    else if (windowHeight / 2 + BUTTON_HEIGHT * 2 >= mouseY && windowHeight / 2 + BUTTON_HEIGHT <= mouseY) {
      return 2;
    }
  }
}

function displaySmashMouth() {
  textAlign(CENTER);
  textSize(20);
  text("Work in Progress..... Coming soon I hope.", CENTER, CENTER);
}
