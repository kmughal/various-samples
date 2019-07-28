require("./print-helpers");

const statement = {
	isTrue(input) {
		const result = input === true;
		if (!result) throw new Error(`Expected: true, Received :${result}`);
		return result;
	},

	isFalse(input) {
		const result = input === false;
		if (!result) throw new Error(`Expected: false, Received :${result}`);
		return result;
	},

	isNull(input) {
		const result = input === null || typeof input === "undefined" || !input;
		if (!result) throw new Error(`Expected: null, Received :${result}`);
		return result;
	},

	isNotNull(input) {
		const result = !statement.isNull(input);
		if (!result) throw new Error(`Expected: not null, Received :${result}`);
		return result;
	},

	isEqual(actual, expected) {
		const result = actual === expected;
		if (!result)
			throw new Error(
				`Expected: ${actual} === ${expected}, Received :${result}`
			);
		return result;
	},

	isNotEqual(actual, expected) {
		const result = !statement.isEqual(actual, expected);
		if (!result)
			throw new Error(
				`Expected: ${actual} !== ${expected}, Received :${result}`
			);
		return result;
	},

	containsValue(input, list) {
		if (!Array.isArray(list)) throw new Error("list is not an array!");
		if (statement.isNull(input)) throw new Error("input can not be null");

		if (typeof input === typeof Function) {
			const search = list.find(input);
			const result = statement.isNotNull(search);
			if (!result) throw new Error(`Expected: not null , Received :${result}`);
			return result;
		}

		if (typeof input === "string") {
			const result = list.includes(input);
			if (!result) throw new Error(`Expected: ${input} , Received :${result}`);
			return result;
		}
	}
};

exports.statement = statement;
