let angle;
let fib = [0, 1];
let startColor, endColor, trunkColor;
let windOffset = 0;
let frameCountLimit = 1000;
let currentFrame = 0;

function setup() {
  createCanvas(450, 800, WEBGL);
  smooth();
  frameRate(30);
  angle = PI / 4;
  startColor = color(0, 100, 0);
  endColor = color(34, 139, 34);
  trunkColor = color(139, 69, 19);
  generateFib(10);
}

function draw() {
  if (currentFrame < frameCountLimit) {
    background(255, 250, 240);
    rotateX(PI / 6);
    rotateY(frameCount * 0.01);
    translate(0, height / 4, 0);
    let windAngle = noise(windOffset) * PI / 16 - PI / 32;
    windOffset += 0.01;
    branch(150, 10, windAngle);
    currentFrame++;
  } else {
    noLoop();
  }
}

function generateFib(n) {
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
}

function branch(len, depth, windAngle) {
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

  let xOffset = map(depth, 0, 10, -3, 3);
  line(xOffset, 0, 0, xOffset, -len, 0);
  translate(xOffset, -len, 0);
  let newLen = len * 0.7;
  let dynamicAngle = angle + windAngle; 
  let fibAngle = fib[depth % fib.length] * 0.05; 

  if (!isNaN(dynamicAngle) && !isNaN(fibAngle)) {
    push();
    rotateY(dynamicAngle + fibAngle);
    rotateZ(-PI / 8);
    branch(newLen, depth - 1, windAngle);
    pop();

    push();
    rotateY(-dynamicAngle - fibAngle);
    rotateZ(PI / 8);
    branch(newLen, depth - 1, windAngle);
    pop();
  }

  if (depth < 10 && depth > 2) {
    for (let i = 0; i < 15; i++) {
      let needleAngle = random(-PI / 6, PI / 6);
      let needleLen = random(10, 30);
      push();
      rotateZ(needleAngle);
      stroke(startColor);
      strokeWeight(1);
      line(0, 0, 0, 0, -needleLen, 0);
      pop();
    }
  }
}
