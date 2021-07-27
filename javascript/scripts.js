function flipCard(element) {
    let frontFace = element.querySelector(".front-face");
    let backFace = element.querySelector(".back-face");

    frontFace.classList.remove("front-face");
    frontFace.classList.add("back-face");

    backFace.classList.remove("back-face");
    backFace.classList.add("front-face");
}

function setterNumberOfCards() {
    let numberOfCards = prompt("Insira o número de cartas (pares entre 4 e 14)");

    while (!cardsValidation(numberOfCards)) {
        numberOfCards = prompt("Insira o número de cartas (pares entre 4 e 14)");
    }

    return Number(numberOfCards);
}

function cardsValidation(numberOfCards) {
    try {
        numberOfCards = Number(numberOfCards);

        if (numberOfCards > 14 || numberOfCards < 4 || numberOfCards % 2 !== 0) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
}

function cardActivator(element) {
    if (!(element.classList.contains("correct") || element.classList.contains("active"))) {
        element.classList.add("active");
        flipCard(element);
        activeChecker(element);
    }
}

function cardDeactivator(element) {
    if (element.classList.contains("active")) {
        element.classList.remove("active");
    }
}

function activeChecker(element) {
    let activeCards = document.querySelectorAll(".active");

    if (activeCards.length === 2) {
        scoreValidation(activeCards);
    }
}

function gameStarter() {
    let numberOfCards = setterNumberOfCards();
    let deck = document.getElementsByClassName("card");
    let gameCards = [];
    let i = 0;

    // hiding the undesired cards
    for (let i = numberOfCards; i < 14; i++) {
        deck[i].classList.add("hidden");
    }

    // getting the game cards
    for (i = 0; i < deck.length; i++) {
        if (!(deck[i].classList.contains("hidden"))) {
            gameCards.push(deck[i]);
        }
    }

}

gameStarter();
