var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

$(document).keypress(function() {
  if(!started)
  {
    nextSequence();
    started = true;
  }
});

$(".restart").click(function() {
  if(!started)
  {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

    }
);


function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() { $("." + currentColour).removeClass("pressed"); }, 100);
}

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function() { nextSequence(); }, 1000);
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() { $("body").removeClass("game-over");}, 200);
    $("#level-title").text("Game Over, Press the Start button to Restart or Press any key to restart");
    $(".restart").fadeIn(3000);
    startOver();
  }
}

function startOver()
{
  level=0;
  gamePattern=[];
  started = false;
}

$(".restart").click(
function() {
$(".restart").addClass("pressed");
$(".restart").fadeOut(1000);
setTimeout(function() { $(".restart").removeClass("pressed"); }, 100);
});
