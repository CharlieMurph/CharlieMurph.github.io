// Traffic Light Starter Code
// Dan Schellenberg
// Sept 25, 2018

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/

let counter;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width / 2, height / 2 - 65, 50, 50); //top
  ellipse(width / 2, height / 2, 50, 50); //middle
  ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
  if (millis() % 1000 === 0) {
    counter += 1;
    if (counter === 1 || counter === 2) {
      fill(0, 255, 0);
      ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
    }
    else if (counter >= 6) {
      fill(255, 0, 0);
      ellipse(width / 2, height / 2 - 65, 50, 50); //middle
    }
    else if (counter > 2 && counter < 6) {
      fill (255, 255, 0);
      ellipse(width / 2, height / 2, 50, 50); //top
    }
    else {
      counter = 0;
    }
  }
}
