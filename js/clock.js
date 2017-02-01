

function Timer(minutes) {
	this.time = minutes * 60;
	this.startTime = minutes * 60;
	this.timeInterval;
	this.progBar = document.getElementById('progress');
	this.active = false;

	var self = this; // Hack to get to this level of 'this' from inside anonymous functions

	this.initClock = function() {
		self.updateClock();
		self.timeInterval = setInterval(function() {
			self.updateClock();
			self.progUpdate();
		}, 1000);
	};

	this.updateClock = function() {
		var minutes = parseInt(self.time / 60);
		var seconds = self.time % 60;
		self.active = true;

		self.time--;
		// Handling for seconds reaching 0
		if (seconds < 0) {
			minutes--;
			seconds = 59;
		}
		// Handling for extra digit when seconds < 10
		if (seconds < 10) {
			document.getElementById('display').innerHTML = minutes + ':0' + seconds;
		} else {
			document.getElementById('display').innerHTML = minutes + ':' + seconds;
		}

		// When time reaches 0
		if (this.time === 0) {
			self.pauseClock();
			self.end();
			document.getElementById('display').innerHTML = 'ALL DONE';
		}
	};

	this.pauseClock = function() {
		clearInterval(self.timeInterval);
		self.active = false;
	};

	this.resetClock = function () {
		self.time = minutes * 60;
	};

	this.end = function() {
		var wav = 'http://www.pacdv.com/sounds/domestic_sound_effects/alarm_clock_2.wav';
		var audio = new Audio(wav);
		audio.play();
		self.active = false;
	};

	this.progUpdate = function() {
		var width = 100 - ((self.startTime - self.time) / self.startTime) * 100;
		self.progBar.style.width = width + '%';
	};

	this.resetClock = function() {
		if (!self.active) {
			self.startTime = document.getElementById('minutes').innerHTML * 60;
		  	self.time = self.startTime;
		  	self.updateClock();
		  	self.progBar.style.width = 100 + '%';
		}
	};
}

document.addEventListener("DOMContentLoaded", function(){

  var startTimer = document.getElementById('display');
  var startingTime = document.getElementById('minutes');
  var plusArrow = document.getElementById('plus');
  var minusArrow = document.getElementById('minus');
  var reset = document.getElementById('reset');
  var toggle,create = false;
  var self = this;

  startTimer.addEventListener('click', function() {
	if (!create) {
		self.countdown = new Timer(startingTime.innerHTML);
		create = true;
	}
	if (!toggle) {
		self.countdown.initClock();
		toggle = true;
	} else {
		self.countdown.pauseClock();
		toggle = false;
	}
  });

  plusArrow.addEventListener('click', function() {
  	startingTime.innerHTML++;
  	reset.click();
  });

  minusArrow.addEventListener('click', function() {
  	if (startingTime.innerHTML > 1) {
  		startingTime.innerHTML--;
  		reset.click();
  	}
  });

  reset.addEventListener('click', function() {
  	self.countdown.pauseClock();
  	self.countdown.resetClock();
  	toggle = false;
  });

});