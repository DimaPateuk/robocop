import isFunction from 'lodash/isFunction';

export function testFunction (testName, fn, expectedResult) {
	let isPassed = false;

	if (isFunction(expectedResult)) {
		isPassed = fn(expectedResult());
	} else {
		isPassed = fn() === expectedResult;
	}

	if (isPassed) {
		console.log(testName, 'passed');
	} else {
		console.log(testName, 'fail');
	}
}
