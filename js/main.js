(function() {
    'use strict';

    var placeImage, txt, btn, result, maxRounds, currRound, corrRand, errRand, completed, score, resultText, corrText;
    var audio = new Audio();


    maxRounds = questions.length;
    score = 0;
    completed = [];
    currRound = Math.floor(Math.random() * questions.length);
    corrRand = Math.floor(Math.random() * corrImages.length);
    errRand = Math.floor(Math.random() * errImages.length);
    //corrText = Math.floor(Math.random() * corrTexts.length);
    corrText = "JÄTTEBRA!";

    placeImage = document.getElementById("img");
    result = document.getElementById("right-top");
    resultText = document.getElementById("right-bottom");
    btn = document.getElementById("checkBtn");

    function nextQuestion() {
        corrRand = Math.floor(Math.random() * corrImages.length);
        errRand = Math.floor(Math.random() * errImages.length);
        //corrText = Math.floor(Math.random() * corrTexts.length);

        if (completed.indexOf(currRound) === -1) {
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
                resultText.innerHTML = "";
                input.value = "";
                nextQuestion();
            }, 3000);
            result.innerHTML = corrImages[corrRand];
            //resultText.innerHTML = "<p>" + corrTexts[corrText] + "</p>";
            resultText.innerHTML = "<p>" + corrText + "</p>";
        } else {
            window.setTimeout(function() {
                result.innerHTML = "";
                input.value = "";
                resultText.innerHTML = "";
            }, 3000);
            result.innerHTML = errImages[errRand];
            resultText.innerHTML = "<p>PROVA IGEN!</p>";
        }
        document.getElementById("focusedInput").focus();
    }

    function playLetters() {

        var str = document.getElementById("focusedInput").value.split("");
        var newStr = str.join(", ");

        audio.src ="http://translate.google.com/translate_tts?ie=utf-8&tl=sv&q=" + newStr;
        audio.play();

    }

    function init() {
        placeImage.src = questions[currRound].img;
    }


    btn.addEventListener("click", function(event) {
        playLetters();
    });

    audio.addEventListener("ended", function() {
        checkAnswer();
    });

    init();
})();
