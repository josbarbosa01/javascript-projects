const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,

  emojis: [
    "boss",
    "cold",
    "hearteyes",
    "hot",
    "mindblow",
    "money",
    "nap",
    "shock",
    "stareyes",
    "tongueout",
  ],

  cards: null,

  setCard: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0];
    console.log(card.flipped);
    console.log(this.firstCard);
    if (card.flipped || this.lockMode) {
      return false;
    }
    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards: function () {
    this.lockMode = false;
    this.firstCard = null;
    this.secondCard = null;
  },

  unflipCards: function () {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver: function () {
    return this.cards.filter((card) => !card.flipped).length == 0;
  },

  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex],
      ];
    }
  },

  createCardsFromEmojis: function () {
    this.cards = [];
    /* console.log(this.emojis); */
    this.emojis.forEach((emoji) => {
      this.cards.push(this.createCardPair(emoji));
    });
    this.cards = this.cards.flatMap((pair) => pair);
    this.shuffleCards();
    return this.cards;
  },

  createCardPair: function (emoji) {
    return [
      {
        id: this.createIdWithEmoji(emoji),
        icon: emoji,
        flipped: false,
      },
      {
        id: this.createIdWithEmoji(emoji),
        icon: emoji,
        flipped: false,
      },
    ];
  },

  createIdWithEmoji: function (emoji) {
    return emoji + parseInt(Math.random() * 1000);
  },
};

/* startGame();

function startGame() {
  cards = createCardFromEmojis(emojis);
  shuffleCards(cards);
  initializeCards(cards);
}

function initializeCards(cards) {
  let gameBoard = document.getElementById("gameBoard");
  cards.forEach((card) => {
    let cardElement = document.createElement("div");
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;

    createCardContent(card, cardElement);

    cardElement.addEventListener("click", flipcard);
    gameBoard.appendChild(cardElement);
  });
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement("div");
  cardElementFace.classList.add(face);

  if (face === FRONT) {
    let iconElement = document.createElement("img");
    iconElement.classList.add(ICON);
    iconElement.src = "assets/images/" + card.icon + ".png";
    cardElementFace.appendChild(iconElement);
  } else {
    cardElementFace.innerHTML = "?";
  }
  element.appendChild(cardElementFace);
}

function flipcard() {
  this.classList.add("flip");
}
 */
