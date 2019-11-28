
class Background2 {
	constructor(dim_x, dim_y, img, imgPlants, chestImg) {
		this.loadBackground2();
		this.loadChest();
		this.loadPlants();

		this.dim_x = dim_x;
		this.dim_y = dim_y;

		this.chestImgX = 25;
	}


	draw(ctx) {
		ctx.fillStyle = "#B88751";

		ctx.fillRect(0, 30, this.dim_x, this.dim_y);

		// drawImage(this.image, xOnSheet,yOnSheet,width, height,xcoord, ycoord, width, height)

		
		//top
		ctx.drawImage(this.background2, 800, 50, 50, 110, 0, 30, 900, 64);

		ctx.drawImage(this.background2, 800, 50, 50, 110, 0, 690, 900, 64);

		//puddle
		ctx.drawImage(this.background2, 300, 355, 80, 80, 300, 410, 64, 64);
		ctx.drawImage(this.background2, 300, 355, 80, 80, 600, 160, 64, 64);

		//cactus
		ctx.drawImage(this.imgPlants, 350, 190, 80, 100, 50, 310, 64, 64);		
		ctx.drawImage(this.imgPlants, 350, 190, 80, 100, 500, 610, 64, 64);	
		ctx.drawImage(this.imgPlants, 350, 190, 80, 100, 100, 510, 64, 64);	

		// chest
		ctx.drawImage(this.chestImg, this.chestImgX, 25, 350, 250, 10, 90, 50, 43);
	}

	checkBounds(x, y) {
		if (y < 90 || y > 700) return false
		else if (x > 710 || x < 30) return false;
		else if (x < 70 && y < 130) return false;
		else return true;
	}



	loadBackground2() {
		this.background2 = new Image();
		this.background2.onload = () => { return true; }
		this.background2.src = './images/terrain_atlas.png';
	}

	loadPlants() {
		this.imgPlants = new Image();
		this.imgPlants.onload = () => { return true; }
		this.imgPlants.src = './images/plant_repack.png';
	}

	loadChest() {
		this.chestImg = new Image();
		this.chestImg.onload = () => { return true; }
		this.chestImg.src = './images/chest.png';
	}
	
}

module.exports = Background2