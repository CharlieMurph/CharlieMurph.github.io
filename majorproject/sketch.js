// Stratego
// Charlie Murphy
// Dec. 07, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let playerX;
let playerY;
let ocean;

class Timer {
  constructor(timeToWait) {
    this.startTime = millis();
    this.waitTime = timeToWait;
  }

  reset(timeToWait) {
    this.startTime = millis();
    this.waitTime = timeToWait;
  }

  isDone() {
    return millis() >= this.startTime + this.waitTime;
  }

}

function preload() {
  let grid = loadStrings("assets/map.txt");
  ocean = loadImage("assets/images.jfif");
}

function setup() {
  createCanvas(700, 700);
  textFont("pacifico");
  playerX = 350;
  playerY = 500;
}

function draw() {
  background(0);
  image(ocean,0, 50, 700, 600);
  playerPlane();


}

function playerPlane() {
  fill(0);
  ellipse(playerX, playerY, 30, 30);
  // Go Up
  if (keyIsDown(87)) {
    playerY = playerY - 5;
  }
  // Go Down
  if (keyIsDown(83)) {
    playerY = playerY + 6;
  }
  // Go Right
  if (keyIsDown(68)) {
    playerX = playerX + 7;
  }
  // Go Left
  if (keyIsDown(65)) {
    playerX = playerX - 7;
  }
}
