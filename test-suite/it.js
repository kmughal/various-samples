require('./print-helpers')

const it = (title, func) => {
	let result;
	try {
		console.time(`Running <<<${title}>>>`);
		func();
		result = { name: title, status: 0 };
		`pass`.print();
	} catch (e) {
		`failed`.print();
		result = { name: title, status: -1, message: e.message };
	}

	console.timeEnd(`Running <<<${title}>>>`);
	return result;
};



exports.it = it;