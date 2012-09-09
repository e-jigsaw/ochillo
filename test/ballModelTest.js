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
		assert.deepEqual(ballModel.getNextBalls(), [
			[0, 1, 0, 0], 
			[0, 1, 0, 0], 
			[0, 1, 1, 0], 
			[0, 0, 0, 0]
		]);
		ballModel.generateBalls(1);
		assert.deepEqual(ballModel.getNextBalls(), [
			[0, 0, 1, 0], 
			[0, 0, 1, 0], 
			[0, 1, 1, 0], 
			[0, 0, 0, 0]
		]);
		ballModel.generateBalls(2);
		assert.deepEqual(ballModel.getNextBalls(), [
			[0, 1, 0, 0], 
			[0, 1, 0, 0], 
			[0, 1, 0, 0], 
			[0, 1, 0, 0]
		]);
		ballModel.generateBalls(3);
		assert.deepEqual(ballModel.getNextBalls(), [
			[0, 0, 0, 0], 
			[0, 1, 1, 0], 
			[0, 1, 1, 0], 
			[0, 0, 0, 0]
		]);
		ballModel.generateBalls(4);
		assert.deepEqual(ballModel.getNextBalls(), [
			[0, 0, 0, 0], 
			[0, 1, 1, 0], 
			[1, 1, 0, 0], 
			[0, 0, 0, 0]
		]);
		ballModel.generateBalls(5);
		assert.deepEqual(ballModel.getNextBalls(), [
			[0, 0, 0, 0], 
			[1, 1, 0, 0], 
			[0, 1, 1, 0], 
			[0, 0, 0, 0]
		]);
	});

	it("カレントのボールを持っている", function() {
		ballModel.generateBalls(3);
		ballModel.moveNext();
		assert.deepEqual(ballModel.getCurrentBalls(), [
			[0, 0, 0, 0], 
			[0, 1, 1, 0], 
			[0, 1, 1, 0], 
			[0, 0, 0, 0]
		]);
	});

	it("ネクストのボールを持っている", function() {
		ballModel.generateBalls(2);
		assert.deepEqual(ballModel.getNextBalls(), [
			[0, 1, 0, 0], 
			[0, 1, 0, 0], 
			[0, 1, 0, 0], 
			[0, 1, 0, 0]
		]);
	});

	it("配置用のボードを持っている", function() {
		assert.equal(ballModel.currentBoard.length, 10);
		assert.equal(ballModel.currentBoard[0].length, 10);
	});

	it("配置用のボードをリセットできる", function() {
		ballModel.resetCurrentBoard();
		assert.deepEqual(ballModel.currentBoard, [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0]
		]);
	});

	it("カレントのボールをネクストに移せる", function() {
		ballModel.generateBalls(1);
		ballModel.moveNext();
		assert.deepEqual(ballModel.getCurrentBalls(), [
			[0, 0, 1, 0], 
			[0, 0, 1, 0], 
			[0, 1, 1, 0], 
			[0, 0, 0, 0]
		]);
	});

	it("カレントのボールを配置用のボードに移せる", function() {
		ballModel.generateBalls(1);
		ballModel.moveNext();
		ballModel.deployBalls(3, 0);
		assert.deepEqual(ballModel.getCurrentBoard(), [
			[0, 0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 1, 1, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0]
		]);
	});

	it("ボールを回転できる", function() {
		// todo: 衝突判定のテストを書く
		ballModel.generateBalls(0);
		ballModel.moveNext();
		ballModel.rollBalls();
		assert.deepEqual(ballModel.getCurrentBalls(), [
			[0, 0, 0, 0],
			[1, 1, 1, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 0]
		]);
	});

	it("ボールを一気に落とせる", function() {
		// todo: 衝突判定のテストを書く
		ballModel.generateBalls(5);
		ballModel.moveNext();
		ballModel.dropBalls(4);
		assert.equal(ballModel.getCurrentBoard(), [
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
		// todo: 衝突判定のテストを書く
		ballModel.generateBalls(4);
		ballModel.moveNext();
		ballModel.dropOneBalls(4);
		assert.equal(ballModel.getCurrentBoard(), [
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