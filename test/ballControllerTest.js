var assert = require("assert");

describe("ボールコントローラは", function() {
	var BallController = reqire("../src/ballController");

	var ballController = new BallController();

	before(function(done) {
		done();
	});

	it("任意の玉のブロックを作ることができる");

	it("玉のブロックをレーンを指定してを落とすことができる", function() {
		ballController.createBalls();

	});
});
