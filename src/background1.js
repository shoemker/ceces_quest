const Utils = require("./utils");

class Background1 {
	constructor(dim_x, dim_y) {
		this.dim_x = dim_x;
		this.dim_y = dim_y;

		this.loadBackground1();
		this.bouvierImg = Utils.loadImg('./images/Bouvier_des_Flandres_B_W_Small_Filee.png');
	}


	draw (ctx) {
		ctx.fillStyle = "#8DC435";
		
		ctx.fillRect(0, 30, this.dim_x, this.dim_y);
		
		for(let i = 0; i < 11; i++) {
			//top
			ctx.drawImage(this.background1, 128, 0, 64, 64, i * 64, 30, 64, 64);
		
			//trail
			ctx.drawImage(this.background1, 64, 0, 64, 64, i * 64, 414, 64, 64);

			// drawImage(this.image, xOnSheet,yOnSheet,width, height,xcoord, ycoord, width, height)


			// //bottom
			if (i !== 0 && i != 15) {
				ctx.drawImage(this.background1, 192, 0, 64, 64, i * 64, 670, 64, 64);
				ctx.drawImage(this.background1, 128, 0, 64, 64, i * 64, 734, 64, 64);
			}
		}

	//clumps
		ctx.drawImage(this.background1, 192, 0, 64, 64, 128, 148, 64, 64);
		ctx.drawImage(this.background1, 128, 0, 64, 64, 128, 212, 64, 64);

		ctx.drawImage(this.background1, 192, 0, 64, 64, 192, 148, 64, 64);
		ctx.drawImage(this.background1, 128, 0, 64, 64, 192, 212, 64, 64);

		ctx.drawImage(this.background1, 256, 0, 64, 64, 440, 468, 64, 64);
		ctx.drawImage(this.background1, 256, 0, 64, 64, 440, 532, 64, 64);
		ctx.drawImage(this.background1, 256, 0, 64, 64, 504, 468, 64, 64);

		for (let i = 0; i < 6; i++) {
			// left side

			if (i !== 2) ctx.drawImage(this.background1, 192, 0, 64, 64, 0, 94 + i * 2 * 64, 64, 64);
			if (i !== 3) ctx.drawImage(this.background1, 128, 0, 64, 64, 0, 30 + i * 2 * 64, 64, 64);


			//right side

			ctx.drawImage(this.background1, 192, 0, 64, 64, 700, 94 + i * 2 * 64, 64, 64);
			ctx.drawImage(this.background1, 128, 0, 64, 64, 700, 30 + i * 2 * 64, 64, 64);
		}

		ctx.drawImage(this.bouvierImg, 80, 20, 320, 330, 300, 100, 50, 50);
	}

	checkBounds(x, y) {
		if (y < 70 || y > 700) return false;
		else if (x > 710) return false;
		else if (x < 70 && !(y > 404 && y < 468)) return false;
		else return true;
	}

	loadBackground1() {
		this.background1 = new Image();
		this.background1.onload = () => { return true; }
		this.background1.src = './images/tiles.png';
	}
	
}

module.exports = Background1;