import Brain from 'brain';
import flatten from 'lodash/flatten';


export default class CardRecognition {
	constructor (date) {
		this.net = new Brain.NeuralNetwork();
		this.net.train([
			{
				input: flatten(date.one),
				output: [1, 0, 0],
			},
			{
				input: flatten(date.two),
				output: [0, 1, 0],
			},
			{
				input: flatten(date.three),
				output: [0, 0, 1],
			}
		]);

	}

	parse (date) {
		const result = this.net.run(flatten(date));
		console.log(result);
	}
}
