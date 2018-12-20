// 1942 Shooter Game
// Charlie Murphy
// Dec. 07, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let playerX;
let playerY;
let ocean;
let bullets;
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
let enemyPlane;


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



class Fighter {
  constructor(x) {
    this.x = x;
    this.y = 50;
    this.dy = random(1, 3);
    this.radius = 15;
    this.dead = false;
  }
  display() {
    fill(40, 40, 90);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    image(enemyPlane, this.x - 15, this.y - 20, 30, 40);
  }
  update() {
    this.y += this.dy;
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dy = -5;
    this.radius = 5;
    this.color = color(255, 0, 0, 0);
    this.dead = false;

  }
  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this. y, this.radius * 2, this.radius * 2);
    image(bullets, this.x - 15, this.y - 20, 30, 40);
  }
  update() {
    this.y += this.dy;
  }

}

function preload() {
  ocean = loadImage("assets/images.jfif");
  plane = loadImage("assets/images (1).png");
  bullets = loadImage("assets/Fireball.png");
  enemyPlane = loadImage("assets/fighterJet.png");
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
  enemyArray = [];
  state = 1;
}

function draw() {
  if (state === 1) {
    moveBackground();
    playerPlane();
    hitDetection();
    shoot();
    enemies();
    interface();
  }

}

function playerPlane() {
  noStroke();
  fill(0, 0, 0, 0);
  ellipse(playerX, playerY, 30, 30);
  image(plane, playerX - 20, playerY - 18, 40, 50);


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

function shoot() {
  // Moves/Removes bullets
  for (let i = bulletArray.length - 1; i >= 0; i--) {
    bulletArray[i].update();
    bulletArray[i].display();
    if (bulletArray[i].y < 50 || bulletArray[i].dead) {
      bulletArray.splice(i, 1);
    }

  }
}

function enemies() {
  // Spawns enemies
  spawn = random(1000);
  enemyX = floor(random(50, 650));
  if (spawn < 10) {
    let enemy = new Fighter(enemyX);
    enemyArray.push(enemy);
  }
  // Moves/Removes enemies
  for (let i = enemyArray.length - 1; i >= 0; i--) {
    enemyArray[i].update();
    enemyArray[i].display();
    if (enemyArray[i].y > 650 || enemyArray[i].dead) {
      enemyArray.splice(i, 1);
    }
  }
}

function hitDetection() {
  // Checks for Collison
  for (let i = bulletArray.length - 1; i >= 0; i--) {
    for (let j = enemyArray.length - 1; j >= 0; j--) {
      if (collideCircleCircle(enemyArray[j].x, enemyArray[j].y, enemyArray[j].radius * 2, bulletArray[i].x, bulletArray[i].y, bulletArray[i].radius * 2)) {
        score += 10;
        enemyArray[j].dead = true;
        bulletArray[i].dead = true;
        break;
      }
    }
  }
}
