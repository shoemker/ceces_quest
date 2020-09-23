const Util = {

	distance(pt1, pt2) {
		let xdist = pt1[0] - pt2[0];
		let ydist = pt1[1] - pt2[1];
		return Math.sqrt(xdist*xdist + ydist*ydist);
	},



	loadImg(file) {
		let img = new Image();
		img.onload = () => { return true; }
		img.src = file;
		return img;
	},


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
	},


	drawText(ctx, x, y, message, size = 16) {
		ctx.fillStyle = "black";
		ctx.font = size + "px Comic Sans MS";
		ctx.fillText(message, x, y);
	}

};

module.exports = Util;