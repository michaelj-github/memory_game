const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let cardsTurned = 0; // keep track of how many cards have been turned over, can't be more than two
const cardsArray = []; // array to keep track of the state of each card
const cardsTurnedArray = []; // array to keep track of the state of each turned card

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
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

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let theCard = 0;
  for (let color of colorArray) {
    theCard++;
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.id = theCard;
    cardsArray[theCard - 1] = false;
    // newDiv.classList.add(theCard);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  const divId = event.target.getAttribute('id');
  if (cardsArray[divId - 1] == false) {
    cardsTurned++
    if (cardsTurned <= 2) {
      const divColor = event.target.classList.value;
      // console.log(divColor, event.target, divId);
      document.getElementById(divId).style.backgroundColor = divColor;
      cardsArray[divId - 1] = true; // this card is turned
      cardsTurnedArray[cardsTurned] = divId;
      if (cardsTurned === 2 && document.getElementById(cardsTurnedArray[1]).style.backgroundColor == document.getElementById(cardsTurnedArray[2]).style.backgroundColor) {
        // console.log("match");
        cardsTurned = 0;
        let youWin = true;
        for (let card of cardsArray) {
          if (!card) {
            youWin = false;
            // console.log(youWin, card, cardsArray)
          }
        }
        if (youWin) {
          console.log("You win!!!");
        }
      }
      else if (cardsTurned === 2 ) {
            // wait 1 second
            setTimeout(function(){
              document.getElementById(cardsTurnedArray[1]).style.backgroundColor = "white";
              document.getElementById(cardsTurnedArray[2]).style.backgroundColor = "white";
              cardsArray[cardsTurnedArray[1] - 1] = false; // this card is turned
              cardsArray[cardsTurnedArray[2] - 1] = false; // this card is turned
              cardsTurned = 0;
            }, 1000)
      }
    }
  } //   if cardsTurned <= 2
}

// when the DOM loads
createDivsForColors(shuffledColors);