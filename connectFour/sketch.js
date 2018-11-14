// Connect Four
// Charlie Murphy
// Nov. 13, 2018
//
// 
let rows;
let cols;
let sound;
let grid;
let cellSize;
let color = ["2", "3"];
let counter;
let red, yellow;

function preload() {
  grid = loadStrings("assets/grid3.txt");
  sound = loadSound("assets/winSoundEffect.mp4");
}

function setup() {
  let counter = true;
  createCanvas(700, 700);
  background(220);
  rows = grid[0].length;
  cols = grid[0].length;
  cellSize = width / cols -1;
  cleanUpTheGrid();
}

function draw() {
  background(255);
  displayGrid();
  playGame();
  displayWin();
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
      //empty spaces
      if (grid[y][x] === "0") {
        stroke(255);
        fill(0);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        fill(255);
        ellipse (x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, cellSize * 0.8);
      }
      //top row
      else if (grid[y][x]=== "1") {
        stroke(0);
        fill(255);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      //yellow pieces
      else if (grid[y][x]=== "2") {
        stroke(255);
        fill(0);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        noStroke();
        fill(255, 255, 0);
        ellipse (x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, cellSize * 0.8);
      }
      //red pieces
      else if (grid[y][x]=== "3") {
        stroke(255);
        fill(0);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        noStroke();
        fill(255, 0, 0);
        ellipse (x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, cellSize * 0.8);
      }
    }
  }
}

//placing pieces, alternating red and yellow each time
function mouseClicked() {
  let x = floor(mouseX / cellSize);
  // Place yellow
  if (counter === true) {
    if (grid[1][x] === "0") {
      grid[1][x] = "2";
      counter = !counter;
    }
  }
  // Place Red
  else {
    if (grid[1][x] === "0") {
      grid[1][x] = "3";
      counter = !counter;
    }
  }
}

//lowers the pieces to next available position
function playGame() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (y < rows - 1) {
        for (let i = 0; i < color.length; i++) {
          if (grid[y][x] === color[i]) {
            if (grid[y + 1][x] === "0") {
              if (y === 0) {
                grid[y][x] = "1";
              }
              else {
                grid[y][x] = "0";
              }
              grid[y + 1][x] = color[i];
            }
          }
        }
      }
    }
  }
  return grid;
}

//Checks if either player wins
function checkWin() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      for (let i = 0; i < color.length; i++) {
        let horizontalFour = 0;
        let verticalFour = 0;
        let diagonalFour1 = 0;
        let diagonalFour2 = 0;
        for (let j = 0; j < 4; j++) {
          // Check horizontal win
          if (grid[y][x + j] === color[i]) {
            horizontalFour++;
            if (horizontalFour === 4) {
              return color[i];
            }
          }
        }
        // Check Vertical win
        for (let j = 0; j < 4; j++) {
          if (y + j < 7) {
            if (grid[y + j][x] === color[i]) {
              verticalFour++;
              if (verticalFour === 4) {
                return color[i];
              }
            }
            // Check diagonally negative (left/up - right/down)
            if (x + j < 7) {
              if (grid[y + j][x + j] === color[i]) {
                diagonalFour1++;
                if (diagonalFour1 === 4) {
                  return color[i];
                }
              }
            }
          }
          //  Check diagonally positive (left/down - right/up)
          if (y + j < 7 && x - j >= 0) {
            if (grid[y + j][x - j] === color[i]) {
              diagonalFour2++;
              if (diagonalFour2 === 4) {
                return color[i];
              }
            }
          }
        }
      }
    }
  }
}

//Displays on screen if a player wins, and who
function displayWin() {
  checkWin();
  textSize(20);
  noStroke();
  // Yellow
  if (checkWin() === "2") {
    background(0);
    stroke(255, 255, 0);
    fill(255);
    text("Congratulations Yellow you have won...  woohoo",150 ,700 / 3);
    sound.play();
  }
  // Red
  else if (checkWin() === "3") {
    background(0);
    stroke(255, 0, 0);
    fill(255);
    text("Congratulations Red you have won... woohoo",150 ,700 / 3);
    sound.play();
  }
}
