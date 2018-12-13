// Stratego
// Charlie Murphy
// Dec. 07, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let playerX;
let playerY;
let ocean;
let backgroundY;
let backgroundConstant;
let backgroundSpeed;
let y1;
let y2;
let lives;
let score;
let bulletArray;


// class Timer {
//   constructor(timeToWait) {
//     this.startTime = millis();
//     this.waitTime = timeToWait;
//   }
//
//   reset(timeToWait) {
//     this.startTime = millis();
//     this.waitTime = timeToWait;
//   }
//
//   isDone() {
//     return millis() >= this.startTime + this.waitTime;
//   }
//
// }

class Bullet {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.body = ellipse(this.x, this. y, 10, 10);
    this.dy = -5;

  }

}

function preload() {
  ocean = loadImage("assets/images.jfif");
}

function setup() {
  createCanvas(700, 700);
  textFont("pacifico");
  playerX = 350;
  playerY = 500;
  backgroundY = 50;
  y1 = 50;
  y2 = -550;
  lives = 3;
  score = 0;
  bulletArray = [];
}

function draw() {
  moveBackground();
  playerPlane();
  interface();


}

function playerPlane() {
  fill(0);
  ellipse(playerX, playerY, 30, 30);

  // Top Border
  if (playerY - 16 > 50) {
  // Go Up
    if (keyIsDown(87)) {
      playerY = playerY - 5;
    }
  }

  // Bottom Border
  if (playerY + 16 < 650) {
  // Go Down
    if (keyIsDown(83)) {
      playerY = playerY + 5;
    }
  }

  // Go Right
  if (keyIsDown(68)) {
    playerX = playerX + 7;
    if (playerX + 15 >= 700) {
      playerX = 25;
    }
  }

  // Go Left
  if (keyIsDown(65)) {
    playerX = playerX - 7;
    if (playerX - 15 <= 0) {
      playerX = 675;
    }
  }
  if (keyIsDown(32)) {
    let bullet = new Bullet(playerX, playerY);
    bulletArray.push(bullet);
    for (let i = bulletArray.length - 1; i = 0; i--) {
      bulletArray[i].y += bulletArray[i].dy;
    }
  }
}

function interface() {
  fill(0);
  rect(0, 0, 700, 50);
  rect(0, 650, 700, 700);
  fill(255, 255, 0);
  textSize(45);
  textAlign(CENTER);
  text("BOOM BOOM", width / 2, 40);
  textSize(28);
  textAlign(LEFT);
  text("LIVES: " + lives, 10, 687);
  text("SCORE: " + score, 10, 40);
}

function moveBackground() {
  // Changes scroll speed based on movement
  if (keyIsDown(87)) {
    backgroundConstant = 5;
  }
  else if (keyIsDown(83)) {
    backgroundConstant = 2;
  }
  else {
    backgroundConstant = 3;
  }
  // Makes background Scroll
  image(ocean,0 , y1, 700, 650);
  image(ocean,0 , y2, 700, 650);
  y1 += backgroundConstant;
  y2 += backgroundConstant;
  if (y1 >= 650) {
    y1 = -600;
  }
  if (y2 >= 650) {
    y2 = -600;
  }
}
