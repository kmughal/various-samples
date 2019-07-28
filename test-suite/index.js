require("./print-helpers");
const { statement } = require("./statement");
const { TestSuite } = require("./test-suite");
const { it } = require("./it");

TestSuite([
	_ =>
		it("Result must be false", function() {
			statement.isFalse(false);
		}),

	_ =>
		it("Result must be true", function() {
			statement.isTrue(true);
		}),

	_ =>
		it("Date can not be null", () => {
			statement.isNotNull(null);
		})
]).stats.print();

const chainAsync = fns => {
	let curr = 0;
	const next = () => fns[curr++](next);
	next();
};

function chainAsnc(fns) {
	let curr = 0;

	function next() {
		fns[curr++](next);
	}
	next();
}

chainAsync([
	n => {
		console.log(1);
		n();
	},
	n => {
		console.log(2);
		n();
	}
]);
