// DVD bounce
// Charlie Murphy
// 18/9/18
//

let dvd;
let x, y;
let dx, dy;

function preload() {
  dvd = loadImage("assets/dvd.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2 - dvd.width / 2;
  y = height / 2 - dvd.height / 2;
  dx = random(2, 8)
  dy = random(2, 8)
}

function moveDVD() {
  x += dx
  y += dy
  if (x + dvd.width > width || x < 0) {
    dx = dx * -1
  }
  else if (y + dvd.height > height || y < 0) {
    dy = dy * -1
  }
}

function displayDVD() {
  background(80);
  image(dvd, x, y);
}

function draw() {
  moveDVD();
  displayDVD();

}
