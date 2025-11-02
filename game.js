var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;

// Detect mobile device
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

$(document).ready(function () {
  if (isMobile) {
    $("#level-title").text("Tap to Start");
    $("#start-btn").show();

    $("#start-btn").click(function () {
      if (!start) {
        $("#start-btn").hide();
        startGame();
      }
    });
  } else {
    $(document).keypress(function () {
      if (!start) {
        startGame();
      }
    });
  }
});

function startGame() {
  $("#level-title").text("Level " + level);
  nextSequence();
  start = true;
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text(isMobile ? "Game Over, Tap to Restart" : "Game Over, Press Any Key to Restart");
    $("#start-btn").toggle(isMobile);
    startOver();
  }
}

function startOver() {
  start = false;
  level = 0;
  gamePattern = [];
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}