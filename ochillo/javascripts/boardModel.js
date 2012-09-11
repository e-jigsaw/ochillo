var Black = 0;
var White = 1;
var Wall  = 9;
var Empty = -1;

function boardModel() {
	var self = this;

	this.state = []; // ボードの状態配列

	this.init = function() {
		// ボードの状態初期化
		// 3辺を壁に、残りを空に
		for(var i=0; i<=9; i++) {
			self.state.push([]);
			for(var j=0; j<=9; j++) {
				if(i == 0) {
					self.state[i].push(Empty);
				} else {
					if(j == 0 || j == 9 || i == 9) self.state[i].push(Wall);
					else self.state[i].push(Empty);
				}
			}
		}
	}

	this.set = function(x, y, ball) {
		self.state[y][x] = ball;
	}

	this.get = function(x, y) {
		if(x === undefined && y === undefined) return self.state;
		else return self.state[y][x];
	}

	this.check = function(x, y, ball) {
		var queue = [];
		// 8方向に探索、同じもしくは空、壁だったら探索終了
		if(self.get(x-1, y-1) == !ball) self.searchBalls(x-1, y-1, ball, 0, queue);
		if(self.get(x,   y-1) == !ball) self.searchBalls(x,   y-1, ball, 1, queue);
		if(self.get(x+1, y-1) == !ball) self.searchBalls(x+1, y-1, ball, 2, queue);
		if(self.get(x-1, y  ) == !ball) self.searchBalls(x-1, y,   ball, 3, queue);
		if(self.get(x+1, y  ) == !ball) self.searchBalls(x+1, y,   ball, 4, queue);
		if(self.get(x-1, y+1) == !ball) self.searchBalls(x-1, y+1, ball, 5, queue);
		if(self.get(x,   y+1) == !ball) self.searchBalls(x,   y+1, ball, 6, queue);
		if(self.get(x+1, y+1) == !ball) self.searchBalls(x+1, y+1, ball, 7, queue);
	}

	this.searchBalls = function (x, y, ball, flg, queue) {
		// もし違う玉が続いていたら探索続行
		// 壁か空なら探索終了
		// 自分の玉ならひっくり返す
		queue.push([x, y]);
		switch(flg) {
			case 0:
				if(     self.get(x-1, y-1) == !ball) arguments.callee(x-1, y-1, ball, 0, queue);
				else if(self.get(x-1, y-1) == ball)  self.reverseBalls(queue, ball);
				else return 0;
				break;
			case 1:
				if(     self.get(x,   y-1) == !ball) arguments.callee(x,   y-1, ball, 1, queue);
				else if(self.get(x,   y-1) == ball)  self.reverseBalls(queue, ball);
				else return 0;
				break;
			case 2:
				if(     self.get(x+1, y-1) == !ball) arguments.callee(x+1, y-1, ball, 2, queue);
				else if(self.get(x+1, y-1) == ball)  self.reverseBalls(queue, ball);
				else return 0;
				break;
			case 3:
				if(     self.get(x-1, y  ) == !ball) arguments.callee(x-1, y  , ball, 3, queue);
				else if(self.get(x-1, y-1) == ball)  self.reverseBalls(queue, ball);
				else return 0;
				break;
			case 4:
				if(     self.get(x+1, y  ) == !ball) arguments.callee(x+1, y  , ball, 4, queue);
				else if(self.get(x+1, y  ) == ball)  self.reverseBalls(queue, ball);
				else return 0;
				break;
			case 5:
				if(     self.get(x-1, y+1) == !ball) arguments.callee(x-1, y+1, ball, 5, queue);
				else if(self.get(x-1, y+1) == ball)  self.reverseBalls(queue, ball);
				else return 0;
				break;
			case 6:
				if(     self.get(x,   y+1) == !ball) arguments.callee(x,   y+1, ball, 6, queue);
				else if(self.get(x,   y+1) == ball)  self.reverseBalls(queue, ball);
				else return 0;
				break;
			case 7:
				if(     self.get(x+1, y+1) == !ball) arguments.callee(x-1, y-1, ball, 7, queue);
				else if(self.get(x+1, y+1) == ball)  self.reverseBalls(queue, ball);
				else return 0;
				break;
		}
	}

	this.reverseBalls = function(queue, ball) {
		// キューをひっくり返す処理
		for(var i in queue) {
			self.set(queue[i][0], queue[i][1], ball);
		}
	}
}
