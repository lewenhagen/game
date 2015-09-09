(function() {
    'use strict';

    var placeImage, txt, btn, result, maxRounds, currRound, corrRand, errRand;

    maxRounds = questions.length;
    currRound = 0;
    corrRand = Math.floor(Math.random() * corrImages.length);

    placeImage = document.getElementById("img");
    result = document.getElementById("right");
    btn = document.getElementById("checkBtn");

    function checkAnswer() {
        var checkThis = document.getElementById("focusedInput").value;

        if (checkThis.toUpperCase() === questions[currRound].corr) {
            window.setTimeout(function() {
                result.innerHTML = "bte";
                // nextQuestion();
            }, 4000);
            result.innerHTML = corrImages[corrRand];
        } else {
            result.innerHTML = "NOOOOOOOO";
        }
    }

    function init() {
        var currImg = questions[currRound].img;
        placeImage.src = currImg;
    }


    btn.addEventListener("click", function(event) {
        checkAnswer();
    });

    init();
})();
