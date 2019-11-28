
const MovingObject = require("./moving_object");

class Enemy extends MovingObject{
	constructor(options) {
		super(options);
		
		this.directionDuration = 10;
		this.directionCount = 0;
		this.deltaX = 0;
		this.deltaY = 0;
		this.hitPoints = 2;

	}


	move(timeDelta) {
		if (this.directionCount === this.directionDuration ||
				this.deltaX === 0 && this.deltaY === 0) {
	  	this.deltaX =  2*(Math.floor(Math.random() * 3) - 1);
			this.deltaY =  2*(Math.floor(Math.random() * 3) - 1);
			this.directionCount = 0;
		} else this.directionCount++;
	
		const newX = this.pos[0] + this.deltaX
		const newY = this.pos[1] + this.deltaY

		if (this.map.checkBounds(newX, newY)) {
			this.pos[0] = newX;
			this.pos[1] = newY;
		} else this.directionCount = 10;
	}

	center() {
		return [this.pos[0] + 15, this.pos[1] + 15];
	}
}



module.exports = Enemy;
