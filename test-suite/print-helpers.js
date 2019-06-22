String.prototype.print = function() {
	console.log(this.toString());
};

Boolean.prototype.print = function() {
	console.log(this.toString());
};

Object.prototype.print = function() {
	console.log(JSON.stringify(this, null, 2));
};
