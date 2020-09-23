const MovingObject = require("./moving_object");
const Utils = require("./utils");

class CeCe extends MovingObject {

	constructor(ctx) {
		super({pos:[600,110], radius:15})
		this.height = 40;
		this.width = 32;
		this.radius = 15
		this.ctx = ctx;
		this.unlockFireball = true;

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
	fireballUnlocked() { return this.unlockFireball; };

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


		// console.log(this.direction + ", " + this.idx);

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

		// lets the attack animation stay for several cycles
		// and resets image at the end
		// if (this.direction >= 8) {
		// 	if (this.attackAnimationCount === this.maxCount) {

		// 		this.direction = this.directionHistory;
		// 		this.pos[0] = this.posHistory[0];
		// 		this.pos[1] = this.posHistory[1];

		// 		this.attackAnimationCount = 0
		// 		this.height = 30;
		// 		this.width = 30;
		// 	}
		// 	else {
		// 		this.attackAnimationCount++;

		// 	}
		// }
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

	// temporarily sets image to attack image
	// attack() {
	// 	if (this.attackAnimationCount === 0 && this.hitpoints > 0) {
	// 		this.directionHistory = this.direction;
	// 		this.posHistory[0] = this.pos[0];
	// 		this.posHistory[1] = this.pos[1];

	// 		// changes position and size to account for bigger attack image
	// 		if (this.direction === 0){
	// 			this.height = 1.8 * this.height;
	// 			this.pos[1] -= 24;
	// 		} else if (this.direction === 2) {
	// 			this.width = 1.8 * this.width;
	// 			this.pos[0] -= 24;
	// 		} else if (this.direction === 4) {
	// 			this.height = 1.8 * this.height;
	// 		} else if (this.direction === 6) {
	// 			this.width = 1.8 * this.width;
	// 		}

	// 		this.direction = this.direction/2 + 8;
	// 		this.idx = 0; 
	// 		this.swordTipPos();
	// 	}

	// }

	// loads all of the link images
	// loadImages() {

	// 	// north 'w'
	// 	this.lbu1 = new Image();
	// 	this.lbu1.onload = () => { return true; }
	// 	this.lbu1.src = './images/link/lbu1.png';
	// 	this.imageArray.push(this.lbu1);

	// 	this.lbu2 = new Image();
	// 	this.lbu2.onload = () => { return true; }
	// 	this.lbu2.src = './images/link/lbu2.png';
	// 	this.imageArray.push(this.lbu2);
	

	// 	// west 'a'
	// 	this.llu2 = new Image();
	// 	this.llu2.onload = () => { return true; }
	// 	this.llu2.src = './images/link/llu2.png';
	// 	this.imageArray.push(this.llu2);		

	// 	this.llu1 = new Image();
	// 	this.llu1.onload = () => { return true; }
	// 	this.llu1.src = './images/link/llu1.png';
	// 	this.imageArray.push(this.llu1);
		

	// 	// south 's'
	// 	this.lfu1 = new Image();
	// 	this.lfu1.onload = () => { return true; }
	// 	this.lfu1.src = './images/link/lfu1.png';
	// 	this.imageArray.push(this.lfu1);

	// 	this.lfu2 = new Image();
	// 	this.lfu2.onload = () => { return true; }
	// 	this.lfu2.src = './images/link/lfu2.png';
	// 	this.imageArray.push(this.lfu2);


	// 	// east 'd'
	// 	this.lru1 = new Image();
	// 	this.lru1.onload = () => { return true; }
	// 	this.lru1.src = './images/link/lru1.png';
	// 	this.imageArray.push(this.lru1);

	// 	this.lru2 = new Image();
	// 	this.lru2.onload = () => { return true; }
	// 	this.lru2.src = './images/link/lru2.png';
	// 	this.imageArray.push(this.lru2);
		

	// 	////////////////////////////////////////
	// 	// load attack animations
	// 	this.lba = new Image();
	// 	this.lba.onload = () => { return true; }
	// 	this.lba.src = './images/link/lba.png';
	// 	this.imageArray.push(this.lba);

	// 	this.lla = new Image();
	// 	this.lla.onload = () => { return true; }
	// 	this.lla.src = './images/link/lla.png';
	// 	this.imageArray.push(this.lla);
		
	// 	this.lfa = new Image();
	// 	this.lfa.onload = () => { return true; }
	// 	this.lfa.src = './images/link/lfa.png';
	// 	this.imageArray.push(this.lfa);

	// 	this.lra = new Image();
	// 	this.lra.onload = () => { return true; }
	// 	this.lra.src = './images/link/lra.png';
	// 	this.imageArray.push(this.lra);

	// 	this.linkOver = new Image();
	// 	this.linkOver.onload = () => { return true; }
	// 	this.linkOver.src = './images/link/link_aloft.png';
	// }
	
}

module.exports = CeCe;