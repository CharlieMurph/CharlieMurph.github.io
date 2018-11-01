// Checkers
// Charlie Murphy
// Oct. 29, 2018
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let i;
let j;
let second;
let rows = 8;
let cols = 8;
let cellSize;
let array = [];

function setup() {
  createCanvas(windowHeight, windowHeight);
  second = false;
  cellSize = height / rows;
}

function draw() {
  displayArray();
  piecesArray();
}

function displayArray() {
  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      if (second === true){
        fill(0);
      }
      else {
        fill(255);
      }
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
      second = !second;
    }
    second = !second;
  }
}

function piecesArray() {
  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      if (second === true) {
        fill (255, 0, 0);
        ellipse (j,i , 10, 10);
      }
      else {
        second = !second;
      }
    }
    second = !second;
  }
}
