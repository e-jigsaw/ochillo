var assert = require("assert");

describe("ボードモデルは", function() {
	var BoardModel = require("../src/boardModel");
	var Black = 0;
	var White = 1;
	var Wall  = 9;

	var boardModel = new BoardModel();

	before(function(done) {
		boardModel.init();
		done();
	});

	it("8x8のマップを持っている", function() {
		assert.equal(boardModel.state.length, 10);
		assert.equal(boardModel.state[0].length, 10);
	});

	it("座標を指定してボードの状態を変更できる", function() {
		boardModel.set(2, 2, Black);
		assert.equal(boardModel.state[2][2], Black);
		boardModel.set(2, 2, White);
		assert.equal(boardModel.state[2][2], White);
	});

	it("座標を指定してボードの状態を取得できる", function() {
		boardModel.state[2][2] = Black;
		assert.equal(boardModel.get(2, 2), Black);
	});

	it("盤面の判定ができる", function() {
		boardModel.set(4, 8, 0);
		boardModel.set(4, 7, 1);
		boardModel.set(4, 6, 0);
		boardModel.check(4, 6, 0);
		assert.equal(boardModel.get(4, 7), Black);
	});
});
