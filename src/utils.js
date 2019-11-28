const Util = {

	distance(pt1, pt2) {
		let xdist = pt1[0] - pt2[0];
		let ydist = pt1[1] - pt2[1];
		return Math.sqrt(xdist*xdist + ydist*ydist);
	},

	norm(pt) {
		return distance([0,0], pt);
	},

	randomVec(length) {
		const deg = 2 * Math.PI * Math.random();
		return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	},
	// Scale the length of a vector by the given amount.
	scale(vec, m) {
		return [vec[0] * m, vec[1] * m];
	}
};

module.exports = Util;