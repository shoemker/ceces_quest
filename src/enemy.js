
const MovingObject = require("./moving_object");
const Utils = require("./utils");


class Enemy extends MovingObject{
	constructor(options) {
		super(options);
		
		this.directionDuration = 10;
		this.directionCount = 0;
		this.deltaX = 0;
		this.deltaY = 0;
		this.hitPoints = 1;
		this.bullyCounter = Math.floor((Math.random() * 40) + 1);

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


	drawObject(ctx) {
		if (this.bullyCounter > 30) this.bullyCounter = 0;
		else this.bullyCounter++;

		if (this.bullyCounter > 20) {
			Utils.drawSpeechBubble(ctx, 
				{ x: this.pos[0] + 60, y: this.pos[1]-10}, 60, 20, 
				{ x: this.pos[0] +10, y: this.pos[1] + 5 });

			Utils.drawText(ctx, this.pos[0] + 60, this.pos[1] -5, "Bully!", 14)
		}
	}

}



module.exports = Enemy;
