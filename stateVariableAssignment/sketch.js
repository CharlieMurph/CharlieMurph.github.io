// State Variable Assignment
// Charlie Murphy
// Oct. 15, 2018
//
// Extra for Experts:
// - The State variable is required to allow the movement from the "main menu"
//  to another page and back. The Extra for Experts is found in the header of
//  my project, the array used to create ellipses

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

// checks the state of code and adjusts sketch based on the state
function determineState() {
  background (255);
  if (state === 0) {
    displayMainMenu();
    mouseReticle();
  }
  else if (state === 1) {
    mainOptions();
    returnToMainMenu();
  }
  else if (state === 2) {
    acknowledgeButton2Works();
    returnToMainMenu();
  }
}

// displays the main menu
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
}

// displays the first button
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

// changes original Button 1 to display when it is being hovered over
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
  if (mouseIsPressed) {
    state = 1;
  }
}

// displays the second button
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

// changes original Button 2 to display when it is being hovered over
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
  if (mouseIsPressed) {
    state = 2;
  }
}

// creates the mouse reticle
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

// Determines whether the mouse is within boundaries of the Buttons, and which button it is over top of
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

function acknowledgeButton2Works() {
  textAlign(CENTER);
  textSize(20);
  text("Work in Progress..... Coming soon..... I hope.", windowWidth / 2, windowHeight / 2);
  returnToMainMenu();
}

// Draws the "Main Menu" button in the top left corner
function returnToMainMenu() {
  fill(0, 0, 255);
  rect(20, 0, 100, 50);
  if (20 <= mouseX && 120 >= mouseX) {
    if (0 <= mouseY && 50 >= mouseY){
      fill(255);
      rect (20, 0, 100, 50);
      if (mouseIsPressed) {
        state = 0;
      }
    }
  }
  textSize(18);
  fill(0);
  text("Main Menu",70,35);
  return state;
}

// Readjusts the location of items on the screen based on the window sizw
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
