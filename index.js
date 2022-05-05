let buttonsOption = ["green", "red", "yellow", "blue"];
let buttonsAutomatic = [];
let i, index;
let started = false;

$(document).keypress(function () {
    if (!started) {
        buttonsAutomatic = [];
        i = 0;
        started = true;

        $("h1").html("Level 1");
        
        playButtonAutomatic();
    }

});

$(".btn").click(function() {
    let buttonPressed = $(this).attr("id");
    
    if (buttonPressed !== buttonsAutomatic[i])
        wrongState();
    else {
        playButton(buttonPressed);
        i++;
        
        
        if (i === buttonsAutomatic.length) {
            
            index = i + 1;
            
            setTimeout(function() {$("h1").html("Level " + index);}, 200);
            setTimeout(function() {playButtonAutomatic();}, 1000);
            
            i = 0;
        }
    }  
});


function wrongState() {
    let wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    
    $("h1").html("Game over, press any key to restart.");
    
    $("body").addClass("game-over");
    setTimeout(function () {$("body").removeClass("game-over");}, 200);
    
    i = -1; 
    started = false;
    
}

function playButtonAutomatic() {
    let randomButton = buttonsOption[Math.floor(Math.random() * 4)];

    buttonsAutomatic.push(randomButton);
    
    playListOfButtons(buttonsAutomatic);
}

function playListOfButtons(listOfButtons) {
    for (let i = 0; i < listOfButtons.length; i++)
        setTimeout(function() {playButton(listOfButtons[i]);}, 700 * i);    
}

function playButton(idButton) {
    $("#" + idButton).addClass("pressed");
    $("#" + idButton).fadeIn(100).fadeOut(100).fadeIn(100);
    
    let audioButton = new Audio("sounds/" + idButton + ".mp3");
    audioButton.play();
    
    setTimeout(function() {$("#" + idButton).removeClass("pressed");}, 100);
}