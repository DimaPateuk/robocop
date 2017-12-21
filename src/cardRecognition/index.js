import Brain from 'brain';
import flatten from 'lodash/flatten';

var fs = require('fs'),
	PNG = require('pngjs').PNG;


fs.createReadStream('./src/cardRecognition/a_b.png')
	.pipe(new PNG({
		filterType: 4,
	}))
	.on('parsed', function () {
		const arr = [];

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const idx = (this.width * y + x) << 2;
				// console.log(idx);
				// // invert color
				// this.data[idx] = 255 - this.data[idx];
				// this.data[idx+1] = 255 - this.data[idx+1];
				// this.data[idx+2] = 255 - this.data[idx+2];
				// // and reduce opacity
				// this.data[idx+3] = this.data[idx+3] >> 1;
				arr.push({
					r: this.data[idx],
					g: this.data[idx + 1],
					b: this.data[idx + 2],
					a: this.data[idx + 3],
				});
			}
		}

		for (let i = 0; i < arr.lenght; i++) {

		}



		this.pack().pipe(fs.createWriteStream('./src/cardRecognition/out.png'));
	});


export default class CardRecognition {
	constructor (date) {
		console.log(date.one.length);
		console.log(date.one[0].length);
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
