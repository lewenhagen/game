(function() {
    'use strict';

    var placeImage, txt, btn, result, maxRounds, currRound, corrRand, errRand, completed, score, resultText, corrText, progBar, soundBtn, sound;
    //var audio = new Audio();


    maxRounds = questions.length;
    score = 0;
    completed = [];
    sound = true;
    currRound = Math.floor(Math.random() * questions.length);
    corrRand = Math.floor(Math.random() * corrImages.length);
    errRand = Math.floor(Math.random() * errImages.length);
    //corrText = Math.floor(Math.random() * corrTexts.length);
    corrText = "JÄTTEBRA!";

    soundBtn = document.getElementById("sound");
    placeImage = document.getElementById("img");
    result = document.getElementById("right-top");
    resultText = document.getElementById("right-bottom");
    btn = document.getElementById("checkBtn");
    progBar = document.getElementById("progBar");

    function toggleSound() {
        if (sound) {
            soundBtn.innerHTML = "Ljudet är av";
            soundBtn.classList.add("btn-danger");
            soundBtn.classList.remove("btn-success");

            sound = false;
        } else {
            soundBtn.innerHTML = "Ljudet är på";
            soundBtn.classList.add("btn-success");
            soundBtn.classList.remove("btn-danger");
            sound = true;
        }
    }

    function setProgressBar () {
        var total = questions.length;
        var one = (100 / total);
        var old = parseInt(progBar.style.width);
        progBar.style.width = (one+old) + "%";
    }

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
                setProgressBar();
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

        var u1 = new SpeechSynthesisUtterance(newStr);
                u1.lang = 'sv-SE';
                u1.pitch = 1;
                u1.rate = 1;
                //u1.voice = voices[10];
                u1.voiceURI = 'native';
                u1.volume = 1;
                speechSynthesis.speak(u1);

        // audio.src ="../config/sound.php?tl=sv&q=" + newStr;
        // audio.type = "audio/mpeg";
    }

    function init() {
        placeImage.src = questions[currRound].img;
    }


    btn.addEventListener("click", function(event) {
        if (sound) {
            playLetters();
        } else {
            checkAnswer();
        }
    });

    // audio.addEventListener("ended", function() {
    //     checkAnswer();
    // });
    //
    // audio.addEventListener("load", function() {
    //     audio.play();
    // }, true);

    soundBtn.addEventListener("click", function() {
        toggleSound();
    });

    init();
})();
