function ballModel() {
	var self = this;

	this.init = function() {
		for(var i=0; i<10; i++) {
			self.currentBoard.push([]);
			for(var j=0; j<10; j++) {
				self.currentBoard[i].push(-1);
			}
		}
	}

	this.currentBalls = [];
	this.nextBalls = [];
	this.currentBoard = [];
	this.currentX = 0;
	this.currentY = 0;

	this.generateBalls = function(type) {
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
		return self.currentBalls;
	}

	this.getCurrentBoard = function() {
		return self.currentBoard;
	}

	this.resetCurrentBoard = function() {
		for(var i=0; i<10; i++) {
			for(var j=0; j<10; j++) {
				self.currentBoard[i][j] = -1;
			}
		}
	}

	this.getNextBalls = function() {
		return self.nextBalls;
	}

	this.moveNext = function() {
		self.currentBalls = self.nextBalls;
		self.nextBalls = self.generateBalls(Math.floor(Math.random() * 5));
		self.deployBalls(3, 0);
	}

	this.rollBalls = function(board) {
		var tmpBalls = [];
		var flg = 1;
		
		for(var i=0; i<self.currentBalls.length; i++) {
			tmpBalls.push([]);
			for(var j=0; j<self.currentBalls[i].length; j++) {
				tmpBalls[i].push(-1);
			}
		}
		
		for(var i=0; i<self.currentBalls.length; i++) {	
			for(var j=0; j<self.currentBalls[i].length; j++) {
				tmpBalls[i][j] = self.currentBalls[j][i];
			}
		}
		
		for(var i=0; i<tmpBalls.length; i++) {
			for(var j=0; j<tmpBalls[i].length; j++) {
				if(board[j+self.currentY][i+self.currentX] != -1) flg = 0;
			}
		}

		if(flg) self.currentBalls = tmpBalls;
	}

	this.deployBalls = function(x, y) {
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
		var tmpBoard = [];
		var tmpY = self.currentY + 1;
		
		for(var i=0; i<board.length; i++) {
			tmpBoard.push([]);
			for(var j=0; j<board[i].length; j++) {
				tmpBoard[i].push(-1);
			}
		}
		
		if(self.getCurrentBoard().length - (tmpY + self.getCurrentBalls().length) > 0) {
			for(var i=0; i<self.getCurrentBalls().length; i++) {
				for(var j=0; j<self.getCurrentBalls()[i].length; j++) {
					tmpBoard[j+tmpY][i+self.currentX] = self.getCurrentBalls()[j][i];
				}
			}
		} else {
			for(var i=0; i<(self.getCurrentBoard().length - tmpY); i++) {
				for(var j=0; j<self.getCurrentBalls()[i].length; j++) {
					tmpBoard[i+tmpY][j+self.currentX] = self.getCurrentBalls()[i][j];
				}
			}
		}
		
		var flg = 1;
		for(var i=0; i<tmpBoard.length; i++) {
			for(var j=0; j<tmpBoard[i].length; j++) {
				if(tmpBoard[j][i] != -1 && board[j][i] != -1) flg = 0; 
			}
		}
		if(flg) {
			self.deployBalls(self.currentX, tmpY);
			return 1;
		} else {
			//self.collisionBalls();
			return 0;
		} 
	}

	this.dropAllBalls = function(board) {
		var flg = self.dropOneBalls(board);
		while(1) {
			if(flg) flg = self.dropOneBalls(board);
			else break;
		}
	}

	this.collisionBalls = function(board) {

	}
}

module.exports = ballModel;
