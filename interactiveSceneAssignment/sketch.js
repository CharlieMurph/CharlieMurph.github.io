// Interactive Scene
// Your Name
// Date
//
// Ehorizontaltra for Ehorizontalperts:
// - describe what you did to take this project "above and beyond"

let mysong;
let smash;
let horizontal, verticle;
let dhorizontal, dverticle;
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

//Smashmouth image bouncing around screen
function movesmash() {
  horizontal += dhorizontal
  verticle += dverticle
  if (horizontal + smash.width > width || horizontal < 0) {
    dhorizontal = dhorizontal * -1
  }
  else if (verticle + smash.height > height || y < 0) {
    dverticle = dverticle * -1
  }
}

//Resizes window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//displays smashmouth
function displaysmash() {
  background(random(255), random(255), random(255));
  image(smash, horizontal, verticle);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textAlign(CENTER)
  textSize(50)
  horizontal = width / 2 - smash.width / 2;
  verticle = height / 2 - smash.height / 2;
  dhorizontal = random(2, 8)
  dverticle = random(2, 8)
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
  ellipse(mouseX, mouseY, ellipseWidth);
}

function mainOptions() {
  if (death) {
    displaysmash();
    movesmash();
    text("There is no escape", width / 2, height / 2);
  }
  else {
    text("Please hit W or P", width / 2, height / 2);
    keyTyped();
  }
}

function draw() {
 mainOptions();
}
