require("./print-helpers");

const TestSuite = tests => {
	const testResults = [];

	tests.forEach(test => {
		const result = test();
		testResults.push(result);
	});
	return {
		stats: testResults,
		summary: () => {
			const failedTests = testResults.filter(t => t.status === -1);
			const passedTests = testResults.filter(t => t.status === 0);
			`
      Ran ${testResults.length} tests
      Passed : ${passedTests.length},
      Failed: ${failedTests.length}
    `.print();
		}
	};
};


exports.TestSuite = TestSuite