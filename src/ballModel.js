function ballModel() {
	var self = this;

	this.init = function() {

	}

	this.currentBalls = [];
	this.nextBalls = [];

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
}

module.exports = ballModel;
