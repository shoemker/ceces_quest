const MovingObject = require("./moving_object");


class Link extends MovingObject {

	constructor(ctx) {
		super({pos:[600,90], radius:15})
		this.height = 30;
		this.width = 30;
		this.radius = 15
		this.ctx = ctx;
		this.unlockFireball = false;

		this.imageArray = [];
		this.loadImages();

		this.direction = 4;
		this.idx = 0;

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
 
	}

	reduceHitPoints() {
		return this.hitpoints--;
	}

	center() {
		if (this.direction >= 8) {
			return [this.posHistory[0] + 15, this.posHistory[1] + 15]; 
		} else return [this.pos[0] + 15, this.pos[1] + 15];
	}


	swordTipPos(){
		if (this.direction >= 8) {

			let center = this.center();

			if (this.direction === 8) {
				return [center[0]-3, center[1]-this.radius-1.6*this.radius];
			} else if (this.direction === 9) {
				return [center[0] -this.radius - 1.6 * this.radius, center[1]+2];
			} else if (this.direction === 10) {
				return [center[0]+1, center[1] + this.radius + 1.6 * this.radius];
			} else {
				return [center[0] + this.radius + 1.6 * this.radius, center[1] + 2];
			}
		}
		else return null;
	}

	// switches image for walking animation
	switchImage() {
		if (this.idx === 0) this.idx = 1;
		else this.idx = 0
	}
	

	drawObject(ctx, brighten) {

		if (brighten) ctx.filter = "brightness(170%)";
		else ctx.filter = "brightness(100%)";

		// draws Link
		if (this.gameOver) {
			ctx.drawImage(this.linkOver,
										this.pos[0]-20,
										this.pos[1]-30,
										this.width+45,
										this.height+30);
		} else {

			ctx.drawImage(this.imageArray[this.direction + this.idx], 
									this.pos[0], 
									this.pos[1], 
									this.width, 
									this.height);
		}

		// lets the attack animation stay for several cycles
		// and resets image at the end
		if (this.direction >= 8) {
			if (this.attackAnimationCount === this.maxCount) {

				this.direction = this.directionHistory;
				this.pos[0] = this.posHistory[0];
				this.pos[1] = this.posHistory[1];

				this.attackAnimationCount = 0
				this.height = 30;
				this.width = 30;
			}
			else {
				this.attackAnimationCount++;

			}
		}
	}


	move(deltaPos, opening) {
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
			else if (deltaPos[0] < 0 && deltaPos[1] === 0) this.direction = 2;
			else if (deltaPos[0] === 0 && deltaPos[1] > 0) this.direction = 4;
			else this.direction = 6;

			this.switchImage();	
		}
	}		

	// temporarily sets image to attack image
	attack() {
		if (this.attackAnimationCount === 0 && this.hitpoints > 0) {
			this.directionHistory = this.direction;
			this.posHistory[0] = this.pos[0];
			this.posHistory[1] = this.pos[1];

			// changes position and size to account for bigger attack image
			if (this.direction === 0){
				this.height = 1.8 * this.height;
				this.pos[1] -= 24;
			} else if (this.direction === 2) {
				this.width = 1.8 * this.width;
				this.pos[0] -= 24;
			} else if (this.direction === 4) {
				this.height = 1.8 * this.height;
			} else if (this.direction === 6) {
				this.width = 1.8 * this.width;
			}

			this.direction = this.direction/2 + 8;
			this.idx = 0; 
			this.swordTipPos();
		}

	}

	// loads all of the link images
	loadImages() {
		// north 'w'
		this.lbu1 = new Image();
		this.lbu1.onload = () => { return true; }
		this.lbu1.src = './images/link/lbu1.png';
		this.imageArray.push(this.lbu1);

		this.lbu2 = new Image();
		this.lbu2.onload = () => { return true; }
		this.lbu2.src = './images/link/lbu2.png';
		this.imageArray.push(this.lbu2);
	

		// west 'a'
		this.llu2 = new Image();
		this.llu2.onload = () => { return true; }
		this.llu2.src = './images/link/llu2.png';
		this.imageArray.push(this.llu2);		

		this.llu1 = new Image();
		this.llu1.onload = () => { return true; }
		this.llu1.src = './images/link/llu1.png';
		this.imageArray.push(this.llu1);
		

		// south 's'
		this.lfu1 = new Image();
		this.lfu1.onload = () => { return true; }
		this.lfu1.src = './images/link/lfu1.png';
		this.imageArray.push(this.lfu1);

		this.lfu2 = new Image();
		this.lfu2.onload = () => { return true; }
		this.lfu2.src = './images/link/lfu2.png';
		this.imageArray.push(this.lfu2);


		// east 'd'
		this.lru1 = new Image();
		this.lru1.onload = () => { return true; }
		this.lru1.src = './images/link/lru1.png';
		this.imageArray.push(this.lru1);

		this.lru2 = new Image();
		this.lru2.onload = () => { return true; }
		this.lru2.src = './images/link/lru2.png';
		this.imageArray.push(this.lru2);
		

		////////////////////////////////////////
		// load attack animations
		this.lba = new Image();
		this.lba.onload = () => { return true; }
		this.lba.src = './images/link/lba.png';
		this.imageArray.push(this.lba);

		this.lla = new Image();
		this.lla.onload = () => { return true; }
		this.lla.src = './images/link/lla.png';
		this.imageArray.push(this.lla);
		
		this.lfa = new Image();
		this.lfa.onload = () => { return true; }
		this.lfa.src = './images/link/lfa.png';
		this.imageArray.push(this.lfa);

		this.lra = new Image();
		this.lra.onload = () => { return true; }
		this.lra.src = './images/link/lra.png';
		this.imageArray.push(this.lra);

		this.linkOver = new Image();
		this.linkOver.onload = () => { return true; }
		this.linkOver.src = './images/link/link_aloft.png';
	}
	
}

module.exports = Link;