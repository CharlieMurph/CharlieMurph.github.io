// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cols = 53;
let rows = 26;
let arr = [];

function setup() {
  createCanvas (windowWidth, windowHeight);
  background(0);
}

function draw() {
  for (let i = 0; i < cols; i++){
    arr[i] = [];
    for (let j = 0; j < rows; j++){
      let x = i * 30;
      let y = j * 30;
      arr [i][j] = round(random(5));

      if (arr[i][j] === 0) {
        fill(0, 255, 0);
      }
      else if (arr[i][j] === 1) {
        fill(0);
      }
      else if (arr[i][j] === 2) {
        fill(255);
      }
      else if (arr[i][j] === 3) {
        fill(255, 0, 0);
      }
      else if (arr[i][j] === 4) {
        fill(0, 0, 255);
      }
      else if (arr[i][j] === 5) {
        fill(60);
      }
      rect(x, y, 30, 30);
    }
  }
}


// function mouseClicked() {
//   for (let i = 0; i < cols; i++){
//     arr[i] = [];
//     for (let j = 0; j < rows; j++){
//       let x = i * 50;
//       let y = j * 50;
//       arr [i][j] = round(random(2));
//
//       if (arr[i][j] === 0) {
//         fill(0, 255, 0);
//       }
//       else if (arr[i][j] === 1) {
//         fill(0);
//       }
//       else if (arr[i][j] === 2) {
//         fill(255);
//       }
//       rect(x, y, 30, 30);
//     }
//   }
// }
