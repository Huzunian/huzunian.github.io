
// try adding one sig everytime you win
// or add one sig for every two you activate dynamically?
// or try inverted so has to be quicker each time! (joss idea)

var sig = 0;
var totalSigs = 10;
var signals = []
var lastTime = 0;
var firstTime = 0;
var gaps = []
var fr = 60;
var delta = 1 / fr;
var hasWon = false;
var winCount = 0;
var bestGap = 1000000;	// last gap of best
var bestTime = 1000000; // best total time
var bgColor;
var offColor;
var onColor;

function setup(){
	createCanvas(windowWidth, windowHeight);
	colorMode(RGB);
	noStroke();  // Don't draw a stroke around shapes
	
	bgColor = color(150,61,36);
	offColor = color(240,136,63);
	onColor = color(255,207,105);
	
	bgColor = color(10);
	offColor = color(127);
	onColor = color(230);

	
	frameRate(fr);
	for (var i = 0; i < totalSigs; ++i){
		signals.push(0);
		gaps.push(0);
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
	background(bgColor)
	
	var sigWidth = constrain(0.04 * windowWidth, 20, 50);
	var sigHeight = constrain(0.2 * windowHeight, 100, 500);
	var padding = constrain(0.03 * windowWidth, 10, 30);
	var totalWidth = sigWidth * totalSigs + padding * (totalSigs-1);
	
	for(var i = 0; i < totalSigs; ++i){
		var speed = 5.0;
		signals[i] += (i < sig ? delta : -delta) * speed;
		signals[i] = constrain(signals[i], 0, 1);
		
		var cx = windowWidth / 2 - totalWidth / 2 + i * (sigWidth + padding);
		var cy = windowHeight / 2;
		
		var t = tmod(signals[i]);
		var w = lerp(sigWidth, sigWidth * 1.3, t);
		var h = lerp(sigHeight, sigHeight * 1.3, t);
		
		fill(lerpColor(offColor, onColor, t));
		if (winCount >= 1){
			//w = sigWidth * 1.3;
			h = sigHeight * 1.3;
			var hoff = -h/ 2;
			if ( i < sig ){
				h = constrain((h * gaps[i]) / bestGap, 10, 1000);
			}else{
				h = 10;
			}
			hoff += h;
			rect(cx, cy - hoff, w, h);
		}else{
			rect(cx, cy - h / 2, w, h);
		}
		
	}
	if(hasWon){ // draw winning times
		textSize(64);
		
		fill(onColor);
		textAlign(CENTER);
		var curTime = lastTime - firstTime;
		var curStr = (curTime / 1000).toFixed(2);
		//if (curTime == bestTime){
		//  curStr += " !";
		//}
		text(curStr, windowWidth / 2, 0.8 * windowHeight);
		
		if(winCount >= 2){
			var bestStr = (bestTime / 1000).toFixed(2);
			fill(offColor);
			textAlign(RIGHT);
			text(bestStr, windowWidth / 2 + totalWidth / 2, 0.8 * windowHeight);
		}
	}
}

function tmod(t){
	t = constrain(t, 0, 1);
	return t*t*t*(t*(t*6-15)+10); // reshape time
}

function click() {
	var newgap = millis() - lastTime;
	lastTime = millis();
	if(hasWon){
		hasWon = false;
		sig = 0;
		return false;
	}
	
	if(sig == 0){
		newgap = 0;
		firstTime = lastTime;
	}else if (newgap < gaps[sig-1]){
		sig = 0;
		return false;
	}
	gaps[sig] = newgap;
	sig++;
	
	if(sig == totalSigs){
		hasWon = true;
		winCount++;
		for(var i = 0; i < totalSigs; ++i){
			if(winCount == 1){ // only relerp when the format changes (on first win)
				signals[i] = 0;
			}
		}
		// did it like this because its possible to have a smaller
		// largest gap without having the best time... i think?
		// which makes the bars resize even though ur time wasnt better which seems wierd
		if (lastTime - firstTime < bestTime){
			bestTime = lastTime - firstTime;
			bestGap = gaps[9];
		}
		
	}
}

function mousePressed() {
	click();
	return false; // gets rid of default browser behaviour
}

function keyPressed(){
	if(keyCode == 32){ // space
		click();
	}
	return false;
}

function touchStarted(){
	click();
	return false;
}
