var Black = 0;
var White = 1;
var Wall  = 9;
var Empty = -1;

function boardModel() {
	var self = this;

	this.state = [];

	this.init = function() {
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
		self.state[x][y] = ball;
	}

	this.get = function(x, y) {
		return self.state[x][y];
	}

	this.check = function(x, y, ball) {
		self.searchBalls(x, y, ball, false, []);
	}

	this.searchBalls = function (x, y, ball, flg, queue) {
		if(!flg) {
			// 8方向に探索、同じもしくは空、壁だったら探索終了
			if(self.get(x-1, y-1) == ball || self.get(x-1, y-1) == Empty || self.get(x-1, y-1) == Wall) return 0;
			else arguments.callee(x-1, y-1, ball, true, queue.push([x, y]));
			if(self.get(x, y-1) == ball || self.get(x, y-1) == Empty || self.get(x, y-1) == Wall) return 0;
			else arguments.callee(x, y-1, ball, true, queue.push([x, y]));
			if(self.get(x+1, y-1) == ball || self.get(x+1, y-1) == Empty || self.get(x+1, y-1) == Wall) return 0;
			else arguments.callee(x+1, y-1, ball, true, queue.push([x, y]));
			if(self.get(x-1, y) == ball || self.get(x-1, y) == Empty || self.get(x-1, y) == Wall) return 0;
			else arguments.callee(x-1, y, ball, true, queue.push([x, y]));
			if(self.get(x+1, y) == ball || self.get(x+1, y) == Empty || self.get(x+1, y) == Wall) return 0;
			else arguments.callee(x+1, y, ball, true, queue.push([x, y]));
			if(self.get(x-1, y+1) == ball || self.get(x-1, y+1) == Empty || self.get(x-1, y+1) == Wall) return 0;
			else arguments.callee(x-1, y+1, ball, true, queue.push([x, y]));
			if(self.get(x, y+1) == ball || self.get(x, y+1) == Empty || self.get(x, y+1) == Wall) return 0;
			else arguments.callee(x, y+1, ball, true, queue.push([x, y]));
			if(self.get(x+1, y+1) == ball || self.get(x+1, y+1) == Empty || self.get(x+1, y+1) == Wall) return 0;
			else arguments.callee(x+1, y+1, ball, true, queue.push([x, y]));
		} else {
			// 8方向に探索、空、壁だったら探索終了
			// 違う玉なら探索続行
			if(self.get(x-1, y-1) == Empty || self.get(x-1, y-1) == Wall) return 0;
			else if(self.get(x-1, y-1) == !ball) arguments.callee(x-1, y-1, ball, true, queue.push([x, y]));
			if(self.get(x, y-1) == Empty || self.get(x, y-1) == Wall) return 0;
			else if(self.get(x, y-1) == !ball) arguments.callee(x, y-1, ball, true, queue.push([x, y]));
			if(self.get(x+1, y-1) == Empty || self.get(x+1, y-1) == Wall) return 0;
			else if(self.get(x+1, y-1) == !ball) arguments.callee(x+1, y-1, ball, true, queue.push([x, y]));
			if(self.get(x-1, y) == Empty || self.get(x-1, y) == Wall) return 0;
			else if(self.get(x-1, y) == !ball) arguments.callee(x-1, y, ball, true, queue.push([x, y]));
			if(self.get(x+1, y) == Empty || self.get(x+1, y) == Wall) return 0;
			else if(self.get(x+1, y) == !ball) arguments.callee(x+1, y, ball, true, queue.push([x, y]));
			if(self.get(x-1, y+1) == Empty || self.get(x-1, y+1) == Wall) return 0;
			else if(self.get(x-1, y+1) == !ball) arguments.callee(x-1, y+1, ball, true, queue.push([x, y]));
			if(self.get(x, y+1) == Empty || self.get(x, y+1) == Wall) return 0;
			else if(self.get(x, y+1) == !ball) arguments.callee(x, y+1, ball, true, queue.push([x, y]));
			if(self.get(x+1, y+1) == Empty || self.get(x+1, y+1) == Wall) return 0;
			else if(self.get(x+1, y+1) == !ball) arguments.callee(x+1, y+1, ball, true, queue.push([x, y]));
		}
		// キューをひっくり返す処理
		for(var i in queue) {
			self.set(queue[i][0], queue[i][1], ball);
		}
	}
}

module.exports = boardModel;
