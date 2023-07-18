// alert("hello");
// alert($("h1"));

buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var started = false;
var randomChosenColour = 0 

function nextSequence() {
   var randomNumber = Math.round(Math.random() * 3);
   gamePattern.push(buttonColours[randomNumber])
   console.log(gamePattern);
   level++;
   $("#level-title").text("level "+level);
   userClickedPattern = [];
   animatePress(gamePattern[gamePattern.length-1]);
   playSound(gamePattern[gamePattern.length-1]);
   return randomNumber;
}



$(".btn").on("click",function(){

    if (started === false){
        var randomChosenColour = nextSequence();
        // console.log(randomChosenColour);
        started = true;
        $("#caption").text("");
    }

    var userChosenColour = $(this).attr("id");
    handler(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function handler(userChosenColour) {
    if (level === 1){
        gamePattern[0] = userChosenColour;
    }
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    // console.log(gamePattern);
}


function playSound(name){
    var audio = new Audio("sounds/"+`${name}.mp3`);     // Sound
    audio.play();
}

function animatePress(colour){
    $("#"+`${colour}`).addClass('pressed');
    setTimeout(function(){
        $("#"+`${colour}`).removeClass('pressed');
    }, 100);
}


function checkAnswer(currentLevel){

    // console.log(userClickedPattern[currentLevel]);
    // console.log(gamePattern[currentLevel]);
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        
        console.log("success");
        
    if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);

          }

    } else {
        console.log("wrong");
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart!");        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver (){
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    started = false;
    $("#caption").text("Uh-Oh, Try again :( \n\nFollow along the pattern.");

}