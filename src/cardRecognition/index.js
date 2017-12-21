import Brain from 'brain';
import flatten from 'lodash/flatten';
import ImageToInput from './ImageToInput';

export default class CardRecognition {
	constructor (date) {
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
			]);
		})
		.catch(console.log);
	}

	parse (date) {
		Promise.all([
			ImageToInput(date),
			this.initialized,
		])
		.then(([date]) => {
			console.log(date.length);
			const result = this.net.run(date);
			console.log(result);
		})

	}
}
