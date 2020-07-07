(function(){
	'use strict';


	var timer = document.getElementById('timer');
	//var min = document.getElementById('min');
	//var sec = document.getElementById('sec');
	var reset = document.getElementById('reset');
	var start = document.getElementById('start');

	var addHour = document.getElementById('addHour');
	var addTenMin = document.getElementById('addTenMin');
	var addMin = document.getElementById('addMin');
	var addTenSec = document.getElementById('addTenSec');
	var addSec = document.getElementById('addSec');
	var reduceHour = document.getElementById('reduceHour');
	var reduceTenMin = document.getElementById('reduceTenMin');
	var reduceMin = document.getElementById('reduceMin');
	var reduceTenSec = document.getElementById('reduceTenSec');
	var reduceSec = document.getElementById('reduceSec');
	var orderText = document.getElementById('orderText');
	const visibilityOriginal = orderText.style.visibility;
	var textClear = document.getElementById('textClear');


	var startTime;
	var timeLeft;
	var timeToCountDown = 0;
	var timerId;
	var isRunning = false;


	//タイマー初期値
	var defTimeToCountDown = 300 *1000;
	timeToCountDown =defTimeToCountDown;

	function updateTimer(t){
		var d = new Date(t);
		var h = d.getHours() - 9;
		//console.log(d);
		//console.log(h);
		var m = d.getMinutes();
		var s = d.getSeconds();
		var ms = d.getMilliseconds();
		//console.log(m);
		var timerString;
		h = ('0'+ h).slice(-1);
		m = ('0' + m).slice(-2);
		s = ('0' + s).slice(-2);
		ms = ('00' + ms).slice(-3);
		//timerString =  m + ':' + s + '.' + ms;
		timerString = h + ':' + m + ':' + s
		//timer.textContent = m + ':' + s + '.' + ms;
		timer.textContent = timerString;
		document.title = timerString;
	}

	function countDown(){
		timerId = setTimeout(function(){
			//var elapsedTime = Date.now() - startTime;
			//timeLeft = timeToCountDown - elapsedTime;
			timeLeft = timeToCountDown - (Date.now() - startTime);
			//console.log(timeLeft);
			if (timeLeft < 0){
				isRunning = false;
				start.textContent = 'スタート';
				clearTimeout(timerId);
				timeLeft = 0;
				timeToCountDown = 0;
				updateTimer(timeLeft);
				//アラームをならす処理
				playSound();
				showOrderTextArea();
				return;
			}
			updateTimer(timeLeft);
			countDown();
		}, 100);
	}

	function playSound(){
		//タイマー0になったときのアラーム音を再生
		document.getElementById('chime').play();
		//効果音のソース https://soundeffect-lab.info/sound/anime/
	}

	start.addEventListener('click', function(){
		if (isRunning === false){
			isRunning = true;
			start.textContent = 'ストップ';
			startTime = Date.now();
			countDown();
			//textareaの文字列を変数に格納
			var orderLargeText = orderText.value;
			//textareaを隠す
			orderText.style.visibility = 'hidden';
			orderText.style.height ='1px'
			//変数を大きく表示する
			LargeText.innerHTML = orderLargeText;
			//クリアボタンを隠す
			textClear.style.visibility ='hidden';


			/*
			//plusボタンを隠す
			addHour.style.visibility ='hidden';
			addTenMin.style.visibility ='hidden';
			addMin.style.visibility ='hidden';
			addTenSec.style.visibility ='hidden';
			addSec.style.visibility ='hidden';
			//minusボタンを隠す
			reduceHour.style.visibility ='hidden';
			reduceTenMin.style.visibility ='hidden';
			reduceMin.style.visibility ='hidden';
			reduceTenSec.style.visibility ='hidden';
			reduceSec.style.visibility ='hidden';
			*/
			
		} else {
			isRunning = false;
			start.textContent = 'スタート';
			timeToCountDown = timeLeft;
			clearTimeout(timerId);
			showOrderTextArea();
			orderText.style.height ='130px'
			textClear.style.visibility ='visible';
			/*
			addHour.style.visibility ='visible';
			addTenMin.style.visibility ='visible';
			addMin.style.visibility ='visible';
			addTenSec.style.visibility ='visible';
			addSec.style.visibility ='visible';
			reduceHour.style.visibility ='visible';
			reduceTenMin.style.visibility ='visible';
			reduceMin.style.visibility ='visible';
			reduceTenSec.style.visibility ='visible';
			reduceSec.style.visibility ='visible';
			*/

		}
		
	});

	function showOrderTextArea(){
		//大きく表示していた文字列を非表示にする
		LargeText.innerHTML = '';
		//textareaを表示する
		orderText.style.visibility = visibilityOriginal;
	}

	
	addHour.addEventListener('click', function(){
		if (isRunning === true){
			return;
		}
		timeToCountDown += 3600 * 1000;
		if (timeToCountDown >= 10 * 60 * 60 * 1000){
			timeToCountDown = 10 * 60 * 60 * 1000 - 1000;
		}

		updateTimer(timeToCountDown);
	});


	
	addTenMin.addEventListener('click', function(){
		if (isRunning === true){
			return;
		}
		timeToCountDown += 600 * 1000;
		if (timeToCountDown >= 10 * 60 * 60 * 1000){
			timeToCountDown = 10 * 60 * 60 * 1000 -1000 ;
		}

		updateTimer(timeToCountDown);
	});



	addMin.addEventListener('click', function(){
		if (isRunning === true){
			return;
		}
		timeToCountDown += 60 * 1000;
		if (timeToCountDown >= 10 * 60 * 60 * 1000){
			timeToCountDown = 10 * 60 * 60 * 1000 -1000;
		}

		updateTimer(timeToCountDown);
	});

	//
	addTenSec.addEventListener('click', function(){
		if (isRunning === true){
			return;
		}
		timeToCountDown += 10 * 1000;
		if (timeToCountDown >= 10 * 60 * 60 * 1000){
			timeToCountDown = 10 * 60 * 60 * 1000 -1000;
		}
		updateTimer(timeToCountDown);
	});


	addSec.addEventListener('click', function(){
		if (isRunning === true){
			return;
		}
		timeToCountDown += 1000;
		if (timeToCountDown >= 10 * 60 * 60 * 1000){
			timeToCountDown = 10 * 60 * 60 * 1000 -1000;
		}
		updateTimer(timeToCountDown);
	});

	reduceHour.addEventListener('click', function(){
		if (isRunning === true){
			return;
		}
		timeToCountDown -= 3600 * 1000;
		if (timeToCountDown >= 9 * 60 * 60 * 1000){
			timeToCountDown = 0;
		}
		if (timeToCountDown < 0){
			timeToCountDown = 0;
		}

		updateTimer(timeToCountDown);
	});


	reduceTenMin.addEventListener('click', function(){
		if (isRunning === true){
			return;
		}
		timeToCountDown -= 600 * 1000;
		if (timeToCountDown >= 9 * 60 * 60 * 1000){
			timeToCountDown = 0;
		}
		if (timeToCountDown < 0){
			timeToCountDown = 0;
		}

		updateTimer(timeToCountDown);
	});



	reduceMin.addEventListener('click', function(){
		if (isRunning === true){
			return;
		}
		timeToCountDown -= 60 * 1000;
		if (timeToCountDown >= 9 * 60 * 60 * 1000){
			timeToCountDown = 0;
		}
		if (timeToCountDown < 0){
			timeToCountDown = 0;
		}

		updateTimer(timeToCountDown);
	});

	reduceTenSec.addEventListener('click', function(){
		if (isRunning === true){
			return;
		}
		timeToCountDown -= 10 * 1000;
		if (timeToCountDown >= 9 * 60 * 60 * 1000){
			timeToCountDown = 0;
		}
		if (timeToCountDown < 0){
			timeToCountDown = 0;
		}

		updateTimer(timeToCountDown);
	});


	reduceSec.addEventListener('click', function(){
		if (isRunning === true){
			return;
		}
		timeToCountDown -= 1000;
		if (timeToCountDown >= 9 * 60 * 60 * 1000){
			timeToCountDown = 0;
		}
		if (timeToCountDown < 0){
			timeToCountDown = 0;
		}

		updateTimer(timeToCountDown);
	});


	reset.addEventListener('click', function(){
		if (isRunning === true){
			return;
		}else{
			timeToCountDown = defTimeToCountDown;
			updateTimer(timeToCountDown);
		}
	});

	textClear.addEventListener('click', function(){
		orderText.value='';
	});


})();