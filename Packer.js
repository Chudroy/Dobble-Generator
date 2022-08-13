function DeckCreator() {

  this.matrixSubArr = 0;
  this.symbols = [];
  this.symbolOffsetSize = 60;
  this.symbolW = 100;
  this.broken = false;

  this.createCard = function () {


    background(220);

    let packedCard = this.packCard();
    this.matrixSubArr++;

    return packedCard;
  }

  this.packCard = function () {

    this.fitSymbols();

    return this.symbols
  }

  this.saveCard = function () {
    saveCanvas(dobbleDeckName + this.matrixSubArr.toString(), "jpg");
  }

  this.fitSymbols = function () {

    this.symbols = []

    let fitSymbolsTries = 0;
    let fitSymbolsMaxTries = 500000;

    let cardIdx = 0;

    while (this.symbols.length < n + 1) {

      let currentSymbol = this.createSymbol();

      this.broken = false;

      currentSymbol = this.packSymbols(currentSymbol);

      if (!this.broken) {

        currentSymbol.symbolNum = matrix[this.matrixSubArr][cardIdx]
        this.symbols.push(currentSymbol)

        cardIdx++
      }

      fitSymbolsTries++

      if (fitSymbolsTries > fitSymbolsMaxTries) {
        break;
      }
    }
  }

  this.createSymbol = function () {
    let rX = random(width);
    let rY = random(height);

    let s = {
      symbolNum: 0,
      pos: createVector(rX, rY),
      w: this.symbolW,
      rotation: random(0, 2 * PI),
      overlapping: false, outOfBounds: false,
      vel: createVector(0, 0),
      acc: createVector(0, 0),
      separationForce: createVector(0, 0)
    }
    return s
  }

  this.packSymbols = function (c) {

    let packingTries = 0;
    let maxPackingTries = 1000;

    while (this.symbolIsOutOfBounds(c) || this.symbolsOverlappingDuringPacking(c, this.symbols)) {

      let rX = random(width)
      let rY = random(height)

      c.x = rX;
      c.y = rY;
      c.w = random(this.symbolW - this.symbolOffsetSize, this.symbolW + this.symbolOffsetSize)

      packingTries++

      if (packingTries > maxPackingTries) {
        this.broken = true;
        break
      }
    }
    return c;
  }

  this.symbolsOverlappingDuringPacking = function (currentSymbol, symbolArr) {

    //overlapping for packing function

    for (let j = 0; j < symbolArr.length; j++) {
      let d = dist(currentSymbol.pos.x, currentSymbol.pos.y, symbolArr[j].pos.x, symbolArr[j].pos.y)
      if (d < ((currentSymbol.w / 2 * 1.414) + (symbolArr[j].w / 2 * 1.414))) {
        return true
      }
    }
    return false;
  }

  this.symbolIsOutOfBounds = function (symbol) {

    let d = dist(width / 2, height / 2, symbol.pos.x, symbol.pos.y);
    if (d > (width / 2) - (symbol.w / 2 * 1.414)) {
      return true
    } else {
      return false;
    }
  }
}




