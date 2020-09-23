const Game = require("./game");
const CeCe = require("./cece");


class GameView {
 
	constructor(ctx, width, height){
		this.width = width;
		this.ctx = ctx;
		let map = 1;
		this.game = new Game(width, height, map);

		this.cece = this.game.add(new CeCe(this.ctx));

	}


	openingOff(){
		this.game.opening = false;
		this.cece.activateBullySpeech();
	}

	start() {
		this.bindKeyHandlers();
		this.lastTime = 0;
		// start the animation
		requestAnimationFrame(this.animate.bind(this));
	};

	animate(time) {
		const timeDelta = time - this.lastTime;

		if (!this.game.opening) this.game.step(timeDelta);

		if (this.game.map ===1 && this.cece.pos[0] < 50) {
			this.game.map = 2;
			this.cece.map = this.game.b2;
			this.game.enemies = [];
			this.game.addEnemies();
			this.cece.pos = [700, 450];
		}
		this.game.draw(this.ctx);
		this.lastTime = time;

		// every call to animate requests causes another call to animate
		requestAnimationFrame(this.animate.bind(this));
	};



	bindKeyHandlers() {
		
		const dist = 15;

		const MOVES = {
			w: [0, -dist],
			a: [-dist, 0],
			s: [0, dist],
			d: [dist, 0] }

		const that = this;
		
		Object.keys(MOVES).forEach((ele) => {
			key(ele, () => { that.cece.move(MOVES[ele], this.game.opening); })
		});

		key("space", () => { 
			// that.cece.attack(); 
			if (that.cece.fireballUnlocked()) {
				that.game.launchFireball();
			}
		});
	}
}

module.exports = GameView;