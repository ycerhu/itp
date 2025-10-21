function setup() {
  createCanvas(400, 400); 
}

function drawObject(x, y, s) {
  push();
  translate(x, y);
  scale(s);
  fill(0);
  ellipse(50, 80, 64, 64)
  fill(230); 
  ellipse(50, 80, 60, 60);
  fill (100);
  rect(40, 80, 20, 10)
  fill (0);
  rect(44, 32.5, 2.5, 79)
  rect(53, 32.5, 2.5, 79)
  pop();
}

function draw() {
  drawObject(0, 0, 1);
  drawObject(0, 100, 2);
}