// Connect Four
// Charlie Murphy
// Nov. 13, 2018
//
//
let rows;
let cols;
let grid;
let cellSize;
let playerX;
let playerY;
let coins = 0;
let playerScore = 0;
let movementTimer;
let lastKeyPressed;
let ghostTimer;
let deathTimer;
let ghosts;
let ghost2;
let trigger = 0;
let lives = 3;
let state = 0;
let resetGrid;
let sound;

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

class Ghost {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.d = dist(this.x, this.y, playerX, playerY);
    this.dd = this.d;
    this.movingRight = false;
    this.movingLeft = false;
    this.movingUp = false;
    this.movingDown = false;
    this.doAgain;
    this.doNotRepeat;

  }
  display(r, g, b){
    fill(r, g, b);
    ellipse(this.x * cellSize + cellSize/2, this.y * cellSize + cellSize/2, cellSize - 5);
  }
  update(){
    this.d = dist(this.x, this.y, playerX, playerY);
    if(this.d > this.dd){
      this.doNotRepeat = this.doAgain;
      this.movingDown = false;
      this.movingUp = false;
      this.movingRight = false;
      this.movingLeft = false;
    }
    if(this.d < this.dd){
      this.doAgain();
    }
    if(grid[this.y+1][this.x] !== "1" && this.movingUp === false && this.doNotRepeat !== this.goDown){
      this.goDown();
      this.doAgain = this.goDown;
    }
    if(grid[this.y-1][this.x] !== "1" && this.movingDown === false && this.doNotRepeat !== this.goUp){
      this.goUp();
      this.doAgain = this.goUp;
    }
    if(grid[this.y][this.x - 1] !== "1" && this.movingRight === false && this.doNotRepeat !== this.goLeft){
      this.goLeft();
      this.doAgain = this.goLeft;
    }
    if(grid[this.y][this.x + 1] !== "1" && this.movingLeft === false && this.doNotRepeat !== this.goRight){
      this.goRight();
      this.doAgain = this.goRight;
    }
    this.dd = this.d;
  }
  goDown(){
    if(grid[this.y+1][this.x] !== "1" && grid[this.y+1][this.x] !== "2" && this.movingUp === false){
      this.y ++;
      this.movingDown = true;
      this.movingUp = false;
      this.movingRight = false;
      this.movingLeft = false;
    }
  }
  goUp(){
    if(grid[this.y-1][this.x] !== "1" && this.movingDown === false){
      this.y --;
      this.movingUp = true;
      this.movingDown = false;
      this.movingRight = false;
      this.movingLeft = false;
    }
  }
  goLeft(){
    if(grid[this.y][this.x - 1] !== "1" && this.movingRight === false){
      this.x --;
      this.movingLeft = true;
      this.movingRight = false;
      this.movingDown = false;
      this.movingUp = false;
    }
  }

  goRight(){
    if(grid[this.y][this.x + 1] !== "1" && this.movingLeft === false){
      this.x ++;
      this.movingRight = true;
      this.movingLeft = false;
      this.movingDown = false;
      this.movingUp = false;
    }
    // if grid[this.y][this.x] === ""
  }

  sideSwitch(){
    if(this.x > cols - 1){
      this.x = 0;
    }
    else if(this.x < 0 ){
      this.x = rows -1 ;
    }
  }
}


function preload() {
  grid = loadStrings("assets/stage1.txt");
  resetGrid = loadStrings("assets/stage1.txt");
  sound = loadSound("assets/pac_bonus.wav");
}

function setup() {
  createCanvas(700, 700);
  background(220);
  rows = grid[0].length;
  cols = grid[0].length;
  cellSize = width / cols -1;
  cleanUpTheGrid();
  playerX = 13;
  playerY = 20;
  coins = coinCounter();
  movementTimer = new Timer(5);
  ghostTimer = new Timer(5);
  deathTimer = new Timer(200);
  ghosts = new Ghost(12, 12);
  ghost2 = new Ghost(14, 12);
  textFont("pacifico");


}

function draw() {
  if (state === 0) {
    background(255);
    handleKeys();
    displayGrid();
    displayText();
    pakmanDetector();
    ghosts.display(255, 0, 0);
    ghost2.display(255, 192, 203);
    sideSwitch();
    ghost2.sideSwitch();
    ghosts.sideSwitch();
    deathCheck();
  }
  else if (state === 1) {
    death();
  }

}

//allows the text file to be used for initial grid
function cleanUpTheGrid() {
  for (let i = 0; i < grid.length; i++) {
    grid[i] = grid[i].split(""); //turns it into a 2D array
    resetGrid[i] = resetGrid[i].split("");
  }
}


function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // barrier
      if (grid[y][x]=== "0") {
        stroke(0);
        fill(0, 0, 255);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        noStroke();
        fill(200, 200, 0, 180);
        ellipse (x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, 10, 10);
      }
      // play space
      else if (grid[y][x] === "1") {
        stroke(255);
        fill(0, 0, 0);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === "2") {
        stroke(255);
        fill(210, 180, 140);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === "3" || grid[y][x] === "5") {
        stroke(0);
        fill(0, 0, 255);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === "4") {
        stroke(0);
        fill(0, 0, 255);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        fill(255,255,0);
        ellipse(x *cellSize + cellSize/2, y * cellSize + cellSize/2, cellSize - 5);
      }

    }
  }
}

function handleKeys() {
  if(ghostTimer.isDone()){
    if (trigger < 3) {
      ghosts.goUp();
      ghost2.goUp();
      trigger ++;
    }
    else {
      ghosts.update();
      ghost2.update();
    }
    ghostTimer.reset(150);
  }

  if (movementTimer.isDone()) {
    sound.play();
    if ((key === "W" || key === "w") && grid[playerY - 1][playerX] !== "1") {
      playerY--;
      grid[playerY][playerX] = "4";
      grid[playerY + 1][playerX] = "3";
    }
    // Go down
    else if ((key === "S" || key === "s") && grid[playerY + 1][playerX] !== "1"  && grid[playerY + 1][playerX] !== "2") {
      playerY++;
      grid[playerY][playerX] = "4";
      grid[playerY - 1][playerX] = "3";
    }
    // Go Right
    else if ((key === "D" || key === "d") && grid[playerY][playerX + 1] !== "1" ) {
      playerX++;
      grid[playerY][playerX] = "4";
      grid[playerY][playerX - 1] = "3";
    }
    // Go Left
    else if ((key === "A" || key === "a") && grid[playerY][playerX - 1] !== "1") {
      playerX--;
      grid[playerY][playerX] = "4";
      grid[playerY][playerX + 1] = "3";
    }
    movementTimer.reset(100);
    if (sound.isPlaying() !== true) {
      sound.play();
    }
  }
}

function sideSwitch(){
  if(playerX > cols - 1){
    playerX = 0;
  }
  else if(playerX < 0 ){
    playerX = rows -1 ;
  }

}

function coinCounter(){
  let counter = 0;
  for(let i = 0; i < rows - 1; i ++){
    for(let j = 0; j < cols - 1; j ++){
      if(grid[i][j] === "0"){
        counter ++;
      }
    }
  }
  return counter;
}


function displayText(){
  let newCoins = coinCounter();
  playerScore = abs(newCoins - coins) * 10;
  textSize(25);
  textAlign(LEFT,TOP);
  fill(30, 255, 30);
  text("score: " + playerScore, 2, 1);
  textAlign(LEFT, BOTTOM);
  text("Lives:  ", 2, height - 25);
  displayLives();
  fill(255, 255, 0);
  textAlign(CENTER, TOP);
  text("Pac - Man", width / 2 - 10, 3);
}


function pakmanDetector(){
  for(let y = 0; y < cols; y++){
    for(let x = 0; x< rows; x++){
      if(grid[y][x] === "4" && (y !== playerY || x !== playerX)){
        grid[y][x] = "3";
      }
    }
  }
}

function deathCheck() {
  if (ghosts.x === playerX && ghosts.y === playerY || ghost2.x === playerX && ghost2.y === playerY) {
    lives--;
    if (deathTimer.isDone()){
      playerX = 13;
      playerY = 20;
      ghosts.x = 12;
      ghosts.y = 11;
      ghost2.x = 14;
      ghost2.y = 11;
      trigger = 0;
      grid[20][13] = "4";
    }
  }
  if (lives === 0) {
    state = 1;
  }
}

function death() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === "3" || grid[y][x] === "4") {
        grid[y][x] = "0";
      }
    }
  }
  background(0);
  fill(255, 0, 0);
  textFont(32);
  textAlign(CENTER);
  text("YOU DIED", width / 2, height  / 2 - 200);
  fill(255);
  textFont(20);
  text("click to restart", width / 2, height  / 2 + 200);
  // resetting the game
  if (mouseIsPressed) {
    key = "r";
    playerX = 13;
    playerY = 20;
    ghosts.x = 12;
    ghosts.y = 11;
    ghost2.x = 14;
    ghost2.y = 11;
    trigger = 0;
    displayGrid();
    state = 0;
    lives = 3;
  }
}

function displayLives() {
  fill (255, 255, 0);
  if (lives >= 1) {
    ellipse(75, height - 38, 15);
  }
  if (lives >= 2) {
    ellipse(100, height - 38, 15);
  }
  if (lives === 3) {
    ellipse(125, height - 38, 15);
  }
}
