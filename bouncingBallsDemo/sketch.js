// Bouncing Balls
// Your Name
// Date

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  for (let i = 0; i < ballArray.length; i++) {
    //move ball
    ballArray[i].x += ballArray[i].dx;
    ballArray[i].y += ballArray[i].dy;
    ballArray[i].dy = ballArray[i].dy + 1;
    // bounce if needed
    if (ballArray[i].x > width - ballArray[i].radius || ballArray[i].x < 0 + ballArray[i].radius) {
      ballArray[i].dx *= -1;
      // ballArray[i].radius += 1;
    }
    if (ballArray[i].y > height - ballArray[i].radius || ballArray[i].y < 0 + ballArray[i].radius) {
      ballArray[i].dy *= -1;
      // ballArray[i].radius += 1;
    }
    if (ballArray[i].y > height - ballArray[i].radius ) {
      ballArray[i].dy *= 0.8;
      // ballArray[i].radius += 1;
    }

    //display ballArray[i]
    fill(random(255), random(255), random(255));
    ellipse(ballArray[i].x, ballArray[i].y, ballArray[i].radius * 2, ballArray[i].radius * 2);
  }
}

function mousePressed() {
  let ball = {
    x: mouseX,
    y: mouseY,
    radius: 25,
    dx: random (-15, 15),
    dy: random (-15, 15),
  };
  ballArray.push(ball);
}
