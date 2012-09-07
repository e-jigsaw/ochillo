function ballModel() {
	var self = this;

	this.init = function() {
		for(var i=0; i<10; i++) {
			self.currentBoard.push([]);
			for(var j=0; j<10; j++) {
				self.currentBoard[i].push(0);
			}
		}
	}

	this.currentBalls = [];
	this.nextBalls = [];
	this.currentBoard = [];

	this.generateBalls = function(type) {
		switch(type) {
			case 0:
				self.nextBalls = [
					[0, 1, 0, 0], 
					[0, 1, 0, 0], 
					[0, 1, 1, 0], 
					[0, 0, 0, 0]
				];
				break;
			case 1:
				self.nextBalls = [
					[0, 0, 1, 0], 
					[0, 0, 1, 0], 
					[0, 1, 1, 0], 
					[0, 0, 0, 0]
				];
				break;
			case 2:
				self.nextBalls = [
					[0, 1, 0, 0], 
					[0, 1, 0, 0], 
					[0, 1, 0, 0], 
					[0, 1, 0, 0]
				];
				break;
			case 3:
				self.nextBalls = [
					[0, 0, 0, 0], 
					[0, 1, 1, 0], 
					[0, 1, 1, 0], 
					[0, 0, 0, 0]
				];
				break;
			case 4:
				self.nextBalls = [
					[0, 0, 0, 0], 
					[0, 1, 1, 0], 
					[1, 1, 0, 0], 
					[0, 0, 0, 0]
				];
				break;
			case 5:
				self.nextBalls = [
					[0, 0, 0, 0],
					[1, 1, 0, 0],
					[0, 1, 1, 0],
					[0, 0, 0, 0]
				];
				break;
		}
	}

	this.getCurrentBalls = function() {
		return self.currentBalls;
	}

	this.getNextBalls = function() {
		return self.nextBalls;
	}

	this.moveNext = function() {
		self.currentBalls = self.nextBalls;
		self.nextBalls = self.generateBalls(Math.floor(Math.random() * 5));
	}

	this.rollBalls = function() {
		var tmpBalls = [];
		for(var i=0; i<self.currentBalls.length; i++) {
			tmpBalls.push([]);
			for(var j=0; j<self.currentBalls[i].length; j++) {
				tmpBalls[i].push(0);
			}
		}
		for(var i=0; i<self.currentBalls.length; i++) {	
			for(var j=0; j<self.currentBalls[i].length; j++) {
				tmpBalls[i][j] = self.currentBalls[j][i];
			}
		}
		self.currentBalls = tmpBalls;
	}
}

module.exports = ballModel;
