const MovingObject = require("./moving_object");
const Utils = require("./utils");

class CeCe extends MovingObject {

	constructor() {
		super({pos:[600,110], radius:15})
		this.height = 40;
		this.width = 32;
		this.radius = 15

		this.fireball = false;

		this.imageArray = [];

		this.direction = 8;
		this.idx = 0;

		this.bullySpeech = false;

		this.directionHistory = [];
		this.posHistory=[];
		this.posHistory[0] = this.pos[0];
		this.posHistory[1] = this.pos[1];
		this.attackAnimationCount = 0;
		this.maxCount = 4;
		this.hitpoints = 8;
		this.rupees = 0;
		this.gameOver = false;
		this.map;
		this.cece_sheet = Utils.loadImg('./images/cece/rpg-maker-sprites-and-facial-expression-sets-3e26.png');
		this.cece_sheet_pos = 
			[[300,145], [332, 145], [365,145], [397, 145],
			[300,48],   [332, 48],  [365,48],  [397, 48],
			[300,0],    [332, 0],   [365,0],   [397, 0],
			[300,96],   [332, 96],  [365,96],  [397, 96]];
	}

	getDirection() { return this.direction; };
	activateBullySpeech() { this.bullySpeech = true; };
	fireballUnlocked() { return this.fireball; };
	unlockFireball() { this.fireball = true; };
	getPos() { return this.pos; };

	reduceHitPoints() {
		return this.hitpoints--;
	}

	center() {
 		return [this.pos[0] + 15, this.pos[1] + 15];
	}


	swordTipPos(){
		
			let center = this.center();
		
			if (this.direction === 0) {
				return [center[0]-3, center[1]-this.radius-1.6*this.radius];
			} else if (this.direction === 4) {
				return [center[0] -this.radius - 1.6 * this.radius, center[1]+2];
			} else if (this.direction === 8) {
				return [center[0]+1, center[1] + this.radius + 1.6 * this.radius];
			} else {
				return [center[0] + this.radius + 1.6 * this.radius, center[1] + 2];
			}
	
	}

	// switches image for walking animation
	switchImage() {
		if (this.idx === 3) this.idx = 0;
		else this.idx++;
	}
	

	drawObject(ctx, brighten) {

		if (brighten) ctx.filter = "brightness(170%)";
		else ctx.filter = "brightness(100%)";



		ctx.drawImage(this.cece_sheet,
			this.cece_sheet_pos[this.direction + this.idx][0],
			this.cece_sheet_pos[this.direction + this.idx][1],
			32,
			48,
			this.pos[0],
			this.pos[1],
			this.width,
			this.height);
			
		if (this.bullySpeech > 0) this.drawBullySpeech(ctx);

	};


	drawBullySpeech(ctx) {
		Utils.drawSpeechBubble(ctx,
			{ x: this.pos[0] - 60, y: this.pos[1] - 20}, 110, 95,
			{ x: this.pos[0] + 10, y: this.pos[1] + 10});


		Utils.drawText(ctx, this.pos[0] -60, this.pos[1] -35, "I want to fight");
		Utils.drawText(ctx, this.pos[0] - 60, this.pos[1] - 15, "but my fists");
		Utils.drawText(ctx, this.pos[0] - 60, this.pos[1] + 5, "are too small!");

	};


	move(deltaPos, opening) {
		if (!opening && this.bullySpeech) this.bullySpeech = false;

		if (this.attackAnimationCount === 0 && !opening && this.hitpoints > 0 && !this.gameOver) {
			this.moveOnce(deltaPos)
		}
	}

	moveOnce(deltaPos) {
		if (this.map.checkBounds(this.center()[0] + deltaPos[0], this.center()[1] + deltaPos[1])) {

			this.direction = 0;
			this.pos[0] += deltaPos[0];
			this.pos[1] += deltaPos[1];

			// sets direction for drawing image
			if (deltaPos[0] === 0 && deltaPos[1] < 0) this.direction = 0;
			else if (deltaPos[0] < 0 && deltaPos[1] === 0) this.direction = 4;
			else if (deltaPos[0] === 0 && deltaPos[1] > 0) this.direction = 8;
			else this.direction = 12;

			this.switchImage();	

		}
	}		

}

module.exports = CeCe;