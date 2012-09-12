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
		// 指定座標にボールをセットする
		if(y === undefined && ball === undefined) {
			for(var i=0; i<x.length; i++) {
				for(var j=0; j<x[i].length; j++) {
					arguments.callee(i, j, x[j][i]);
				}
			}
		} else self.state[y][x] = ball;
	}

	this.get = function(x, y) {
		// 指定された座標の玉を返す
		// 何も引数がなかったら全体を返す
		if(x === undefined && y === undefined) return self.state;
		else return self.state[y][x];
	}

	this.check = function(queue, ball) {
		var fullQueue = [];
		for(var i=0; i<queue.length; i++) {
			// 8方向に探索、同じもしくは空、壁だったら探索終了
			if(self.get(queue[i][1]-1, queue[i][0]-1) == !ball) fullQueue.push(self.searchBalls(queue[i][1]-1, queue[i][0]-1, ball, 0, []));
			if(self.get(queue[i][1],   queue[i][0]-1) == !ball) fullQueue.push(self.searchBalls(queue[i][1],   queue[i][0]-1, ball, 1, []));
			if(self.get(queue[i][1]+1, queue[i][0]-1) == !ball) fullQueue.push(self.searchBalls(queue[i][1]+1, queue[i][0]-1, ball, 2, []));
			if(self.get(queue[i][1]-1, queue[i][0]  ) == !ball) fullQueue.push(self.searchBalls(queue[i][1]-1, queue[i][0],   ball, 3, []));
			if(self.get(queue[i][1]+1, queue[i][0]  ) == !ball) fullQueue.push(self.searchBalls(queue[i][1]+1, queue[i][0],   ball, 4, []));
			if(self.get(queue[i][1]-1, queue[i][0]+1) == !ball) fullQueue.push(self.searchBalls(queue[i][1]-1, queue[i][0]+1, ball, 5, []));
			if(self.get(queue[i][1],   queue[i][0]+1) == !ball) fullQueue.push(self.searchBalls(queue[i][1],   queue[i][0]+1, ball, 6, []));
			if(self.get(queue[i][1]+1, queue[i][0]+1) == !ball) fullQueue.push(self.searchBalls(queue[i][1]+1, queue[i][0]+1, ball, 7, []));
		}
		self.reverseBalls(fullQueue, ball);
	}

	this.searchBalls = function (x, y, ball, flg, queue) {
		// もし違う玉が続いていたら探索続行
		// 壁か空なら探索終了
		// 自分の玉ならひっくり返す

		// todo: return queue の条件判定文がおかしいとおもう
		queue.push([x, y]);
		console.log(x, y, queue);
		switch(flg) {
			case 0:
				if(     self.get(x-1, y-1) == !ball) return arguments.callee(x-1, y-1, ball, flg, queue);
				else if(self.get(x-1, y-1) == ball)  return queue;
				else return 0;
				break;
			case 1:
				if(     self.get(x,   y-1) == !ball) return arguments.callee(x,   y-1, ball, flg, queue);
				else if(self.get(x,   y-1) == ball)  return queue;
				else return 0;
				break;
			case 2:
				if(     self.get(x+1, y-1) == !ball) return arguments.callee(x+1, y-1, ball, flg, queue);
				else if(self.get(x+1, y-1) == ball)  return queue;
				else return 0;
				break;
			case 3:
				if(     self.get(x-1, y  ) == !ball) return arguments.callee(x-1, y  , ball, flg, queue);
				else if(self.get(x-1, y  ) == ball)  return queue;
				else return 0;
				break;
			case 4:
				if(     self.get(x+1, y  ) == !ball) return arguments.callee(x+1, y  , ball, flg, queue);
				else if(self.get(x+1, y  ) == ball)  return queue;
				else return 0;
				break;
			case 5:
				if(     self.get(x-1, y+1) == !ball) return arguments.callee(x-1, y+1, ball, flg, queue);
				else if(self.get(x-1, y+1) == ball)  return queue;
				else return 0;
				break;
			case 6:
				if(     self.get(x,   y+1) == !ball) return arguments.callee(x,   y+1, ball, flg, queue);
				else if(self.get(x,   y+1) == ball)  return queue;
				else return 0;
				break;
			case 7:
				if(     self.get(x+1, y+1) == !ball) return arguments.callee(x-1, y-1, ball, flg, queue);
				else if(self.get(x+1, y+1) == ball)  return queue;
				else return 0;
				break;
		}
	}

	this.reverseBalls = function(queue, ball) {
		// キューをひっくり返す処理
		console.log(queue);
		for(var i=0; i<queue.length; i++) {
			for(var j=0; j<queue[i].length; j++) {
				self.set(queue[i][j][0], queue[i][j][1], ball);
			}
		}
	}

	this.countWhite = function() {
		// 白の個数を返す
		return self.count(White);
	}

	this.countBlack = function() {
		// 黒の個数を返す
		return self.count(Black);
	}

	this.count = function(type) {
		// 指定された色の玉数を数える
		// ユーティリティ用
		var count = 0;
		for(var i=0; i<self.get().length; i++) {
			for(var j=0; j<self.get()[i].length; j++) {
				if(self.get()[i][j] == type) count += 1;
			}
		}
		return count;
	}
}

module.exports = boardModel;
