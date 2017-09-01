import isFunction from 'lodash/isFunction';

export function testFunction (testName, fn, expectedResultExecuter) {
	let isPassed = false;

	const actualResult = fn();
	let expectedResult;

	if (isFunction(expectedResultExecuter)) {
		expectedResult = expectedResultExecuter(actualResult);
		isPassed = expectedResult;
	} else {
		expectedResult = expectedResultExecuter;
		isPassed = expectedResult === actualResult;
	}

	if (isPassed) {
		console.log('passed:', testName);
	} else {
		console.log('FAIL:', testName, `expect: ${expectedResultExecuter}, but actual: ${actualResult}`);
	}
}
