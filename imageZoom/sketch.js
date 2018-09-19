// Messing with images
// Your Name
// 19 Sept 18
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let fish;
let scalar;

function preload(){
  fish = loadImage("assets/giant_squid.jpg")
}

function mouseWheel(event){
  if (event.delta > 0 && scalar < 2.5) {
    scalar *=1.1
  }
  else if (event.delta < 0 && scalar > 0.2) {
    scalar *= 0.9
  }
  console.log(event)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  scalar = 0.5
}

function draw() {
  background(55);
  image(fish, mouseX, mouseY, fish.width * scalar, fish.height * scalar);

}
