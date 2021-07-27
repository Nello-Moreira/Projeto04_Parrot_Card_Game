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
    let deck = document.getElementsByClassName("cards");

    // hiding the undesired cards
    for (let i = numberOfCards; i < 14; i++) {
            deck[i].classList.add("hidden");
    }
}

game();