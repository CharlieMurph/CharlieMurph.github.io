// Interactive Scene
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let mysong;
let smash;
let horizontal, verticle;
let dhorizontal, dverticle;
let death;
let ellipseWidth;
let ellipseArray = [];

// Preloading images/sounds
function preload() {
  mysong = loadSound("assets/allstar.mp3");
  mysong.setVolume(0);
  smash = loadImage("assets/smash.png");
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

//Responsive keys
function keyTyped() {
  if (key === "w") {
    placeEllipse();
  }
  else if (key === "p") {
      mysong.play();
      death = true
  }
  else if (keyCode === 32 ) {
    ellipseArray = [];
  }
}

//Smashmouth image bouncing around screen
function movesmash() {
  horizontal += dhorizontal
  verticle += dverticle
  if (horizontal + smash.width > width || horizontal < 0) {
    dhorizontal = dhorizontal * -1
  }
  else if (verticle + smash.height > height || verticle < 0) {
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
  let thisEllipse = {
    x: mouseX,
    y: mouseY,
    radius: 30
  };
  ellipseArray.push(thisEllipse);
}

function mainOptions() {
  if (death) {
    // for (let i = 0; i > 0, i++)
    displaysmash();
    movesmash();
    textSize(50);
    text("There is no escape", width / 2, height / 2);
  }
  else if (!death) {
    textSize(50);
    text("Please hit W, P or SPACE to clear", width / 2, height / 2);
    keyTyped();
    displayEllipses()
  }
}

function displayEllipses() {
  for (let c = 0; c < ellipseArray.length; c++) {
    ellipse (ellipseArray[c].x, ellipseArray[c].y, ellipseArray[c].radius*2, ellipseArray[c].radius*2);
  }
}


function draw() {
 mainOptions();
}
