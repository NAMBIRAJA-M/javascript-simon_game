var gamepattern=[];
var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];

var started=false;
var level=0;
$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;

  }
});




$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
//    console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});


function nextsequence() {

  userClickedPattern = [];
  $("#level-title").text("level "+level);
     level++;


  var randomNumber=Math.random();
  randomNumber=randomNumber*4;
  randomNumber=Math.floor(randomNumber);
//    console.log(randomNumber);
  var randomChosenColour=buttonColours[randomNumber];
  gamepattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

       playSound(randomChosenColour);


}
function playSound(music){
  var audio = new Audio("sounds/" + music + ".mp3");
  audio.play();

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
        setTimeout(function(){
         $("#" + currentColor).removeClass("pressed");
   },200);
  }


  function checkAnswer(currentlevel){
    if(gamepattern[currentlevel] === userClickedPattern[currentlevel])
    {
      console.log("succes");

      if (userClickedPattern.length === gamepattern.length){
        setTimeout(function () {
          nextsequence();
        }, 1000);
}

    }
    else{
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over ");
      setTimeout(function(){
          $("body").removeClass("game-over ");
      },300);
      $("#level-title").text("Game Over, Press Any Key to Restart ")  ;
      startOver();
    }

  };
  function startOver(){
    level=0;
    started=false;
    gamepattern=[];

  }
