const gameContainer = document.getElementById("game-display");
gameContainer.classList.add("game-container");
const cardsForTheGame = [];
let cardsTurned = 0; // keep track of how many cards have been turned over, can't be more than two
const cardsArray = []; // array to keep track of the state of each card
const cardsTurnedArray = []; // array to keep track of the state of each turned card
const baseURL = "https://deckofcardsapi.com/api/deck/";

const shuffle = "new/shuffle/";
const draw = "draw/?count=8";

const resizeGame = () => {
  document.getElementById("main").style.width = `${
    window.innerHeight * 0.7 - 65
  }px`;
};

async function getDeck() {
  try {
    const theDeck = await axios(`${baseURL}${shuffle}`);
    let deckId = theDeck.data.deck_id;
    let theCards = await axios(`${baseURL}/${deckId}/${draw}`);
    const theDeckOfCards = theCards.data.cards;
    for (e of theDeckOfCards) {
      cardsForTheGame.push(e.images.png);
    }
    for (e of theDeckOfCards) {
      cardsForTheGame.push(e.images.png);
    }
  } catch {
    console.log("error getting deck");
  }
}

function shuffleDeck(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

const createGameLayout = (cards) => {
  document.getElementById("main").style.width = `${
    window.innerHeight * 0.7 - 65
  }px`;
  let theCard = 0;
  for (e of cards) {
    const newCardDiv = document.createElement("div");
    newCardDiv.id = theCard;
    newCardDiv.className = "display-card";
    cardsArray[theCard] = false;
    const cardImage = document.createElement("img");
    cardImage.style.margin = "2px";
    cardImage.src = "back.png";
    newCardDiv.appendChild(cardImage);
    newCardDiv.addEventListener("click", handelCardClick);
    gameContainer.append(newCardDiv);
    theCard++;
  }
  const restartButton = document.getElementById("newGame-button");
  restartButton.addEventListener("click", handelRestartButtonClick);
};

const handelRestartButtonClick = () => {
  cardsForTheGame.length = 0;
  const cardsDisplayed = document.querySelectorAll(".display-card");
  for (e of cardsDisplayed) {
    e.remove();
  }

  playTheGame();
};

const handelCardClick = (event) => {
  const divId = event.target.parentElement.getAttribute("id");
  if (cardsArray[divId] === false) {
    cardsTurned++;
    if (cardsTurned <= 2) {
      const divColor = event.target.classList.value;
      const divImage = cardsForTheGame[divId];
      document.getElementById(divId).style.backgroundColor = divColor;
      const cardImage = document.getElementById(divId).firstChild;
      let cardImageSrc = cardImage.getAttribute("src");
      cardImageSrc = divImage;
      cardImage.setAttribute("src", cardImageSrc);
      cardsArray[divId] = true; // this card is turned
      cardsTurnedArray[cardsTurned] = divId;
      if (cardsTurned === 2) {
        const cardImage1 = document.getElementById(
          cardsTurnedArray[1]
        ).firstChild;
        const cardImageSrc1 = cardImage1.getAttribute("src");
        const cardImage2 = document.getElementById(
          cardsTurnedArray[2]
        ).firstChild;
        const cardImageSrc2 = cardImage2.getAttribute("src");
        if (cardImageSrc1 === cardImageSrc2) {
          cardsTurned = 0;
          let youWin = true;
          for (let card of cardsArray) {
            if (!card) {
              youWin = false;
            }
          }
          if (youWin) {
          }
        } else {
          // wait 1 second
          setTimeout(function () {
            const cardImage1 = document.getElementById(
              cardsTurnedArray[1]
            ).firstChild;
            let cardImageSrc1 = cardImage1.getAttribute("src");
            cardImageSrc1 = divImage;
            cardImage1.setAttribute("src", "back.png");

            const cardImage2 = document.getElementById(
              cardsTurnedArray[2]
            ).firstChild;
            let cardImageSrc2 = cardImage2.getAttribute("src");
            cardImageSrc2 = divImage;
            cardImage2.setAttribute("src", "back.png");
            cardsArray[cardsTurnedArray[1]] = false; // this card is turned
            cardsArray[cardsTurnedArray[2]] = false; // this card is turned
            cardsTurned = 0;
          }, 1000);
        }
      }
    }
  } //   if cardsTurned <= 2
};

async function playTheGame() {
  await getDeck();
  const shuffledCards = shuffleDeck(cardsForTheGame);
  createGameLayout(shuffledCards);
}

playTheGame();
