// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Ball {
  constructor(x ,y) {
    this.x = x;
    this.y = y;
    this.size = 25;
    this.dx = random (-10, 10);
    this.dy = random (-10, 10);
    this.transparency = 255;
    this.color = color(random(255), random(255), random(255), this.transparency);
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }

  update() {
    // this.transparency -= 5;
    // this.color.setAlpha(this.transparency);
    if (this.x < windowWidth - 25 && this.x > 25) {
      this.x *= -1;
    }
    else if (this.y === 0 + 25 || this.y === windowHeight - 25) {
      this.x *= -1;
    }
    this.x += this.dx;
    this.y += this.dy;



  }
}

let someParticle;
let balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 35; i++) {
    let soManyBalls = new Ball(random(500), random(600));
    balls.push(soManyBalls);

  }
}

function draw() {
  background(0);

  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].display();
  }
}
