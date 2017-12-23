import fs from 'fs';
import jimp from 'jimp';

export default (src) => new Promise((res, rej) => {
	if (src instanceof jimp) {
			getRGBAArray(src)
				.then((arr) => {
					res(normalizeArr(arr));
				});
			return;
	}

	new jimp(src, function (err, image) {
		getRGBAArray(image)
			.then((arr) => {
				res(normalizeArr(arr));
			});
	});

});

function getRGBAArray (image) {
  return new Promise(res => {
    const result = [];

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        result.push(this.bitmap.data[ idx + 0 ]);
        result.push(this.bitmap.data[ idx + 1 ]);
        result.push(this.bitmap.data[ idx + 2 ]);
        result.push(this.bitmap.data[ idx + 3 ]);
    });

		res(result);
  });
}

function normalizeArr (arr) {
		const result = [];
		const step = Math.floor(arr.length / 99);
		for (var i = 0; i < arr.length - step; i += step) {
			let tmp = 0;
			for (var j = i; j < i + step; j++) {
				tmp += arr[j];
			}
			result.push((tmp / step) / 255);
		}

		return result.slice(0, 99);
}
