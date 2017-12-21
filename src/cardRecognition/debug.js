import CardRecognition from './index.js';

const date = {
	ab: './src/cardRecognition/a_b.png',
	dk: './src/cardRecognition/d_k.png',
	test_ab: './src/cardRecognition/test_ab.png',
}

const cardRecognition = new CardRecognition(date);

cardRecognition.parse(date.ab);
cardRecognition.parse(date.dk);
cardRecognition.parse(date.test_ab);
