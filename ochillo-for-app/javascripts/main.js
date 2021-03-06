$(document).ready(function() {
	var ball = new ballModel();
	var board = new boardModel();

	ball.init();
	board.init();
	init(board);

	$("#board").touchwipe({
		wipeLeft: function() { // left swipe
			ball.moveLeft(board.get());
			display(ball.getCurrentBoard(), board.get());
		}, 
		wipeRight:function() { // right swipe
			ball.moveRight(board.get());
			display(ball.getCurrentBoard(), board.get());
		},
     	wipeUp:   function() { // !!!DOWN!!! swipe
     		fall(ball, board, player);
     	},
     	wipeDown: function() {  // !!!UP!!! swipe
     		ball.rollBalls(board.get());
			display(ball.getCurrentBoard(), board.get());
     	}
	});

	$("#resetButton").on("touchstart", function(){
		if(confirm("本当にリセットしますか？")) {
			start();
		}
	});

	ball.generateBalls(Math.floor(Math.random() * 5));
	turn(ball, board);
	fallEachTime(ball, board);


	function start() {
		ball = new ballModel();
		board = new boardModel();
		ball.init();
		board.init();
		ball.generateBalls(Math.floor(Math.random() * 5));
		turn(ball, board);
		fallEachTime(ball, board);
	}
});

function init(board) {
	for(var i=0; i<board.get().length; i++) {
		$("#board").append($("<div />", {
			id: "row"+i,
			class: "row"
		}));
		for(var j=0; j<board.get()[i].length; j++) {
			$("#row"+i).append($("<div />", {
				id: "col"+j,
				class: "col"
			}));
		}
	}
}

function turn(ball, board) {
	ball.moveNext();
	display(ball.getCurrentBoard(), board.get());
	displayScore(board, board.getCurrentPlayer());
}

function fall(ball, board) {
	var flg = ball.dropOneBalls(board.get());
	if(flg != 1) {
		board.set(ball.getCurrentBoard());
		var queue = [];
		for(var i=0; i<flg.length; i++) {
			if(board.get()[flg[i][0]][flg[i][1]] == board.getCurrentPlayer()) {
				queue.push(flg[i]);
			} 
		}
		board.check(queue);
		board.changeCurrentPlayer();
		turn(ball, board);
	}
	display(ball.getCurrentBoard(), board.get());
}

function fallEachTime(ball, board) {
	(function(ball, board) {
		window.setTimeout(function() {
			fall(ball, board);
			fallEachTime(ball, board);
		}, 1000);
	})(ball, board);
}

function display(tmpBoard, masterBoard) {
	var compBoard = [];
	for(var i=0; i<masterBoard.length; i++) {
		compBoard.push([]);
		for(var j=0; j<masterBoard[i].length; j++) {
			if(tmpBoard[i][j] != -1) compBoard[i].push(tmpBoard[i][j]);
			else compBoard[i].push(masterBoard[i][j]);

		}
	}
	for(var i=0; i<compBoard.length; i++) {
		for(var j=0; j<compBoard.length; j++) {
			$("#row"+i+" > #col"+j).removeClass("wall").removeClass("ball").removeClass("white").removeClass("empty");
			switch(compBoard[i][j]) {
				case Black:
					$("#row"+i+" > #col"+j).addClass("black");
					break;
				case White:
					$("#row"+i+" > #col"+j).addClass("white");
					break;
				case Wall:
					$("#row"+i+" > #col"+j).addClass("wall");
					break;
				case Empty:
					$("#row"+i+" > #col"+j).addClass("empty");
					break;
			}
		}
	}
}

function displayScore(board, player) {
	$("#currentColor").removeClass("blackTurn").removeClass("whiteTurn");
	if(player == Black) $("#currentColor").addClass("blackTurn");
	else if(player == White) $("#currentColor").addClass("whiteTurn");
	$("#blackScore").text(board.countBlack());
	$("#whiteScore").text(board.countWhite());
}
