let maxBranches = 15;
let frameLimit = 1000;
let flowers = [];

function setup() {
  createCanvas(450, 800);
  background(255);
  let x = width / 2;
  let y = height;
  let angle = -PI / 2;
  let length = 180;
  branch(x, y, angle, length, maxBranches);
}

function draw() {
  if (frameCount > frameLimit) {
    noLoop(); // Stop the animation after 1000 frames
  }
  background(255, 5); // Slight background fade for smooth animation
  for (let flower of flowers) {
    drawAnimatedCampanula(flower);
  }
}

function branch(x, y, angle, length, depth) {
  if (depth === 0 || frameCount > frameLimit) return;

  let x2 = x + cos(angle) * length;
  let y2 = y + sin(angle) * length;

  strokeWeight(map(depth, 0, maxBranches, 1, 10));
  stroke(80, 42, 25);
  let branchColor = lerpColor(color(160, 82, 45), color(34, 139, 34), depth / maxBranches);
  stroke(branchColor);
  line(x, y, x2, y2);

  let newLength = length * random(0.6, 0.8);
  let angleOffset = random(-PI / 4, PI / 4);

  // Recursive branches
  branch(x2, y2, angle + angleOffset, newLength, depth - 1);
  branch(x2, y2, angle - angleOffset, newLength, depth - 1);

  // Store flowers for animation at branch ends
  if (depth < maxBranches / 2) {
    flowers.push({ x: x2, y: y2, size: random(10, 30), angle: random(TWO_PI), speed: random(0.01, 0.05) });
  }
}

function drawAnimatedCampanula(flower) {
  let { x, y, size, angle, speed } = flower;
  flower.angle += speed;

  // Campanula flower colors
  let flowerColor = lerpColor(color(130, 200, 255), color(150, 0, 150), sin(frameCount / 50) * 0.5 + 0.5);
  let stemColor = color(34, 139, 34);

  push();
  translate(x, y);
  rotate(angle);

  // Draw bell-shaped Campanula flower
  fill(flowerColor);
  noStroke();
  beginShape();
  vertex(0, -size / 2);
  bezierVertex(-size / 4, -size / 4, -size / 4, size / 4, 0, size / 2);
  bezierVertex(size / 4, size / 4, size / 4, -size / 4, 0, -size / 2);
  endShape(CLOSE);

  // Draw stem
  stroke(stemColor);
  strokeWeight(2);
  line(0, size / 2, 0, size);

  pop();
}
