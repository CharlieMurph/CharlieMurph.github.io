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
let explosion;
let fire;
let enemyFireball;
let enemyBulletArray;
let enemySpreadBulletArray;
let playerHit;
let faster;
let slower;
let health = 60;

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
    this.dy = 3;
    this.radius = 15;
    this.dead = false;
  }
  display() {
    fill(40, 40, 90, 0);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    image(enemyPlane, this.x - 17, this.y - 27, 40, 50);
    if (this.dead === true) {
      image(explosion, this.x - 15, this.y - 20, 30, 40);
    }
  }
  update() {
    this.y += this.dy;
  }
  shoot() {
    let enemyBullet = new EnemyBullet(this.x, this.y);
    enemyBulletArray.push(enemyBullet);
  }
  shootSpread() {
    let enemyBullet = new EnemySpreadBullet(this.x, this.y);
    enemySpreadBulletArray.push(enemyBullet);
  }
}

class EnemyBullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dy = 7;
    this.radius = 13;
    this.color = color(255, 0, 0, 0);
    this.dead = false;

  }
  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this. y, this.radius * 2, this.radius * 2);
    image(enemyFireball, this.x - 16, this.y - 20, 30, 40);
  }
  update() {
    this.y += this.dy;
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
class EnemySpreadBullet {
  constructor(x, y) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = x;
    this.y2 = y;
    this.x3 = x;
    this.y3 = y;
    this.dy = 7;
    this.dx = 4;
    this.radius = 13;
    this.color = color(255, 0, 0);
    this.dead = false;

  }
  display() {
    fill(this.color);
    noStroke();
    // Straight Shot
    ellipse(this.x1, this. y1, this.radius * 2, this.radius * 2);
    // Left Shot
    ellipse(this.x2, this. y2, this.radius * 2, this.radius * 2);
    // Right Shot
    ellipse(this.x3, this. y3, this.radius * 2, this.radius * 2);
    // image(enemyFireball, this.x - 16, this.y - 20, 30, 40);
  }
  update() {
    // change coordinates of all 3 bullets
    this.y1 += this.dy;
    this.y2 += this.dy;
    this.x2 -= this.dx;
    this.y3 += this.dy;
    this.x3 += this.dx;
  }
////////////////////////////////////////////////////////////////////////////////////////////////////
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
  explosion = loadImage("assets/explosion.png");
  enemyFireball = loadImage("assets/EnemyFireball.png");
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
  enemyBulletArray = [];
  enemySpreadBulletArray = [];
  state = 1;
  playerHit = false;
  faster = false;
  slower = false;
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
  else if (state === 2){
    deathScene();
  }
}

function playerPlane() {
  if (lives > 0) {
    noStroke();
    fill(0, 0, 0, 0);
    ellipse(playerX, playerY, 30, 30);
    fill(0);
    rect(playerX - 30, playerY + 40, 60, 8);
    fill(0, 255, 0);
    rect(playerX - 30, playerY + 40, health, 8);
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
    // Reduces health bar/resets if dead
    if (playerHit) {
      health = health - 10;
      if (health <= 0) {
        playerX = 350;
        playerY = 500;
        lives = lives - 1;
        health = 60;
        enemyBulletArray = [];
        enemySpreadBulletArray = [];
      }
      playerHit = false;
    }
  }
  else {
    state = 2;
  }
}

// Players ability to shoot
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

/////////////////////////vvvv//////////////////////
function shoot() {
  // Moves/Removes bullets
  for (let i = bulletArray.length - 1; i >= 0; i--) {
    bulletArray[i].update();
    bulletArray[i].display();
    if (bulletArray[i].y < 50 || bulletArray[i].dead) {
      bulletArray.splice(i, 1);
    }
  }
  for (let i = enemyBulletArray.length - 1; i >= 0; i--) {
    enemyBulletArray[i].update();
    enemyBulletArray[i].display();
    if (enemyBulletArray[i].dead) {
      enemyBulletArray.splice(i, 1);
    }
  }
  for (let i = enemySpreadBulletArray.length - 1; i >= 0; i--) {
    enemySpreadBulletArray[i].update();
    enemySpreadBulletArray[i].display();
  }
}
//////////////////////////////////////////////////////////
function enemies() {
  // Spawns enemies
  spawn = random(750);
  enemyX = floor(random(50, 650));
  if (spawn < 10) {
    let enemy = new Fighter(enemyX);
    enemyArray.push(enemy);
  }
  // Moves/Removes enemies
  for (let i = enemyArray.length - 1; i >= 0; i--) {
    // probability of enemy shooting
    fire = random(400);
    if (fire < 4) {
      enemyArray[i].shoot();
    }
    else if (fire < 100) {
      enemyArray[i].shootSpread();
    }
    // Moves fighters faster/slower depending on player movement and background movement
    if (keyIsDown(87)) {
      enemyArray[i].dy = 5;
    }
    else if (keyIsDown(83)) {
      enemyArray[i].dy = 1.5;
    }
    else {
      enemyArray[i].dy = 3;
    }
    //moves and displays enemy fighters
    enemyArray[i].update();
    enemyArray[i].display();
    if (enemyArray[i].dead) {
      enemyArray.splice(i, 1);
    }
    else if (enemyArray[i].y > 650) {
      score -= 10;
      enemyArray.splice(i, 1);
    }
  }
}

function hitDetection() {
  // Checks for Collison between bullet and enemy
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
  // Checks for collision between player and enemy bullet
  for (let m = enemyBulletArray.length - 1; m >= 0; m--) {
    if (collideCircleCircle(playerX, playerY, 60, enemyBulletArray[m].x, enemyBulletArray[m].y, enemyBulletArray[m].radius * 2)) {
      playerHit = true;
      enemyBulletArray[m].dead = true;
      break;
    }
  }
  // Checks for collision between player and enemy "Shotgun" Bullets
  for (let m = enemySpreadBulletArray.length - 1; m >= 0; m--) {
    if (collideCircleCircle(playerX, playerY, 60, enemyBulletArray[m].x1, enemyBulletArray[m].y1, enemyBulletArray[m].radius * 2)) {
      playerHit = true;
      enemySpreadBulletArray[m].dead = true;
      break;
    }
    else if (collideCircleCircle(playerX, playerY, 60, enemyBulletArray[m].x2, enemyBulletArray[m].y2, enemyBulletArray[m].radius * 2)) {
      playerHit = true;
      enemySpreadBulletArray[m].dead = true;
      break;
    }
    else if (collideCircleCircle(playerX, playerY, 60, enemyBulletArray[m].x3, enemyBulletArray[m].y3, enemyBulletArray[m].radius * 2)) {
      playerHit = true;
      enemySpreadBulletArray[m].dead = true;
      break;
    }
  }
}

function deathScene() {
  background(0);
  textAlign(CENTER,CENTER);
  textSize(32);
  fill(255, 0, 0);
  text("Bruh, you died like at least 3 times. Do better.",350,350);
  text("Your score was: " + score, 350, 450);
  if (score < 0) {
    textSize(20);
    text("Somehow you have also managed to do so horrible, \n the code added in negative numbers just for you.", 350, 400);
  }

}
