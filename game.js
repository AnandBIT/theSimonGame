// MODULE PATTERN SO THAT GAME DATA IS KEPT PRIVATE FROM THE USER

(function () {
	var userClickedPattern = [];
	var gamePattern = [];
	var buttonColours = ['red', 'blue', 'green', 'yellow'];
	var level = 0;
	var started = false;

	function nextSequence() {
		userClickedPattern = [];
		level++;
		$('#level-title').text('Level ' + level);
		var randomNumber = Math.floor(Math.random() * 4);
		var randomChosenColour = buttonColours[randomNumber];
		gamePattern.push(randomChosenColour);
		$('#' + randomChosenColour)
			.fadeOut(120)
			.fadeIn(120);
		playSound(randomChosenColour);
	}

	// LISTENING FOR KEYBOARD BUTTON CLICKS
	$(document).keypress(function () {
		if (!started) {
			nextSequence();
			started = true;
		}
	});

	// Captures start button click and fades out the button on every click
	$('.restart').click(function () {
		if (!started) {
			nextSequence();
			started = true;
			$(this).addClass('pressed');
			$(this).fadeOut(800);
			setTimeout(function () {
				$('.restart').removeClass('pressed');
			}, 100);
		}
	});

	$('.btn').click(function () {
		var userChosenColour = $(this).attr('id');
		userClickedPattern.push(userChosenColour);
		animatePress(userChosenColour);
		playSound(userChosenColour);
		checkAnswer(userClickedPattern.length - 1);
	});

	// PLAYS SOUND ACCORDING TO THE COLOR NAME GIVEN
	function playSound(name) {
		var audio = new Audio('sounds/' + name + '.mp3');
		audio.play();
	}

	// ANIMATES THE CLICKED BUTTON
	function animatePress(currentColour) {
		$('#' + currentColour).addClass('pressed');
		setTimeout(function () {
			$('.' + currentColour).removeClass('pressed');
		}, 120);
	}

	// FUNCTION FOR MATCHING SEQUENCE
	function checkAnswer(currentLevel) {
		// Checks whether the button clicked by the user is according to the computer generated sequence or not
		if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
			/*
				Checks if the full required sequence for a particular level is generated or not,
				so that the game should proceed to the next level
			*/
			if (userClickedPattern.length === gamePattern.length) {
				setTimeout(function () {
					nextSequence();
				}, 1000);
			}
		} else {
			/********  GAME OVER  ********/
			playSound('wrong');
			$('body').addClass('game-over');
			setTimeout(function () {
				$('body').removeClass('game-over');
			}, 200);
			$('#level-title').text(
				'Game Over, Press the Start button to Restart or Press any key to restart'
			);

			// Start button re-appears on screen
			$('.restart').fadeIn(2000);

			// GAME DATA RESETS TO IT'S INITIAL VALUE
			startOver();
		}
	}

	// FUNCTION TO RESET DATA ON EVERY GAME START
	function startOver() {
		level = 0;
		gamePattern = [];
		started = false;
		userClickedPattern = [];
	}
})();
