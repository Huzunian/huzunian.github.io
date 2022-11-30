//Constants
var q = 13; //Number of boxes
var w = 40; //width of boxes
var colors = ["gold", "darkGreen", "dodgerBlue", "yellowGreen", "tan", "black"];	//Terrain colors
var allTiles = [	//All the tiles, so basically, yes
[[1,0], [1,0], 1],
[[1,0], [1,0], 2], 
[[2,0], [2,0], 3], 
[[2,0], [2,0], 4], 
[[2,0], [2,0], 5], 
[[2,0], [2,0], 6], 
[[3,0], [3,0], 7], 
[[3,0], [3,0], 8], 
[[3,0], [3,0], 9], 
[[4,0], [4,0], 10],
[[4,0], [4,0], 11],
[[5,0], [5,0], 12],
[[1,0], [2,0], 13],
[[1,0], [3,0], 14],
[[1,0], [4,0], 15],
[[1,0], [5,0], 16],
[[2,0], [3,0], 17],
[[2,0], [4,0], 18],
[[1,1], [2,0], 19],
[[1,1], [3,0], 20], 
[[1,1], [4,0], 21],
[[1,1], [5,0], 22],
[[1,1], [6,0], 23],
[[2,1], [1,0], 24],
[[2,1], [1,0], 25],
[[2,1], [1,0], 26],
[[2,1], [1,0], 27],
[[2,1], [3,0], 28],
[[2,1], [4,0], 29],
[[3,1], [1,0], 30],
[[3,1], [1,0], 31],
[[3,1], [2,0], 32],
[[3,1], [2,0], 33],
[[3,1], [2,0], 34],
[[3,1], [2,0], 35],
[[1,0], [4,1], 36],
[[3,0], [4,1], 37],
[[1,0], [5,1], 38],
[[4,0], [5,1], 39],
[[6,1], [1,0], 40],
[[1,0], [4,2], 41],
[[3,0], [4,2], 42],
[[1,0], [5,2], 43],
[[4,0], [5,2], 44],
[[6,2], [1,0], 45],
[[5,0], [6,2], 46],
[[5,0], [6,2], 47],
[[1,0], [6,3], 48]]; 

var turn = Math.floor(Math.random()*2), hasClaim = false, region = [0,0], plTiles = [[],[]], plSums = [0,0];
var btns = document.getElementsByClassName("tile");
for (i=0; i<btns.length; i++){
	btns[i].style.position = "absolute";
	btns[i].style.top = ((50*i).toString() + "px");
	btns[i].style.right = "0";
}

var ctx = [], moreCtx = [document.getElementById("displayOne").getContext("2d"), document.getElementById("displayTwo").getContext("2d")];
for(i=0; i<document.getElementsByClassName("player").length; i++){
	ctx.push(document.getElementsByClassName("player")[i].getContext("2d"));
}
var tileCtx = document.getElementById("tiles").getContext("2d");

var boards = [[],[]];
for (i=0; i<boards.length; i++){
	for (j=0; j<q; j++){
		boards[i].push([]);
		for (k=0; k<q; k++){
			boards[i][j].push([0,0]);
		}
	}
	boards[i][~~(q/2)][~~(q/2)] = [10,0];
}

for (k=0; k<boards.length; k++){
	var a = ["oneBtns", "twoBtns"];
	for (i=0; i<boards[k].length; i++){
		for (j=0; j<boards[k][i].length; j++){
			if (i != ~~(q/2) || j != ~~(q/2)){
				var temp = document.createElement("button");
				temp.className = "backgroundBtn";
				if (k === 0){
					temp.style.top = ((w*i).toString() + "px");
					temp.style.left = ((w*j).toString() + "px");
					temp.id = (j.toString() + " " + i + " 0");
				}
				else {
					temp.style.bottom = ((w*i).toString() + "px");
					temp.style.right = ((w*j).toString() + "px");
					temp.id = ((q-1-j).toString() + " " + (q-1-i) + " 1");
				}
				temp.onclick = function(){placePiece(this.id)};
				document.getElementById(a[k]).appendChild(temp);
			}
		}
	}
}

var shuffled = [], next = [], current = [], piece = -5, rot = [true, true];
var claimed = [true, true, true, true], nextClaim = [false, false, false, false];

function shuffleTiles(){
	numbers = [];
	for (i=0; i<allTiles.length; i++){
		numbers.push(i);
		if (shuffled.length > 0){
			shuffled.pop();
		}
	}
	for (i=0; i<allTiles.length; i++){
		r = Math.floor(Math.random()*numbers.length);
		shuffled.push(allTiles[numbers[r]][2]);
		numbers.splice(r, 1);
	}
}

function newTiles(){
	tileCtx.clearRect(90, 0, w*2, 200);
	if (shuffled.length >= 4){
		next = [shuffled.pop(), shuffled.pop(), shuffled.pop(), shuffled.pop()];
		colors = ["gold", "darkGreen", "dodgerBlue", "yellowGreen", "tan", "black"];
		for (i=1; i<next.length; i++){
			min = i;
			for (j=i-1; j>=0; j--){
				if (next[i] < next[j]){
					min = j;
				}
				else {
					break;
				}
			}
			next.splice(min, 0, next[i]);
			next.splice(i+1, 1);
		}
		for (i=0; i<next.length; i++){
			for (j=0; j<2; j++){
				tileCtx.fillStyle = colors[allTiles[next[i]-1][j][0]-1];
				tileCtx.fillRect(90+w*j, (w+10)*i, w, w);
				for (k=0; k<allTiles[next[i]-1][j][1]; k++){
					tileCtx.fillStyle = "magenta";
					tileCtx.beginPath();
					tileCtx.arc(w*j + 12*k + 97, (w+10)*i + 7, 5, 0, 2*Math.PI);
					tileCtx.fill();
				}
			}
		}
	}
}

function shiftTiles(){
	current = next;
	a = ["blue", "purple"];
	for (i=0; i<current.length; i++){
		for (j=0; j<allTiles[current[i]-1].length-1; j++){
			tileCtx.fillStyle = colors[allTiles[current[i]-1][j][0]-1];
			tileCtx.fillRect(w*j, 50*i, w, w);
			for (k=0; k<allTiles[current[i]-1][j][1]; k++){
				tileCtx.fillStyle = "magenta";
				tileCtx.beginPath();
				tileCtx.arc(w*j + 12*k + 7, 50*i + 7, 5, 0, 2*Math.PI);
				tileCtx.fill();
			}
		}
		tileCtx.fillStyle = a[claimed[i]];
		tileCtx.beginPath();
		tileCtx.arc(w, 50*i + w/2, 10, 0, 2*Math.PI);
		tileCtx.fill();
	}
}

shuffleTiles();
newTiles();

for (i=0; i<ctx.length; i++){
	a = ["blue", "purple"];
	ctx[i].fillStyle = a[i];
	ctx[i].fillRect(w*(~~(q/2)), w*(~~(q/2)), w, w);
	for (j=0; j<=boards[i].length; j++){
		ctx[i].beginPath();
		ctx[i].moveTo(0, w*j);
		ctx[i].lineTo(w*q, w*j);
		ctx[i].stroke();
		ctx[i].beginPath();
		ctx[i].moveTo(w*j,0);
		ctx[i].lineTo(w*j, w*q);
		ctx[i].stroke();
	}
}

document.getElementById("text").textContent = ("It's Player " + (turn+1).toString() + "'s turn.");

function claimTile(x){
	a = ["blue", "purple"];
	if (!hasClaim && !nextClaim[x]){
		nextClaim[x] = turn;
		tileCtx.fillStyle = a[turn];
		tileCtx.beginPath();
		tileCtx.arc(90+w, 50*x + w/2, 10, 0, 2*Math.PI);
		tileCtx.fill();
		advance();
	}
	else if (Number.isInteger(claimed[piece])){
		document.getElementById("text").textContent = "Please place your tile first.";
	}
	else {
		document.getElementById("text").textContent = "Please claim an unclaimed tile.";
	}
}

function advance(){
	piece++;
	if (piece === -1){piece = 4;}
	if (piece === -4 || piece === -2){
		if (turn === 1){
			turn = 0;
		}
		else {
			turn++;
		}
	}
	else if (piece < 0){}
	else {
		hasClaim = true;
		if (piece > 3){
			claimed = nextClaim;
			nextClaim = [false, false, false, false];
			piece = 0;
			shiftTiles();
			newTiles();
		}
		turn = claimed[piece];
		nextTurn();
	}
	document.getElementById("text").textContent = ("It's Player " + (turn+1).toString() + "'s turn.");	
}

function rotate(c){
	if (!hasClaim){}
	else if (c === turn){
		moreCtx[turn].clearRect(0, 0, w*2, w*2);
		if (rot[0] && rot[1]){
			rot[0] = false;
			draw(moreCtx, 0.5, 0);
		}
		else if (!rot[0] && rot[1]){
			rot = [true, false];
			draw(moreCtx, 0, 0.5);
		}
		else if (rot[0] && !rot[1]){
			rot[0] = false;
			draw(moreCtx, 0.5, 0);
		}
		else {
			nextTurn();
		}
	}
}

function nextTurn(){
	for (i=0; i<boards.length; i++){moreCtx[i].clearRect(0,0,w*2,w*2);}
	rot = [true, true];
	draw(moreCtx, 0, 0.5);
}

function placePiece(wow){
	wow = wow.split(" ");
	x = parseInt(wow[0], 10), y = parseInt(wow[1], 10), z = parseInt(wow[2], 10);
	if (!hasClaim){document.getElementById("text").textContent = "Claim a new tile to finish your turn."}
	else if (z === turn){
		var type = [allTiles[current[piece]-1][0][0], allTiles[current[piece]-1][1][0]];
		if (!rot[1]){
			type.reverse();
		}
		var check = false;
		if (boards[turn][y][x][0] != 0){}
		else if (rot[0] && x != q-1 && boards[turn][y][x+1][0] === 0){
			if (
				(y != q-1 && (boards[turn][y+1][x][0]===type[0] || boards[turn][y+1][x+1][0]===type[1] || boards[turn][y+1][x][0]>9 || 
					boards[turn][y+1][x+1][0]>9))	||
				(y != 0 && (boards[turn][y-1][x][0]===type[0] || boards[turn][y-1][x+1][0]===type[1] || boards[turn][y-1][x][0]>9 || 
					boards[turn][y-1][x+1][0]>9))	||
				(x != 0 && (boards[turn][y][x-1][0]===type[0] || boards[turn][y][x+2][0] === type[1] || boards[turn][y][x-1][0]>9 || 
					boards[turn][y][x+2][0]>9))
			){check = true;}
		}
		else if (!rot[0] && y != q-1 && boards[turn][y+1][x][0] === 0){
			if (
				(x != q-1 && (boards[turn][y][x+1][0]===type[0] || boards[turn][y+1][x+1][0]===type[1] || boards[turn][y][x+1][0]>9 ||
					boards[turn][y+1][x+1][0]>9))	||
				(x != 0 && (boards[turn][y][x-1][0]===type[0] || boards[turn][y+1][x-1][0]===type[1] || boards[turn][y][x-1][0]>9 ||
					boards[turn][y+1][x-1][0]>9))	||
				(y != 0 && (boards[turn][y-1][x][0]===type[0] || boards[turn][y+2][x][0] === type[1] || boards[turn][y-1][x][0]>9 ||
					boards[turn][y+2][x][0]>9))
			){check = true;}
		}

		var pos = null;
		if (check){
			draw(ctx, x, y);
			hasClaim = false, claimed[piece] = null;
			moreCtx[turn].clearRect(0, 0, w*2, w*2);
		}
		else {
			document.getElementById("text").textContent = "You cannot place the piece there";
		}
	}
}

function draw(context, x, y){
	var pos = null, type = [allTiles[current[piece]-1][0], allTiles[current[piece]-1][1]];
	if (rot[0]){pos = [[x, x+1], [y, y]];}
	else {pos = [[x, x], [y, y+1]];}

	if (!rot[1]){type.reverse();}

	for (i=0; i<pos.length; i++){
		context[turn].fillStyle = colors[type[i][0]-1];
		context[turn].fillRect(w*pos[0][i], w*pos[1][i], w, w);
		for (k=0; k<type[i][1]; k++){
			context[turn].fillStyle = "magenta";
			context[turn].beginPath();
			context[turn].arc(w*pos[0][i] + 12*k + 7, w*pos[1][i] + 7, 5, 0, 2*Math.PI);
			context[turn].fill();
		}
		if (context === ctx){
			boards[turn][pos[1][i]][pos[0][i]] = type[i];
			updateScore(pos[0][i], pos[1][i]);
		}
	}

	if (context === ctx){
		if (pos[0][0] <= ~~(q/2)-1){
			for (i=pos[0][0]+(q+1)/2; i<q; i++){
				for (j=0; j<boards[turn][i].length; j++){
					if (boards[turn][j][i][0] < 0){break;}
					else {boards[turn][j][i] = [-1,-1];}
				}
			}
		}
		else if (pos[0][1] >= ~~(q/2)+1){
			for (i=0; i<=pos[0][1]-(q+1)/2; i++){
				for (j=0; j<boards[turn][i].length; j++){
					if (boards[turn][j][i][0] < 0){break;}
					else {boards[turn][j][i] = [-1,-1];}
				}
			}
		}

		if (pos[1][0] <= ~~(q/2)-1){
			for (i=pos[1][0]+(q+1)/2; i<q; i++){
				for (j=0; j<boards[turn][i].length; j++){
					if (boards[turn][i][j][0] < 0){break;}
					else {boards[turn][i][j] = [-1,-1];}
				}
			}
		}
		else if (pos[1][1] >= ~~(q/2)+1){
			for (i=0; i<q; i++){
				console.log(pos[1][1]-(q+1)/2);
				for (j=0; j<=pos[1][1]-(q+1)/2; j++){
					if (boards[turn][j][i][0] < 0){break;}
					else {boards[turn][j][i] = [-1,-1];}
				}
			}
		}
	}			
}

function updateScore(x, y){
	var temp = boards[turn][y][x][0];
	var clear = [];
	if (y != 0 && boards[turn][y-1][x][0] === temp){
		clear.push(boards[turn][y-1][x][2]);
	}
	if (y != q-1 && boards[turn][y+1][x][0] === temp){
		clear.push(boards[turn][y+1][x][2]);
	}
	if (x != 0 && boards[turn][y][x-1][0] === temp){
		clear.push(boards[turn][y][x-1][2]);
	}
	if (x != q-1 && boards[turn][y][x+1][0] === temp){
		clear.push(boards[turn][y][x+1][2]);
	}

	if (clear.length > 1){
		for (m=0; m<clear.length-1; m++){
			if (clear[m] != clear[m+1]){
				plTiles[turn][clear[i+1]][0] = 0;
				for (n=0; n<q; n++){
					for (o=0; o<q; o++){
						if (boards[turn][n][o][2] === clear[m+1]){
							boards[turn][n][o][2] = clear[m];
							plTiles[turn][clear[m]][1]++;
							plTiles[turn][clear[m]][0] += boards[turn][n][o][1];
						}
					}
				}
				clear[m+1] = clear[m];
			}
		}
		clear = [clear[0]];
	}

	if (clear.length === 0){
		boards[turn][y][x].push(region[turn]);
		plTiles[turn].push([boards[turn][y][x][1], 1]);
		region[turn]++;
	}
	else {
		boards[turn][y][x].push(clear[0]);
		plTiles[turn][clear[0]][1]++;
		plTiles[turn][clear[0]][0] += boards[turn][y][x][1];
	}

	plSums[turn] = 0;
	for (m=0; m<plTiles[turn].length; m++){
		plSums[turn] += (plTiles[turn][m][0]*plTiles[turn][m][1]);;
	}
	document.getElementsByClassName("score")[turn].textContent = plSums[turn].toString();
}