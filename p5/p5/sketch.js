// 1942 Shooter Game
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
let enemyArray;
let enemyX;
let state;
let spawn;
let numberOfEnemies;


class Fighter {
  constructor(x) {
    this.x = x;
    this.y = 200;
    this.radius = 15;
  }
  display() {
    fill(40, 40, 90);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dy = -5;
    this.radius = 5;
    this.color = color(255, 0, 0);

  }
  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this. y, this.radius * 2, this.radius * 2);
  }
  update() {
    this.y += this.dy;
  }

}

function setup() {
  createCanvas(700, 700);
  textFont("pacifico");
  playerX = 350;
  playerY = 500;
  backgroundY = 50;
  lives = 3;
  score = 0;
  bulletArray = [];
  enemyArray = [];
  state = 1;
  enemyX = 350;
  let enemy = new Fighter(enemyX);
  enemyArray.push(enemy);
}

function draw() {
  if (state === 1) {
    background(155);
    playerPlane();
    shoot();
    hitDetection();
    interface();
  }

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
    playerX = playerX + 5;
    if (playerX + 15 >= 700) {
      playerX = 25;
    }
  }

  // Go Left
  if (keyIsDown(65)) {
    playerX = playerX - 5;
    if (playerX - 15 <= 0) {
      playerX = 675;
    }
  }
}

function keyTyped() {
  if (state === 1) {
    if (key === " ") {
      let bullet = new Bullet(playerX, playerY);
      bulletArray.push(bullet);
    }
  }
}


function interface() {
  // top and bottom borders
  fill(0);
  rect(0, 0, 700, 50);
  rect(0, 650, 700, 700);
  fill(255, 255, 0);
  textSize(45);
  textAlign(CENTER);
  // on-screen text
  text("BOOM BOOM", width / 2, 40);
  textSize(28);
  textAlign(LEFT);
  text("LIVES: " + lives, 10, 687);
  text("SCORE: " + score, 10, 40);
}

function shoot() {
  // Bullets
  for (let i = bulletArray.length - 1; i >= 0; i--) {
    bulletArray[i].update();
    bulletArray[i].display();
  }
  for (let i = enemyArray.length - 1; i >= 0; i--) {
    enemyArray[i].display();
  }
}

function hitDetection() {
  for (let i = bulletArray.length - 1; i >= 0; i--) {
    if (collideCircleCircle(enemyArray[0].x, enemyArray[0].y, enemyArray[0].radius * 2, bulletArray[i].x, bulletArray[i].y, bulletArray[i].radius * 2)) {
      score += 10;
      bulletArray.splice(i, 1);
    }
    console.log(i, score);
    console.log(bulletArray, enemyArray);
  }
}
