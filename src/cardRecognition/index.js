import Brain from 'brain';
import flatten from 'lodash/flatten';
import ImageToInput from './ImageToInput';

import { SUITS_NAMES } from '../poker/constants';



const date = {
	ab: './src/cardRecognition/a_b.png',
	dk: './src/cardRecognition/d_k.png',
	test_ab: './src/cardRecognition/test_ab.png',
}

for (var i = 0; i < SUITS_NAMES.length; i++) {
	date[SUITS_NAMES[i]] = `./src/cardRecognition/${SUITS_NAMES[i]}.png`;
}

console.log(SUITS_NAMES[0], date[SUITS_NAMES[0]]);
console.log(SUITS_NAMES[1], date[SUITS_NAMES[1]]);

export default class CardRecognition {
	constructor () {
		this.net = new Brain.NeuralNetwork();
		this.initialized = Promise.all([
			ImageToInput(date.ab),
			ImageToInput(date.dk),
		])
		.then(([ab, dk]) => {

			this.net.train([
				{
					input: ab,
					output: [1, 0],
				},
				{
					input: dk,
					output: [0, 1],
				},
			], {
				errorThresh: 0.0005,  // error threshold to reach
				iterations: 20000,   // maximum training iterations
				// log: true,           // console.log() progress periodically
				// logPeriod: 10,       // number of iterations between logging
				learningRate: 0.03
			});
		})
		.catch(console.log);
	}

	parse (date) {
		Promise.all([
			ImageToInput(date),
			this.initialized,
		])
		.then(([date]) => {
			const result = this.net.run(date);
			console.log(result);
		})

	}
}
