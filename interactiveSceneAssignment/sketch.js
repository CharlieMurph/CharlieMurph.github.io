// Interactive Scene
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let mysong;
let smash;
let x, y;
let dx, dy;
let sheet;

function preload() {
  mysong = loadSound("assets/allstar.mp3");
  mysong.setVolume(100);
  smash = loadImage("assets/smash.png");
}

function keyTyped() {
  if (key === "w") {
    sheet == (255);
  }
  else if (key === "b") {
    sheet = (0);
  }
  else if (key === "p") {
    if (mysong.isPlaying()) {
      mysong.pause();
    }
    else {
      mysong.play();
      mysong.loop();
    }
  }
}

function movesmash() {
  x += dx
  y += dy
  if (x + smash.width > width || x < 0) {
    dx = dx * -1
  }
  else if (y + smash.height > height || y < 0) {
    dy = dy * -1
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function displaysmash() {
  // background(sheet);
  image(smash, x, y);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(55);
  x = width / 2 - smash.width / 2;
  y = height / 2 - smash.height / 2;
  dx = random(2, 8)
  dy = random(2, 8)
}

function draw() {
 keyTyped();
 displaysmash();
 movesmash();

}
