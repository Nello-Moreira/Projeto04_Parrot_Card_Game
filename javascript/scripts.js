function getGameImages() {
    return [
        "assets/bobrossparrot.gif",
        "assets/explodyparrot.gif",
        "assets/fiestaparrot.gif",
        "assets/metalparrot.gif",
        "assets/revertitparrot.gif",
        "assets/tripletsparrot.gif",
        "assets/unicornparrot.gif"
    ]
}

function flipCard(element) {
    const frontFace = element.querySelector(".front-face");
    const backFace = element.querySelector(".back-face");

    frontFace.classList.remove("front-face");
    frontFace.classList.add("back-face");

    backFace.classList.remove("back-face");
    backFace.classList.add("front-face");
}

function setterNumberOfCards() {
    let numberOfCards = document.getElementById("numberOfCards").value;

    if (!cardsValidation(numberOfCards)) {
        alert("O número de cartas deve ser um número par entre 4 e 14");
    } else {
        gameStarter(numberOfCards);
    }
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

function assignImageToFace(cardNumber, face, faceClass) {
    const imgList = getGameImages();
    const faceImg = document.createElement("img");

    if (faceClass === "front-face") {
        faceImg.setAttribute("src", "assets/front.png");
    } else {
        // every card in the pair of cards should have the same image
        const imgIndex = Math.floor(cardNumber / 2);
        faceImg.setAttribute("src", imgList[imgIndex]);
    }
    face.appendChild(faceImg);
}

function createFaces(cardToAppendFace, cardNumber) {
    const faceClassList = ["front-face", "back-face"];
    let face = "";

    for (faceClass in faceClassList) {
        face = document.createElement('div');
        face.classList.add(faceClassList[faceClass]);

        assignImageToFace(cardNumber, face, faceClassList[faceClass]);

        cardToAppendFace.appendChild(face);
    }
}

function createCards(numberOfCards) {
    const gameScreen = document.querySelector(".game-screen");

    for (let cardNumber = 0; cardNumber < numberOfCards; cardNumber++) {
        const card = document.createElement('div');
        card.classList.add("card");
        createFaces(card, cardNumber);
        gameScreen.appendChild(card);
    }
}

function setCardsAction() {
    const allCards = document.querySelectorAll(".card");

    for (let i = 0; i < allCards.length; i++) {
        allCards[i].setAttribute("onclick", "cardActivator(this)");
    }
}

function setWaitTime(gameCards) {
    const allCards = document.querySelectorAll(".card");

    if (gameCards.length < allCards.length / 2) {
        return 3000;
    }
    return 5000;
}

function classifier() {
    return Math.random() - 0.5;
}

function shuffleCards(gameCards) {
    const cardImg = [];

    for (let i = 0; i < gameCards.length; i++) {
        cardImg.push(gameCards[i].querySelector(".back-face").children[0].src);
    }

    cardImg.sort(classifier);

    for (let i = 0; i < gameCards.length; i++) {
        gameCards[i].querySelector(".back-face").children[0].src = cardImg[i];
    }
}

function flipAllCards(gameCards) {
    for (let i = 0; i < gameCards.length; i++) {
        flipCard(gameCards[i]);
    }
}

function firstViewTimer(gameCards) {
    flipAllCards(gameCards);
    setTimeout(flipAllCards, setWaitTime(gameCards), gameCards);
}

function cardValidator(element) {
    if (!(element.classList.contains("correct") || element.classList.contains("active"))) {
        return true;
    }
    return false;
}

function cardActivator(element) {
    if (cardValidator(element)) {
        const activeCards = document.querySelectorAll(".active");

        if (activeCards.length < 2) {
            element.classList.add("active");
            flipCard(element);

            if (activeCards.length === 1){
                addMoves();
                scoreValidation([activeCards[0], element]);
            }
        }
    }
}

function cardDeactivator(element) {
    if (element.classList.contains("active")) {
        element.classList.remove("active");
    }
}

function addScore() {
    const score = document.getElementById("score").children[1];
    score.innerHTML = document.querySelectorAll(".correct").length / 2;
}

function addMoves() {
    const moves = document.getElementById("moves").children[1];
    moves.innerHTML = Number(moves.innerHTML) + 1;
}

function scoreValidation(activeCards) {
    const firstActiveImgSrc = activeCards[0].querySelector(".front-face").children[0].src;
    const lastActiveImgSrc = activeCards[1].querySelector(".front-face").children[0].src;

    if (firstActiveImgSrc === lastActiveImgSrc) {
        for (let i = 0; i < activeCards.length; i++) {
            cardDeactivator(activeCards[i]);
            activeCards[i].classList.add("correct");
            addScore();
        }
        endGameChecker();
    } else {
        setTimeout(
            function () {
                for (let i = 0; i < activeCards.length; i++) {
                    cardDeactivator(activeCards[i]);
                    flipCard(activeCards[i]);
                }
            }, 1000
        );
    }
}

function gameStarter(numberOfCards) {
    menuHandler();
    createCards(numberOfCards);

    const gameCards = document.getElementsByClassName("card");
    shuffleCards(gameCards);
    firstViewTimer(gameCards);
    setTimeout(setCardsAction, setWaitTime(gameCards));
    setTimeout(startTimer, setWaitTime(gameCards));
}

function endGameChecker() {
    const allCards = document.querySelectorAll(".card");
    const correctCards = document.querySelectorAll(".correct");

    if (allCards.length === correctCards.length) {
        clearInterval(document.getElementById("timerID").innerHTML);
        const gameTime = document.getElementById("time").children[1].innerHTML;
        const moves = document.getElementById("moves").children[1].innerHTML;
        const message = `Você ganhou em ${moves} jogadas e ${gameTime} segundos!`;
        const finalScoreScreen = document.querySelector(".final-score-screen");
        finalScoreScreen.children[0].innerHTML = message;
        finalScoreScreen.classList.remove("hidden");
    }
}

function resetGameValidation(userInput) {
    if (userInput === "sim") {
        return true;
    } else {
        return false;
    }
}

function addSeconds() {
    const time = document.getElementById("time").children[1];
    time.innerHTML = Number(time.innerHTML) + 1;
}

function startTimer() {
    document.getElementById("timerID").innerHTML = setInterval(addSeconds, 1000);
}

function menuHandler() {
    const menu = document.querySelector(".menu");
    const gameInfos = document.querySelector(".game-infos");
    menu.classList.add("hidden");
    gameInfos.classList.remove("hidden");
}

function resetGame() {
    document.querySelector(".game-infos").classList.add("hidden");
    document.querySelector(".menu").classList.remove("hidden");
    document.querySelector(".final-score-screen").classList.add("hidden");
    document.getElementById("score").children[1].innerHTML = 0;
    document.getElementById("moves").children[1].innerHTML = 0;
    document.getElementById("time").children[1].innerHTML = 0;

    let gameScreen = document.querySelector(".game-screen");
    let allCards = document.querySelectorAll(".card");
    for (let i = allCards.length - 1; i >= 0; i--) {
        gameScreen.removeChild(allCards[i]);
    }
}

function quit() {
    document.querySelector(".final-score-screen").classList.add("hidden");
}
