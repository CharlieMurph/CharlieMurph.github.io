// Project Title
// Your Name
// Date
let rows;
let cols;
let grid;
let cellSize;
let ellipseArray;

function preload() {
  grid = loadStrings("assets/grid3.txt");
}

function setup() {
  createCanvas(700, 700);
  background(220);
  rows = grid[0].length;
  cols = grid[0].length;
  cellSize = width / cols -1;
  //grid = createRandom2DArray(cols, rows);
  cleanUpTheGrid();
}

function draw() {
  background(255);
  displayGrid();
  displayEllipses();

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
      else if (grid[y][x]=== "1") {
        fill(250, 250, 210);
        ellipse (grid[y] * cellSize, grid[y] * cellSize, cellSize);
      }
      else if (grid[y][x]=== "2") {
        fill(255, 0, 0);
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
  placeEllipseYellow();
}

function placeEllipseYellow() {
  ellipse(mouseX, mouseY, cellSize);
  let yellowEllipse = {
    x: mouseX,
    y: mouseY,
    radius: 30
  };
  ellipseArray.push(yellowEllipse);
}

function displayEllipses() {
  for (let c = 0; c < ellipseArray.length; c++) {
    ellipse (ellipseArray[c].x, ellipseArray[c].y, ellipseArray[c].radius*2, ellipseArray[c].radius*2);
  }
}
