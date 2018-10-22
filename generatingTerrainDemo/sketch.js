// Project Title
// Your Name
// Date

let numberOfRects;
let rectWidth;
let time = 0;
let rects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  numberOfRects = width;
  rectWidth = width / numberOfRects;
  generateRectangles();
}

function draw() {
  background(255);
  fill(0);
  displayRects();
}

function displayRects() {
  for (let i=0; i<rects.length; i++) {
    rect(rects[i].x, rects[i].y, rects[i].width, rects[i].height);
  }
}

function generateRectangles() {
  for (let i=0; i<numberOfRects; i++) {
    let rectHeight = noise(time) * height;
    let someRect = {
      x: i * rectWidth,
      y: height - rectHeight,
      width: rectWidth,
      height: rectHeight,
    };

    rects.push(someRect);
    time += 0.01;
  }
}
