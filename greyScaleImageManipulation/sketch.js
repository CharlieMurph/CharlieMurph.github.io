// image manipulation demo
// Your Name
// Oct. 9
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cat;
let graycat;

function preload() {
  cat = loadImage("assets/cat.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  image(cat, 0, 0);
  graycat = makeGrayscale(cat);
  image(graycat, 0, 0);
}

function draw() {

}

function makeGrayscale(sourceImage) {
  let img = createImage(sourceImage.width, sourceImage.height);

  img.loadPixels();
  sourceImage.loadPixels();

  for (let x = 0; x < sourceImage.width; x++) {
    for (let y = 0; y < sourceImage.height; y++) {
      let p = sourceImage.get(x, y);

      let r = red(p);
      let g = green(p);
      let b = blue(p);

      let newPixel = color((r+g+b)/3, (r+g+b)/3, (r+g+b)/3);

      img.set(x, y, newPixel);
    }
  }

  img.updatePixels();
  return img;
}
