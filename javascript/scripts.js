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

function game() {
    let numberOfCards = setterNumberOfCards();
    let deck = document.getElementsByClassName("card");

    // hiding the undesired cards
    for (let i = numberOfCards; i < 14; i++) {
            deck[i].classList.add("hidden");
    }
}

function flipCard(element) {
    let frontFace = element.querySelector(".front-face");
    let backFace = element.querySelector(".back-face");

    frontFace.classList.remove("front-face");
    frontFace.classList.add("back-face");

    backFace.classList.remove("back-face");
    backFace.classList.add("front-face");

    element.classList.add("active")
}

game();
