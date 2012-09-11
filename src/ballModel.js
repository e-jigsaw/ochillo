function ballModel() {
	var self = this;
	// 初期処理
	this.init = function() {
		// 現在の仮ボードを初期化
		for(var i=0; i<10; i++) {
			self.currentBoard.push([]);
			for(var j=0; j<10; j++) {
				self.currentBoard[i].push(-1);
			}
		}
	}

	// ballModel の変数群
	this.currentBalls = [];
	this.nextBalls = [];
	this.currentBoard = [];
	this.currentX = 0;
	this.currentY = 0;

	this.generateBalls = function(type) {
		// 引数に応じて落とすボール群を生成する
		switch(type) {
			case 0:
				self.nextBalls = [
					[-1,  1, -1, -1], 
					[-1,  1, -1, -1], 
					[-1,  1,  1, -1], 
					[-1, -1, -1, -1]
				];
				break;
			case 1:
				self.nextBalls = [
					[-1, -1,  1, -1], 
					[-1, -1,  1, -1], 
					[-1,  1,  1, -1], 
					[-1, -1, -1, -1]
				];
				break;
			case 2:
				self.nextBalls = [
					[-1,  1, -1, -1], 
					[-1,  1, -1, -1], 
					[-1,  1, -1, -1], 
					[-1,  1, -1, -1]
				];
				break;
			case 3:
				self.nextBalls = [
					[-1,  1,  1, -1], 
					[-1,  1,  1, -1], 
					[-1, -1, -1, -1], 
					[-1, -1, -1, -1]
				];
				break;
			case 4:
				self.nextBalls = [
					[-1,  1,  1, -1], 
					[ 1,  1, -1, -1], 
					[-1, -1, -1, -1], 
					[-1, -1, -1, -1]
				];
				break;
			case 5:
				self.nextBalls = [
					[ 1,  1, -1, -1],
					[-1,  1,  1, -1],
					[-1, -1, -1, -1],
					[-1, -1, -1, -1]
				];
				break;
		}
	}

	this.getCurrentBalls = function() {
		// 現在の落とすボール群を返す
		return self.currentBalls;
	}

	this.getCurrentBoard = function() {
		// 現在の仮ボードの状態を返す
		return self.currentBoard;
	}

	this.resetCurrentBoard = function() {
		// 仮ボードをリセットする。ユーティリティ用	
		for(var i=0; i<10; i++) {
			for(var j=0; j<10; j++) {
				self.currentBoard[i][j] = -1;
			}
		}
	}

	this.getNextBalls = function() {
		// 次のボール群を返す
		return self.nextBalls;
	}

	this.moveNext = function() {
		// 次のボールを現在のボールに移し、それを仮ボードに反映させる
		self.currentBalls = self.nextBalls;
		self.nextBalls = self.generateBalls(Math.floor(Math.random() * 5));
		self.deployBalls(3, 0);
	}

	this.rollBalls = function(board) {
		// ボールの回転メソッド
		var tmpBalls = [];
		var flg = 1;
		
		// メソッド内の仮ボードの初期化
		for(var i=0; i<self.currentBalls.length; i++) {
			tmpBalls.push([]);
			for(var j=0; j<self.currentBalls[i].length; j++) {
				tmpBalls[i].push(-1);
			}
		}
		
		// メソッド内の仮ボードに回転した状態のボール群を反映させる
		for(var i=0; i<self.currentBalls.length; i++) {	
			for(var j=0; j<self.currentBalls[i].length; j++) {
				tmpBalls[i][j] = self.currentBalls[j][i];
			}
		}
		
		// メソッド内の仮ボードと現在のマスターボードを比較し、衝突がなかったらフラグは立ったまま
		for(var i=0; i<tmpBalls.length; i++) {
			for(var j=0; j<tmpBalls[i].length; j++) {
				if(board[j+self.currentY][i+self.currentX] != -1) flg = 0;
			}
		}

		if(flg) {
			self.currentBalls = tmpBalls;
			return 1;
		} else {
			return 0;
		}
	}

	this.moveRight = function(board) {
		// 左に動かす処理
		return self.move(board, self.currentX+1, self.currentY);
	}

	this.moveLeft = function(board) {
		// 右に動かす処理
		return self.move(board, self.currentX-1, self.currentY);
	}

	this.move = function(board, x, y) {
		var tmpBoard = [];
		// メソッド内の仮ボードの初期化
		for(var i=0; i<board.length; i++) {
			tmpBoard.push([]);
			for(var j=0; j<board[i].length; j++) {
				tmpBoard[i].push(-1);
			}
		}

		// メソッド内仮ボードに現在のボール群を移す
		for(var i=0; i<self.getCurrentBalls().length; i++) {
			for(var j=0; j<self.getCurrentBalls()[i].length; j++) {
				if(self.getCurrentBalls()[j][i] != -1) tmpBoard[j+y][i+x] = self.getCurrentBalls()[j][i];
			}
		}

		var flg = 1;
		for(var i=0; i<tmpBoard.length; i++) {
			for(var j=0; j<tmpBoard[i].length; j++) {
				if(tmpBoard[j][i] != -1 && board[j][i] != -1) flg = 0;
			}
		}

		// もし衝突がなかったらデプロイ業
		if(flg) {
			self.deployBalls(x, y);
			return 1;
		} else {
			return 0;
		}
	}

	this.deployBalls = function(x, y) {
		// ボールを仮ボードに反映させるメソッド。ユーティリティ用
		self.currentX = x;
		self.currentY = y;
		self.resetCurrentBoard();

		for(var i=0; i<self.getCurrentBalls().length; i++) {
			for(var j=0; j<self.getCurrentBalls()[i].length; j++) {
				if(self.getCurrentBalls()[j][i] != -1) self.getCurrentBoard()[j+y][i+x] = self.getCurrentBalls()[j][i];
			}
		}
	}

	this.dropOneBalls = function(board) {
		// ボール群をひとつ下に落とす
		var tmpBoard = [];
		var tmpY = self.currentY + 1;
		
		// メソッド内の仮ボードの初期化
		for(var i=0; i<board.length; i++) {
			tmpBoard.push([]);
			for(var j=0; j<board[i].length; j++) {
				tmpBoard[i].push(-1);
			}
		}
		
		// 仮のy座標とボール群の座標がボードの大きさを超えていないか判断する
		if(self.getCurrentBoard().length - (tmpY + self.getCurrentBalls().length) > 0) {
			// 超えていなければ仮ボードに反映させる
			for(var i=0; i<self.getCurrentBalls().length; i++) {
				for(var j=0; j<self.getCurrentBalls()[i].length; j++) {
					tmpBoard[j+tmpY][i+self.currentX] = self.getCurrentBalls()[j][i];
				}
			}
		} else {
			// 超えていたら下部を切り捨てて反映させる
			for(var i=0; i<(self.getCurrentBoard().length - tmpY); i++) {
				for(var j=0; j<self.getCurrentBalls()[i].length; j++) {
					tmpBoard[i+tmpY][j+self.currentX] = self.getCurrentBalls()[i][j];
				}
			}
		}
		
		// メソッド内の仮ボードとマスターボードを比較し衝突判定をする
		var flg = 1;
		for(var i=0; i<tmpBoard.length; i++) {
			for(var j=0; j<tmpBoard[i].length; j++) {
				if(tmpBoard[j][i] != -1 && board[j][i] != -1) flg = 0; 
			}
		}

		// もし衝突していたら仮ボードにデプロイ、衝突していたら衝突ルーチンに入る
		if(flg) {
			self.deployBalls(self.currentX, tmpY);
			return 1;
		} else {
			self.collisionBalls(board);
			return 0;
		} 
	}

	this.dropAllBalls = function(board) {
		// ボールを一気に落とす
		var flg = self.dropOneBalls(board);

		// ひとつ落とせたら再帰的にもうひとつ落とす。衝突ルーチンに入ったらブレイク
		while(1) {
			if(flg) flg = self.dropOneBalls(board);
			else break;
		}
	}

	this.collisionBalls = function(board) {
		// 衝突ルーチン
		var flg = 0;

		// 仮ボードにマスターボードの状態を反映させる
		for(var i=0; i<board.length; i++) {
			for(var j=0; j<board[i].length; j++) {
				if(board[i][j] != -1) self.currentBoard[i][j] = board[i][j];
			}
		}

		// 4つ全てのボールが空以外になるまで繰り返す
		while(1) {
			for(var i=self.getCurrentBoard().length-2; i>=0; i--) {
				for(var j=0; j<self.getCurrentBoard()[i].length; j++) {
					if(self.getCurrentBoard()[i][j] != -1 && self.getCurrentBoard()[i+1][j] == -1) {
						self.getCurrentBoard()[i+1][j] = self.getCurrentBoard()[i][j];
						self.getCurrentBoard()[i][j] = -1;
					} else if(self.getCurrentBoard()[i][j] != -1 && self.getCurrentBoard()[i][j] != 9 && self.getCurrentBoard()[i+1][j] != -1) flg += 1; 
				}
			}
			if(flg >= 4) break;
		}
	}
}

module.exports = ballModel;
