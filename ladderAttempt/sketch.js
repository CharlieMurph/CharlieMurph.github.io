// Project Title
// Your Name
// Date
let rows;
let cols;
let grid;
let cellSize;
let color = ["2", "3"];
let counter;

function preload() {
  grid = loadStrings("assets/grid3.txt");
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
  checkWin();
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
  if (counter === true) {
    if (grid[1][x] === "0") {
      grid[1][x] = "2";
      counter = !counter;
    }
  }
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
