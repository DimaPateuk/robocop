export function testFunction (testName, fn, fnArgs = [], expectedResult) {
	if (fn(...fnArgs) === expectedResult) {
		console.log(testName, 'passed');
	} else {
		console.log(testName, 'fail');
	}
}
