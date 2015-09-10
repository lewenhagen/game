(function() {
    'use strict';

    var placeImage, txt, btn, result, maxRounds, currRound, corrRand, errRand, completed, score;

    maxRounds = questions.length;
    score = 0;
    completed = [];
    currRound = Math.floor(Math.random() * questions.length);
    corrRand = Math.floor(Math.random() * corrImages.length);
    errRand = Math.floor(Math.random() * errImages.length);

    placeImage = document.getElementById("img");
    result = document.getElementById("right");
    btn = document.getElementById("checkBtn");

    function nextQuestion() {
        if (completed.indexOf(currRound) === -1) {
            document.getElementById("focusedInput").focus();
            placeImage.src = questions[currRound].img;
        } else if (completed.length === questions.length) {
            document.getElementById("left").innerHTML = "POÄNG: " + score;
            result.innerHTML = "ALLA KLARA!";
        } else {
            currRound = Math.floor(Math.random() * questions.length);
            nextQuestion();
        }
    }

    function checkAnswer() {
        var input = document.getElementById("focusedInput");
        var checkThis = input.value;

        if (checkThis.toUpperCase() === questions[currRound].corr) {
            window.setTimeout(function() {
                completed.push(currRound);
                score++;
                result.innerHTML = "";
                input.value = "";
                nextQuestion();
            }, 4000);
            result.innerHTML = corrImages[corrRand];
        } else {
            window.setTimeout(function() {
                result.innerHTML = "";
                input.value = "";
            }, 3000);
            result.innerHTML = errImages[errRand];
        }
    }

    function init() {
        placeImage.src = questions[currRound].img;
    }


    btn.addEventListener("click", function(event) {
        checkAnswer();
    });

    init();
})();
