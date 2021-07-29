function getGameImages(){
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

function createCards(numberOfCards) {
    const gameScreen = document.querySelector(".game-screen");
    const faceClassList = ["front-face", "back-face"];
    const imgList = getGameImages();

    for (let i = 0; i < numberOfCards; i++) {
        const card = document.createElement('div');
        card.classList.add("card");
        card.setAttribute("onclick", "cardActivator(this)");

        for (faceClass in faceClassList) {
            const face = document.createElement('div');
            face.classList.add(faceClassList[faceClass]);

            const faceImg = document.createElement("img");

            if (faceClassList[faceClass] === "front-face"){
                faceImg.setAttribute("src", "assets/front.png");
            }else{
                // every card in the pair of cards should have the same image
                const imgIndex = Math.floor(i/2);
                faceImg.setAttribute("src", imgList[imgIndex]);
            }
            
            face.appendChild(faceImg);
            card.appendChild(face);
            gameScreen.appendChild(card);
        } 
    }
}

function setWaitTime(gameCards) {
    const allCards = document.querySelectorAll(".card");

    if (gameCards.length < allCards.length / 2) {
        return 3000;
    } else {
        return 5000;
    }

}

function shuffleCards(gameCards) {
    const cardImg = [];

    function classifier() {
        return Math.random() - 0.5;
    }

    for (let i = 0; i < gameCards.length; i++) {
        cardImg.push(gameCards[i].querySelector(".back-face").children[0].src);
    }

    cardImg.sort(classifier);

    for (let i = 0; i < gameCards.length; i++) {
        gameCards[i].querySelector(".back-face").children[0].src = cardImg[i];
    }
}

function firstViewTimer(gameCards) {
    function flipAllCards() {
        for (let i = 0; i < gameCards.length; i++) {
            flipCard(gameCards[i]);
        }
    }
    flipAllCards();
    setTimeout(flipAllCards, setWaitTime(gameCards));
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
    const activeCards = document.querySelectorAll(".active");

    if (activeCards.length === 2) {
        scoreValidation(activeCards);
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
        // wait a second after failing
        // then flip the cards back to the initial position
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

function gameStarter() {
    const numberOfCards = setterNumberOfCards();
    createCards(numberOfCards);
    
    const gameCards = document.getElementsByClassName("card");
    shuffleCards(gameCards);
    // Let the player see the cards for the first time
    firstViewTimer(gameCards);
    setTimeout(startTimer, setWaitTime(gameCards));
}

function endGameChecker() {
    const allCards = document.querySelectorAll(".card");
    const correctCards = document.querySelectorAll(".correct");
    const moves = document.getElementById("moves").children[1];

    if (allCards.length === correctCards.length) {
        // stop timer
        clearInterval(document.getElementById("timerID").innerHTML);
        let gameTime = document.getElementById("time").children[1].innerHTML;

        // Final score message
        alert(`Você ganhou em ${moves.innerHTML} jogadas e ${gameTime} segundos!`);

        let playAgain = prompt("Digite sim para jogar de novo");
        if (resetGameValidation(playAgain)) {
            window.location.reload();
        }
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

gameStarter();
