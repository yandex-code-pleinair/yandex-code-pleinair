let angle;
let fib = [0, 1];
let startColor, endColor, trunkColor;

function setup() {
  createCanvas(450, 800);
  background(255);

  angle = PI / 8;

  startColor = color(0, 100, 0);
  endColor = color(34, 139, 34);
  trunkColor = color(139, 69, 19);

  generateFib(10);
  translate(width / 2, height);
  branch(150, 10);
}

function generateFib(n) {
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
}

function branch(len, depth) {
  if (depth == 0) return;

  if (depth == 10) {
    stroke(trunkColor);
    strokeWeight(10);
  } else {
    let t = map(depth, 0, 10, 1, 0);
    let col = lerpColor(startColor, endColor, t);
    stroke(col);
    strokeWeight(map(depth, 0, 10, 1, 5));
  }

  line(0, 0, 0, -len);
  translate(0, -len);

  let newLen = len * 0.7;
  let fibAngle = fib[depth % fib.length] * 0.05;

  push();
  rotate(angle + fibAngle);
  branch(newLen, depth - 1);
  pop();

  push();
  rotate(-angle - fibAngle);
  branch(newLen, depth - 1);
  pop();

  if (depth < 10 && depth > 2) {
    for (let i = 0; i < 5; i++) {
      let needleAngle = random(-PI / 6, PI / 6);
      let needleLen = random(10, 20);
      push();
      rotate(needleAngle);
      stroke(startColor);
      strokeWeight(1);
      line(0, 0, 0, -needleLen);
      pop();
    }
  }
}
