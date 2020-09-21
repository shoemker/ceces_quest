
const Enemy = require("./enemy");

class Snake extends Enemy {
	constructor(options) {
		super(options);
		
		this.snakeImg = options.img;
		this.directionDuration = 10;
		this.directionCount = 0;

		this.hitPoints = 1;
		this.height = 30;
		this.width = 30;

	}


	drawObject(ctx) {

		let x;
		let y;
		if (this.deltaX >= 0) {
			x = 30;
			y = 330;
		} else {
			x = 0;
			y = 300;
		}

		ctx.drawImage(this.snakeImg,x,y,15,15,
			this.pos[0],
			this.pos[1],
			this.width,
			this.height);
	
		super.drawObject(ctx);

	}
}



module.exports = Snake;