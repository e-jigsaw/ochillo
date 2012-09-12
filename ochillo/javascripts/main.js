$(document).ready(function() {
	var ball = new ballModel();
	var board = new boardModel();

	ball.init();
	board.init();
	init(board);

	$("body").on("keydown", function(key) {
		//console.log(key.keyCode);
		switch(key.keyCode) {
			case 37: // left key down
				ball.moveLeft(board.get());
				display(ball.getCurrentBoard(), board.get());
				break;
			case 39: // right key down
				ball.moveRight(board.get());
				display(ball.getCurrentBoard(), board.get());
				break;
			case 40: // down key down
				var flg = ball.dropOneBalls(board.get());
				display(ball.getCurrentBoard(), board.get());
				if(!flg) {
					board.set(ball.getCurrentBoard());
					turn(ball, board);
				}
				break;
		}
	});

	ball.generateBalls(Math.floor(Math.random() * 5));
	turn(ball, board);
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
