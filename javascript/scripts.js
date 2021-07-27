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

function setWaitTime(gameCards){
    let allCards = document.querySelectorAll(".card");

    if (gameCards.length < allCards.length / 2){
        return 3000;
    }else{
        return 5000;
    }

}

function shuffleCards(gameCards) {
    let cardImg = [];
    let card;

    function classifier() {
        return Math.random() - 0.5;
    }

    for (card in gameCards) {
        cardImg.push(gameCards[card].querySelector(".back-face").children[0].src);
    }

    cardImg.sort(classifier);

    for (card in gameCards) {
        gameCards[card].querySelector(".back-face").children[0].src = cardImg[card];
    }
}

function firstViewTimer(gameCards){
    for (card in gameCards) {
        flipCard(gameCards[card]);
    }

    setTimeout(
        function (){
            for (card in gameCards) {
                flipCard(gameCards[card]);
            }
        },
        setWaitTime(gameCards)
    );
}

function cardActivator(element) {
    if (!(element.classList.contains("correct") || element.classList.contains("active"))) {
        element.classList.add("active");
        flipCard(element);
        addMoves();
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

function addScore() {
    let score = document.getElementById("score").children[1];
    score.innerHTML = document.querySelectorAll(".correct").length / 2;
}

function addMoves() {
    let moves = document.getElementById("moves").children[1];
    moves.innerHTML = Number(moves.innerHTML) + 1;
}

function scoreValidation(activeCards) {
    let firstActiveImgSrc = activeCards[0].querySelector(".front-face").children[0].src;
    let lastActiveImgSrc = activeCards[1].querySelector(".front-face").children[0].src;
    let i = 0;

    if (firstActiveImgSrc === lastActiveImgSrc) {
        for (i; i < activeCards.length; i++) {
            cardDeactivator(activeCards[i]);
            activeCards[i].classList.add("correct");
            addScore();
        }
        endGameChecker();
    } else {
        // wait a second after failing
        // then flip the cards back to the initial position
        setTimeout(
            function () {
                for (i; i < activeCards.length; i++) {
                    cardDeactivator(activeCards[i]);
                    flipCard(activeCards[i]);
                }
            }, 1000
        );
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

    shuffleCards(gameCards);
    firstViewTimer(gameCards);
}

function endGameChecker() {
    let allCards = document.querySelectorAll(".card");
    let hiddenCards = document.querySelectorAll(".hidden");
    let correctCards = document.querySelectorAll(".correct");
    let moves = document.getElementById("moves").children[1];

    if (allCards.length - hiddenCards.length === correctCards.length) {
        alert(`Você ganhou em ${moves.innerHTML} jogadas!`);
        let playAgain = prompt("Digite sim para jogar de novo");
        if (resetGameValidation(playAgain)) {
            window.location.reload();
        }
    }
}

function resetGameValidation(userInput) {
    if (userInput === "sim"){
        return true;
    }else{
        return false;
    }
}

gameStarter();
