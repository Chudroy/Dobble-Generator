function MatrixGenerator() {

  this.createMatrix = function() {
    let i, j, k;
    let cards = []              //the deck of cards
    let card = [];              //to start, we build the first card

    for (i = 1; i <= n + 1; i++) {
      card.push(i)
    }
    cards.push(card)

    //then we build the next n number of cards
    for (j = 1; j <= n; j++) {
      card = []
      card.push(1)

      for (k = 1; k <= n; k++) {
        card.push(n * j + (k + 1))
      }
      cards.push(card)
    }

    //finally we build the next n² number of cards
    for (i = 1; i <= n; i++) {
      for (j = 1; j <= n; j++) {
        card = []
        card.push(i + 1)

        for (k = 1; k <= n; k++) {
          card.push(n + 2 + n * (k - 1) + (((i - 1) * (k - 1) + j - 1) % n))
        }
        cards.push(card)
      }
    }

    return cards;
  }
}


