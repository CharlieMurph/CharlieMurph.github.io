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
let ghosts;
let ghost2;



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
  display(){
    fill(255,0,255);
    ellipse(this.x * cellSize+ cellSize/2, this.y * cellSize + cellSize/2, cellSize - 5);
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
    if(grid[this.y+1][this.x] !== "1" && this.movingUp === false){
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
  ghosts = new Ghost(12, 12);
  ghost2 = new Ghost(20,12);

}

function draw() {
  background(255);
  score();
  handleKeys();
  displayGrid();
  pakmanDetector();
  sideSwitch();
  ghosts.display();
  ghost2.display();
  if(ghostTimer.isDone()){
    ghosts.update();
    ghost2.update();
    ghostTimer.reset(100);
  }
  ghost2.sideSwitch();
  ghosts.sideSwitch();
}

//allows the text file to be used for initial grid
function cleanUpTheGrid() {
  for (let i = 0; i < grid.length; i++) {
    grid[i] = grid[i].split(""); //turns it into a 2D array
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
      else if (grid[y][x] === "3") {
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
  if (movementTimer.isDone()) {
    if ((key === "W" || key === "w") && grid[playerY - 1][playerX] !== "1") {
      playerY--;
      grid[playerY][playerX] = "4";
      grid[playerY + 1][playerX] = "3";
    }
    // Go down
    else if ((key === "S" || key === "s") && grid[playerY + 1][playerX] !== "1") {
      playerY++;
      grid[playerY][playerX] = "4";
      grid[playerY - 1][playerX] = "3";
    }
    // Go Right
    else if ((key === "D" || key === "d") && grid[playerY][playerX + 1] !== "1") {
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
    console.log(key);
    movementTimer.reset(100);
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


function score(){
  let newCoins = coinCounter();
  playerScore = abs(newCoins - coins) * 10;
  textSize(25);
  textAlign(LEFT,TOP);
  fill(0);
  text("score: " + playerScore, 0, 0);
}


function pakmanDetector(){
  for(let y = 0; y < cols; y++){
    for(let x = 0; x< rows; x++){
      // console.log("grid value:" + grid[y][x] + "  y:" + y + "  playerY:" + playerY + "  x:" + x + "  playerX:" + playerX);
      if(grid[y][x] === "4" && (y !== playerY || x !== playerX)){
        grid[y][x] = "3";
        // console.log("inside!");
      }
    }
  }
}
