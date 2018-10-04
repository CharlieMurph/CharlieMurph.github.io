// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ball;


function setup() {
  createCanvas(400, 400);
  ball = {
    x: 100,
    y: 200,
    radius: 25,
    fillColor: color(255, 0, 0)
  };
}

function draw() {
  background(200);
  fill(ball.fillColor);
  ellipse(ball.x, ball.y, ball.radius * 2, ball.radius * 2);
}

function mousePressed() {
  ball.y = mouseY;
  ball.x = mouseX;
}

function keyTyped() {
  if (key === "w") {
    ball.radius *= 1.1;
  }
  else if (key === "s") {
    ball.radius *= 0.9;
  }
  else if (key === "a") {
    ball.x -= 20;
  }
  else if (key === "d") {
    ball.x += 20;
  }
}
