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
};

module.exports = Util;