var assert = require("assert");

describe("ボールモデルは", function() {
	var BallModel = require("../src/ballModel");
	var ballModel = new BallModel();

	before(function(done) {
		ballModel.init();
		done();
	});

	it("ボールを生成できる", function() {
		ballModel.generateBalls(0);
		assert.equarl(ballModel.getNextBalls(), [
			[0, 1, 0, 0], 
			[0, 1, 0, 0], 
			[0, 1, 1, 0], 
			[0, 0, 0, 0]
		]);
		ballModel.generateBalls(1);
		assert.equarl(ballModel.getNnextBalls(), [
			[0, 0, 1, 0], 
			[0, 0, 1, 0], 
			[0, 1, 1, 0], 
			[0, 0, 0, 0]
		]);
		ballModel.generateBalls(2);
		assert.equarl(ballModel.getNnextBalls(), [
			[0, 1, 0, 0], 
			[0, 1, 0, 0], 
			[0, 1, 0, 0], 
			[0, 1, 0, 0]
		]);
		ballModel.generateBalls(3);
		assert.equarl(ballModel.getNnextBalls(), [
			[0, 0, 0, 0], 
			[0, 1, 1, 0], 
			[0, 1, 1, 0], 
			[0, 0, 0, 0]
		]);
		ballModel.generateBalls(4);
		assert.equarl(ballModel.getNnextBalls(), [
			[0, 0, 0, 0], 
			[0, 1, 1, 0], 
			[1, 1, 0, 0], 
			[0, 0, 0, 0]
		]);
		ballModel.generateBalls(5);
		assert.equarl(ballModel.getNnextBalls(), [
			[0, 0, 0, 0], 
			[1, 1, 0, 0], 
			[0, 1, 1, 0], 
			[0, 0, 0, 0]
		]);
	});

	it("カレントのボールを持っている", function() {
		ballModel.generateBalls(3);
		ballModel.moveNext();
		assert.equarl(ballModel.getCurrentBalls(), [
			[0, 0, 0, 0], 
			[0, 1, 1, 0], 
			[0, 1, 1, 0], 
			[0, 0, 0, 0]
		]);
	});

	it("ネクストのボールを持っている", function() {
		ballModel.generateBalls(2);
		assert.equarl(ballModel.getNextBalls(), [
			[0, 1, 0, 0], 
			[0, 1, 0, 0], 
			[0, 1, 0, 0], 
			[0, 1, 0, 0]
		]);
	});

	it("配置用のボードを持っている", function() {
		assert.equarl(ballModel.currentBoard.length, 10);
		assert.equarl(ballModel.currentBoard[0].length, 10);
	});

	it("カレントのボールをネクストに移せる", function() {
		ballModel.generateBalls(1);
		ballModel.moveNext();
		assert.equarl(ballModel.getCurrentBalls(), [
			[0, 0, 1, 0], 
			[0, 0, 1, 0], 
			[0, 1, 1, 0], 
			[0, 0, 0, 0]
		]);
	});

	it("ボールを回転できる", function() {
		ballModel.generateBalls(0);
		ballModel.moveNext();
		ballModel.rollBalls();
		assert.equarl(ballModel.getCurrentBalls(), [
			[0, 0, 0, 0], 
			[0, 0, 1, 0], 
			[1, 1, 1, 0], 
			[0, 0, 0, 0]
		]);
	});

	it("ボールを一気に落とせる", function() {
		ballModel.generateBalls(5);
		ballModel.moveNext();
		ballModel.dropBalls(4);
		assert.equarl(ballModel.getCurrentBoard(), [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 0, 0],
			[0, 0, 0, 1, 1, 0, 0, 0]
		]);
	});

	it("ボールを1段落とすことができる", function() {
		ballModel.generateBalls(4);
		ballModel.moveNext();
		ballModel.dropOneBalls(4);
		assert.equarl(ballModel.getCurrentBoard(), [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 1, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0]
		]);
	});
});