const Enemy = require("./enemy");
const Snake = require("./snake");
const Skeleton = require("./skeleton");
const Rupee = require("./rupee");
const CeCe = require("./cece");
const Fireball = require("./fireball");
const Background1 = require("./background1")
const Background2 = require("./background2")
const Utils = require("./utils");


class Game {

	constructor(dim_x, dim_y, map){
	
		this.enemies = [];
		this.rupees = [];
		this.dim_x = dim_x;
		this.dim_y = dim_y;
		this.map = map;

		this.nosebumpCounter = 0;
		this.countToThirty = 0;
		this.messageCount = 0;
		this.message = "Good Luck!";
		

		this.opening = true;
		this.win = false;

		// load images
		this.fireballImg = Utils.loadImg('./images/poop.png');
		this.enemiesImg = Utils.loadImg('./images/enemies.png');
		this.ceceImg = Utils.loadImg('./images/cece/Cece.png');
		this.rupeeImg = Utils.loadImg('./images/BotW_Green_Rupee_Icon.png');

		this.fireball = null;

		this.b1 = new Background1(this.dim_x, this.dim_y);
		this.b2 = new Background2(this.dim_x, this.dim_y);

		this.addEnemies();

	}

	addEnemies() {
		
		if (this.map === 2) {
			this.add(new Snake({
				pos: [150, 100],
				vel: [1, 1],
				radius: 15,
				map: this.b2,
				img: this.enemiesImg
			}))

			this.add(new Snake({
				pos: [100, 400],
				vel: [1, 1],
				radius: 15,
				map: this.b2,
				img:  this.enemiesImg
			}))

			this.add(new Snake({
				pos: [650, 600],
				vel: [1, 1],
				radius: 15,
				map: this.b2,
				img: this.enemiesImg
			}))
		} else if (this.map === 1) {
		
			this.add(new Skeleton({
				pos: [200, 500],
				vel: [1, 1],
				radius: 15,
				map: this.b1,
				img: this.enemiesImg
			}))

			this.add(new Skeleton({
				pos: [100, 400],
				vel: [1, 1],
				radius: 15,
				map: this.b1,
				img: this.enemiesImg
			}))

			this.add(new Skeleton({
				pos: [125, 600],
				vel: [1, 1],
				radius: 15,
				map: this.b1,
				img: this.enemiesImg
			}))
		}
	}

	add(object) {
		if (object instanceof Enemy){
			this.enemies.push(object);
			return this.enemies;
		}
		else if (object instanceof CeCe){
			this.cece = object;
			this.cece.map = this.b1;
			return this.cece;
		}
		else if (object instanceof Rupee){
			this.rupees.push(object);
			return this.rupees;
		}

	}


	draw(ctx) {
		
		ctx.clearRect(0,0,this.dim_x, this.dim_y);
		
		this.drawMessage(ctx);

		this.drawBackgroundMap(ctx, this.map);

		this.drawRupeesCount(ctx);
		
		this.drawHitpointsBar(ctx);


		if (this.cece.hitpoints <= 0) {
			// this.cece.gameOver = true;
			this.drawLose(ctx);
			this.enemies = [];
		} else if (this.win) {
			this.drawWin(ctx);
		}
	
		this.enemies.forEach(ele => { ele.drawObject(ctx); });
		this.rupees.forEach(ele => { ele.drawObject(ctx); });
		if (this.fireball) this.fireball.drawObject(ctx);
	

		if (this.countToThirty > 0 && this.countToThirty%2 === 0 && this.collision) 
			this.cece.drawObject(ctx, true );
		else this.cece.drawObject(ctx, false);

		if (this.opening) this.drawOpening(ctx);

		if (this.nosebumpCounter > 0) this.drawNoseBump(ctx);
		// if (this.opening) this.drawNoseBump(ctx);

	}

	drawNoseBump(ctx){
		this.message = "Use spacebar to attack!";
		ctx.fillStyle = "white";
		ctx.font = "96px HalfBoldPixel";
		ctx.fillText("Nose Bump!", 375, 300);
		ctx.font = "24px HalfBoldPixel";

		ctx.fillText("Use spacebar to attack!", 375, 375 );

		this.nosebumpCounter++;
		if (this.nosebumpCounter > 40) this.nosebumpCounter = 0;
	};

	drawOpening(ctx) {

		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.font = "35px HalfBoldPixel";

		ctx.drawImage(this.ceceImg,
			0,
			0,
			700,
			1000,
			140,
			50,
			530,
			800);

		ctx.fillText("Welcome to", this.dim_x / 2, 200);
		ctx.font = "70px HalfBoldPixel";

		ctx.fillText("Cece's Quest", this.dim_x / 2, 280);

		ctx.font = "35px HalfBoldPixel";
		ctx.fillText("Click to Start", this.dim_x / 2, 700);
	}

	drawLose(ctx) {

		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.font = "35px HalfBoldPixel";

		ctx.fillText("Sorry, Cece has no more hitpoints.", this.dim_x / 2, 200);
		ctx.fillText("Game Over!", this.dim_x / 2, 250);

	}

	drawWin(ctx) {
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.font = "35px HalfBoldPixel";

		ctx.fillText("Congrats! You Win!", this.dim_x / 2, 200);

	}

	drawMessage(ctx){
		if (this.messageCount === 30) this.messageCount = 0;
		else if (this.messageCount > 0 || 
							this.message.startsWith("Good Luck!") ||
							this.message.startsWith("Maybe the bouvier")) {

			ctx.font = "30px HalfBoldPixel";
			
			ctx.fillStyle = "white";
			ctx.fillText(this.message, this.dim_x / 2, 23);
			this.messageCount++;
		}
	}

	drawBackgroundMap(ctx, map) {
		if (map === 1) {
			this.b1.draw(ctx);
		} else if (map === 2) {
			this.b2.draw(ctx);
		}
	}

	drawRupeesCount(ctx) {
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.font = "20px HalfBoldPixel";
		ctx.fillText("Rupees", 50,50);
		ctx.fillText(this.cece.rupees, 50, 70);
	}

	drawHitpointsBar(ctx) {
		ctx.fillStyle = "white";
		ctx.fillRect(720, 40, 20, 90);
		let hp = this.cece.hitpoints;

		if (hp > 2) ctx.fillStyle = "green";
		else ctx.fillStyle = "red";
		let offset = 80 - hp*10;
		ctx.fillRect(725, 45 + offset, 10, 80 - offset);
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.font = "15px HalfBoldPixel";
		ctx.fillText("HP", 731, 145);
	}



	step(timeDelta) {
		// debugger
		if (this.countToThirty === 15) {
			this.countToThirty = 0;
			this.collision = false;
		}
		else if (this.countToThirty > 0) this.countToThirty++;
		else {
			this.checkCollisions();
			this.checkHit();
		}

		this.checkForWin();

		if (!this.cece.fireballUnlocked()) this.checkForNoseBump();

		this.moveObjects(timeDelta);
	}


	checkForNoseBump(){
		// console.log(this.cece.getPos());
		const pos = this.cece.getPos();

		if (pos[0] >= 330 && pos[0] <= 345 && pos[1]<=110 && pos[1] >= 95) {
			
			this.cece.unlockFireball();
			this.nosebumpCounter = 1;
		}
	};

	checkForWin(){
		if (this.map === 2 && this.enemies.length === 0) {
			this.message = "Strike chest for the the win!"
			const tip = this.cece.swordTipPos();
			if(tip != null) console.log(tip);
			if (tip != null && 
				tip[0] >= 10 && tip[0] <= 60 &&
				tip[1] >= 90 && tip[1] <= 133) {

				this.b2.chestImgX = 428;
				this.cece.gameOver = true;
				this.win = true;
				
			}
		}
	}

	checkCollisions() {

		this.collision = false;
		// debugger
		this.enemies.forEach(enemy => { 
			let distance = Utils.distance(this.cece.center(),enemy.center());

			if (distance < (this.cece.radius + enemy.radius +2)) {
				this.countToThirty++;
				this.collision = true;
				this.message = "Ouch!";
				
				this.cece.reduceHitPoints();
		
				this.messageCount=1;
			}
		})

		this.rupees.forEach((rupee,i) => { 
			let distance = Utils.distance(this.cece.center(),rupee.center());
			if (distance < 30 ) {
			
				this.rupees.splice(i, 1)
				this.cece.rupees++;
				if (this.cece.rupees === 3) {
					this.cece.unlock = true;
				}
				else this.message = "You found a rupee!"

				this.messageCount = 1;
			}
		});
	}

	checkHit() {
		// const tip = this.cece.swordTipPos();
		this.enemies.forEach((enemy,i) => { 
			// if (tip !== null) {
			// 	const distance = Utils.distance(tip, enemy.center());

			// 	if (distance < enemy.radius) {
			// 		this.countToThirty++;		
			// 		this.message = "Hit!"	
			// 		enemy.hitPoints--;
			// 		this.messageCount=1;
			// 		if (enemy.hitPoints <= 0)		{
			// 			this.enemies.splice(i,1)
			// 			this.message = "Enemy Killed";
			// 			this.add(new Rupee(enemy.pos, this.rupeeImg));

			// 		}
			// 	} 
			// }

			if (this.fireball && Utils.distance(this.fireball.center(), enemy.center()) < 21) {
				this.countToThirty++;
				this.message = "Hit!"
				enemy.hitPoints--;
				this.messageCount = 1;
				if (enemy.hitPoints <= 0) {
					this.enemies.splice(i, 1)
					this.message = "Enemy Killed";
					this.add(new Rupee(enemy.pos, this.rupeeImg));
				}
			}

			
		})
		
	}

	launchFireball() {
		let position = this.cece.swordTipPos();
		let direction = this.cece.getDirection();
		let velocity;
		
		switch (direction) {
			case 0:
				velocity = [0, -2];
				break;
			case 4:
				velocity = [-2, 0];
				break;
			case 8:
				velocity = [0, 2];
				break;
			case 12:
				velocity = [2, 0];
				break;				
			default:
				velocity = [0, 0];
		}
		this.fireball = new Fireball({
			pos: [position[0] - 7, position[1] - 7],
			vel: velocity,
			radius: 15,
			img: this.fireballImg
		})
	}

	moveObjects(timeDelta) {
		this.enemies.forEach(enemy => { enemy.move(timeDelta); });
		if (this.fireball) this.fireball.move(4);
	}
}


module.exports = Game;