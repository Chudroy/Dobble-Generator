function Grower() {
  this.symbols = [];

  this.update = function () {
    this.updateForce();
    this.grow();
  }
  this.grow = function () {
    for (let i = 0; i < this.symbols.length; i++) {
      if (!this.symbols[i].outOfBounds && !this.symbols[i].overalapping) {
        this.symbols[i].w += growthFactor
      }
    }
  }

  this.updateForce = function () {
    for (let i = 0; i < this.symbols.length; i++) {
      this.symbols[i].pos.add(this.symbols[i].vel)
      this.symbols[i].vel.add(this.symbols[i].acc);
      this.symbols[i].acc = createVector(0, 0);
    }
  }

  this.applyForce = function (symbol, force) {
    symbol.acc.add(force);
  }

  this.receiveCard = function (packedCard) {
    this.symbols = packedCard
  }

  this.initialCardGrowth = function () {

    for (let i = 0; i < this.symbols.length; i++) {

      let growthTries = 0;
      let growthMaxTries = 50000;

      while (!this.symbolIsOutOfBounds(this.symbols[i]) && !this.symbolsOverlappingDuringGrowth(this.symbols[i], this.symbols, i)) {

        if (this.symbols[i].w > this.symbolW + this.symbolOffsetSize || growthTries > growthMaxTries) {
          print("grown");
          break;
        }

        this.symbols[i].w += growthFactor;
        this.symbols[i].pos.add(this.symbols[i].separationForce);
        growthTries += 1;

        if (this.symbolIsOutOfBounds(this.symbols[i]) || this.symbolsOverlappingDuringGrowth(this.symbols[i], this.symbols, i)) {
        }
      }
    }
  }
  this.symbolsOverlappingDuringGrowth = function (currentSymbol, symbolArr, idx) {

    //Overalapping during growth function

    for (let i = 0; i < symbolArr.length; i++) {
      for (let j = 0; j < symbolArr.length; j++) {
        if (j != idx) {
          let d = dist(currentSymbol.pos.x, currentSymbol.pos.y, symbolArr[j].pos.x, symbolArr[j].pos.y)
          if (d < ((currentSymbol.w / 2 * 1.414) + (symbolArr[j].w / 2 * 1.414))) {

            symbolArr[j].d = d;
            currentSymbol.overlappingSymbol = symbolArr[j]
            return true
          }
        }
      }
    }
    return false
  }

  this.symbolIsOutOfBounds = function (symbol) {

    let d = dist(width / 2, height / 2, symbol.pos.x, symbol.pos.y);
    if (d > (width / 2) - (symbol.w / 2 * 1.414)) {
      return true
    } else {
      return false;
    }
  }

  this.growthTesting = function () {

    //check, move

    //overlapping check
    for (let i = 0; i < this.symbols.length; i++) {

      if (this.symbolsOverlappingDuringGrowth(this.symbols[i], this.symbols, i)) {
        this.symbols[i].overalapping = true;

        let separationVector = p5.Vector.sub(this.symbols[i].pos, this.symbols[i].overlappingSymbol.pos)
        separationVector.normalize()
        separationVector.div(pow(this.symbols[i].overlappingSymbol.d, 2));
        separationVector.normalize()

        this.symbols[i].vel = separationVector

      } else if (this.notTouchingAnySymbols()) {

        this.symbols[i].overalapping = false;
      }

      //out of bounds check
      if (this.symbolIsOutOfBounds(this.symbols[i])) {
        this.symbols[i].outOfBounds = true;
        let centre = createVector(width/2, height/2);
        let centripetalForce = p5.Vector.sub(centre, this.symbols[i].pos)
        centripetalForce.normalize();

        this.symbols[i].vel = centripetalForce;
        // this.symbols[i].vel.mult(-1, -1);
      } else {
        this.symbols[i].outOfBounds = false;
      }
    }
  }

  this.notTouchingAnySymbols = function () {
    for (let i = 0; i < this.symbols.length; i++) {
      for (let j = 0; j < this.symbols.length; j++) {
        if (i != j) {
          let d = dist(this.symbols[i].pos.x, this.symbols[i].pos.y, this.symbols[j].pos.x, this.symbols[j].pos.y)
          if (d < this.symbols[i].w / 2 * 1.414 + this.symbols[j].w / 2 * 1.414) {
            return false;
          }
        }
      }
    }
    return true;
  }

  this.getCardSymbols = function () {
    return this.symbols
  }
}