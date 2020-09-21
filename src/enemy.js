
const MovingObject = require("./moving_object");

class Enemy extends MovingObject{
	constructor(options) {
		super(options);
		
		this.directionDuration = 10;
		this.directionCount = 0;
		this.deltaX = 0;
		this.deltaY = 0;
		this.hitPoints = 2;
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
			this.drawSpeechBubble(ctx, 
				{ x: this.pos[0] + 60, y: this.pos[1]-10}, 60, 20, 
				{ x: this.pos[0] +10, y: this.pos[1] + 5 });

			this.drawText(ctx, this.pos[0] + 60, this.pos[1] -5, "Bully!", 14)
		}
	}

	drawSpeechBubble(ctx, center, width, height, speaker) {
		const top = { x: center.x, y: center.y - height / 2 };
		const left = { x: center.x - width / 2, y: center.y }
		const right = { x: center.x + width / 2, y: center.y }
		const bottom = { x: center.x, y: center.y + height / 2 }

		ctx.fillStyle = "white";

		ctx.beginPath();
		ctx.moveTo(top.x, top.y);

		// quadraticCurveTo(cp1x, cp1y, x, y) cp1 is control point
		ctx.quadraticCurveTo(left.x, top.y, left.x, left.y); // top to left
		ctx.quadraticCurveTo(left.x, bottom.y, bottom.x, bottom.y); // left to bottom
		ctx.quadraticCurveTo(right.x, bottom.y, right.x, right.y); // to right
		ctx.quadraticCurveTo(right.x, top.y, top.x, top.y); // to top
		ctx.fill();

		// triange to speaker
		ctx.beginPath();
		ctx.moveTo(center.x - 10, center.y);
		ctx.lineTo(speaker.x, speaker.y);
		ctx.lineTo(center.x + 10, center.y);
		ctx.fill();
	}


	drawText(ctx, x, y, message, size = 16) {
		ctx.fillStyle = "black";
		ctx.font = size + "px ComicRelief";
		ctx.fillText(message, x, y);
	}

}



module.exports = Enemy;
