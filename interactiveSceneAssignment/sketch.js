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
// let shake = false;
let death;
let ellipseWidth;

// Preloading images/sounds
function preload() {
  mysong = loadSound("assets/allstar.mp3");
  mysong.setVolume(80);
  smash = loadImage("assets/smash.png");
}

//Responsive keys
function keyTyped() {
  if (key === "w") {
    placeEllipse();

  }
  else if (key === "p") {
      mysong.play();
      death = true
  }
}

// function deviceShaken() {
//   return shake
// }

//Smashmouth image bouncing around screen
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

//Resizes window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//displays smashmouth
function displaysmash() {
  background(random(255), random(255), random(255));
  image(smash, x, y);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textAlign(CENTER)
  textSize(50)
  x = width / 2 - smash.width / 2;
  y = height / 2 - smash.height / 2;
  dx = random(2, 8)
  dy = random(2, 8)
  ellipseWidth = 20;
  death = false;

}

function mouseWheel(event) {
  if (event.deltaY < 0) {
    ellipseWidth += 10;
  }
  else if (event.deltaY > 0) {
    ellipseWidth -= 10;
  }
  console.log(event)
}

function placeEllipse() {
  // mouseWheel();
  ellipse(mouseX, mouseY, ellipseWidth);
}

function draw() {
 if (death) {
   displaysmash();
   movesmash();
   text("There is no escape", width / 2, height / 2);
 }
 else {
   text("Please hit W or P", width / 2, height / 2);
 }
// keyTyped();
}
