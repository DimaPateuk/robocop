import fs from 'fs';
import { PNG }from 'pngjs';

export default (src) => new Promise((res, rej) => {

fs.createReadStream(src)
	.pipe(new PNG({
		filterType: 4,
	}))
	.on('parsed', function () {
		const arr = [];

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const idx = (this.width * y + x) << 2;
				arr.push(this.data[idx]);
				arr.push(this.data[idx + 1]);
				arr.push(this.data[idx + 2]);
				arr.push(this.data[idx + 3]);

				this.data[idx] = this.data[idx] > 10 ? 255 : 0;
				this.data[idx + 1] = this.data[idx + 1] > 10 ? 255 : 0;
				this.data[idx + 2] = this.data[idx + 2] > 10 ? 255 : 0;
				this.data[idx + 3] = this.data[idx + 3] > 10 ? 255 : 0;
			}
		}

		const result = [];
		const step = Math.floor(arr.length / 99);
		for (var i = 0; i < arr.length - step; i += step) {
			let tmp = 0;
			for (var j = i; j < i + step; j++) {
				tmp += arr[j];
			}
			result.push((tmp / step) / 255);
		}

		this.pack().pipe(fs.createWriteStream(`${src}.out.png`));

		res(result.slice(0, 99));
	})
	.on('error', rej);

});
