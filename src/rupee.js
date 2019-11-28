
class Rupee {

	constructor(pos, img) {

		this.rupeeImg = img;
		this.pos = pos;

		this.hitPoints = 1;
		this.height = 30;
		this.width = 30;

	}


	drawObject(ctx) {

		ctx.drawImage(this.rupeeImg, 0, 0, 100, 150,
			this.pos[0],
			this.pos[1],
			this.width,
			this.height);

	}

	center() {
		return [this.pos[0] + 15, this.pos[1] + 15];
	}
}

module.exports = Rupee;