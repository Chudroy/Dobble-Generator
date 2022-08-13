
//have as many images in image folder as the length of matrix, named from the number 1 to n
//run sketch

let dobbleDeckName = "OWTF";   //save files with this name

let n = 7                         //order of plane, must be a prime number
let numOfSymbols = n + 1          //number of symbols per card

//saving parameters
let saveSpeed = 60;               //the lower the number, the faster it saves files. Vary depending on browser saving limits and rules
let FinishedSaving = false;       //the faster the speed, the smaller the images, unless growthFactor is made higher
let saveCount = 0;

//Rate at which card symbols grow. Keep close to 1 to avoid errors.
let growthFactor = 1;

//classes
let matrixGenerator;
let deckCreator;
let packedCard
let grower;
let debugging

//array of number combinations
let matrix;

//array of images
let imageArr = [];

let canvasW = 400;
let canvasH = 400;

function preload() {
  matrixGenerator = new MatrixGenerator();
  matrix = matrixGenerator.createMatrix()
  print(matrix);
  for (let i = 0; i < matrix.length; i++) {
    imageArr[i] = loadImage(`images/${i + 1}.png`)
  }
  print(imageArr);
}

function setup() {


  deckCreator = new DeckCreator();
  debugging = new Debugging();
  grower = new Grower();

  frameRate(30);
  dobbleCanvas = createCanvas(canvasW, canvasH);

  background(220);

  debugging.circularFrame();

  packedCard = deckCreator.createCard();

  grower.receiveCard(packedCard);
  grower.initialCardGrowth();
}

function draw() {

  //IMPORTANT: Save canvas before redrawing background

  if (frameCount % saveSpeed == 0 && saveCount < matrix.length) {
    deckCreator.saveCard();
    packedCard = deckCreator.createCard();
    saveCount++
  }

  background(220);

  grower.receiveCard(packedCard);
  grower.initialCardGrowth();

  debugging.circularFrame();

  grower.update();
  grower.growthTesting();

  drawSymbols(grower.getCardSymbols())

  // if (frameCount > 120) {
  //   noLoop();
  // }

}

function drawSymbols(symbols) {

  for (let i = 0; i < symbols.length; i++) {
    push();
    translate(symbols[i].pos.x, symbols[i].pos.y)
    rotate(symbols[i].rotation)
    noStroke();
    rectMode(CENTER);
    fill(0)
    stroke(0);
    fill(255, 255, 255, 150);
    fill(0);
    noStroke();
    imageMode(CENTER);
    image(imageArr[symbols[i].symbolNum - 1], 0, 0, symbols[i].w, symbols[i].w);
    fill(255, 255, 0);
    // text(round(symbols[i].symbolNum), 0, 0);
    pop();
  }
}

function keyPressed() {
  if (key == ' ') {
    noLoop();
  }
}

