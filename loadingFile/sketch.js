// Project Title
// Your Name
// Date
let rows;
let cols;
let grid;
let cellSize;

function preload() {
  grid = loadStrings("assets/grid1.txt");
}

function setup() {
  createCanvas(600, 600);
  background(220);
  rows = grid[0].length;
  cols = grid[0].length;
  cellSize = width / cols;
  //grid = createRandom2DArray(cols, rows);
  cleanUpTheGrid();
}

function draw() {
  background(255);
  displayGrid();
}

function cleanUpTheGrid() {
  for (let i = 0; i < grid.length; i++) {
    grid[i] = grid[i].split(""); //turns it into a 2D array
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === "0") {
        fill(0);
      }
      else {
        fill(255);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function createRandom2DArray(cols, rows) {
  let randomGrid = [];
  for (let y = 0; y < rows; y++) {
    randomGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        randomGrid[y].push("0");
      }
      else {
        randomGrid[y].push("1");
      }
    }
  }
  return randomGrid;
}


function mousePressed(){
  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);

  if (grid[y][x] === "1") {
    grid[y][x] = "0";
  }
  else if (grid[y][x] === "0") {
    grid[y][x] = "1";
  }
}
