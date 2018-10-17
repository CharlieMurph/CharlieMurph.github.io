// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let counter = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

}

function draw() {
  let s = second();
  background(210);

  //face of clock
  translate(200, 200);
  strokeWeight(3);
  fill(255);
  ellipse(0, 0, 400, 400);
  stroke(1);
  fill(0);
  ellipse(0, 0, 10, 10);

  //Dashes of clock
  for (let i = 0; i < 60; i++) {
    rotate(360 / 60);
    if (counter === 4) {
      strokeWeight(5);
      line(140, 0, 175, 0);
      counter = 0;
    }
    else {
      strokeWeight(1);
      line(155, 0, 175, 0);
      counter++;
    }
  }


  //Second hand
  rotate(-90);
  strokeWeight(1);
  line(0, 0, 175, 0);


}
