var scores, roundScore, activePlayer, dice, game;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (game) {
        //The random value of dice ↓
        var randomNumber = Math.floor(Math.random() * 6) + 1;

        //Show dice box
        document.getElementById("diceBox").style.display = "block";

        if (randomNumber !== 1) {
            //add score
            roundScore += randomNumber;
            document.querySelector("#current-" + activePlayer).textContent =
                roundScore;
        } else {
            //next player
            nextPlayer();
        }

        //afficher la valeur en image!
        const dots = [
            "oneDot",
            "twoDot",
            "threeDot",
            "fourDot",
            "fiveDot",
            "sixDot",
        ];

        for (let i = 0; i < dots.length; i++) {
            const dot = dots[i];
            document.getElementById(dot).style.display = i + 1 === randomNumber ? "grid" : "none";
        }
    }
});
document.querySelector(".btn-hold").addEventListener("click", function () {
    if (game) {
        scores[activePlayer] += roundScore;
        document.querySelector("#score-" + activePlayer).textContent =
            scores[activePlayer];

        var winningScore = document.querySelector(".final__score").value || 100;

        if (scores[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent =
                "Winner!";
            document.getElementById("diceBox").style.display = "none";
            document
                .querySelector(".player-" + activePlayer + "-details")
                .classList.add("winner");
            document
                .querySelector(".player-" + activePlayer + "-details")
                .classList.remove("active");
            game = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //next player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-details").classList.toggle("active");
    document.querySelector(".player-1-details").classList.toggle("active");


    document.getElementById("diceBox").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    game = true;

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";
    document.querySelector(".player-0-details").classList.remove("winner");
    document.querySelector(".player-1-details").classList.remove("winner");
    document.querySelector(".player-0-details").classList.remove("active");
    document.querySelector(".player-1-details").classList.remove("active");
    document.querySelector(".player-0-details").classList.add("active");
    document.getElementById("diceBox").style.display = "none";
}

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '<em>';
//var x = document.querySelector('#score-0').textContent;
