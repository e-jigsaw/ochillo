$(document).ready(function() {
	var ball = new ballModel();
	var board = new boardModel();

	ball.init();
	board.init();

	for(var i=0; i<board.get().length; i++) {
		$("#board").append($("<div />", {
			id: "row"+i,
			class: "row"
		}));
		for(var j=0; j<board.get()[i].length; j++) {
			$(".row"+i).append($("<div />", {
				id: "col"+j,
				class: "col"
			}));
		}
	}

	display(board.get());
});

function display(board) {
	for(var i=0; i<board.length; i++) {
		for(var j=0; j<board.length; j++) {
			
		}
	}
}
