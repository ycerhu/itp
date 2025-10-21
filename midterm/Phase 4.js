function setup() {
  createCanvas(400, 400);
  noStroke(); 
}


function drawObject(x, y, s) {
  push(); 
  translate(x, y);  
  scale(s);        
  fill(0);
  ellipse(50, 50, 64, 64);
  fill(230);
  ellipse(50, 50, 60, 60);
  fill(100);
  rect(40, 50, 20, 10);
  fill(0);
  rect(44, 3, 2.5, 79);
  rect(53, 3, 2.5, 79);
  pop(); 
}

function draw() {
  let columns = 20; 
  let rows = 20; 
  
  let cellWidth = width / columns;
  let cellHeight = height / rows;

  let s = cellWidth / 85;

  for (let i = 0; i < columns; i++) {           
    for (let j = 0; j < rows; j++) {         
      let x = i * cellWidth; 
      let y = j * cellHeight;

      drawObject(x, y, s);
    }
  }
}
      

  
