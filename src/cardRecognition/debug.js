import CardRecognition from './index.js';
import { SUITS_NAMES } from '../poker/constants';

const date = {
	ab: './src/cardRecognition/a_b.png',
	dk: './src/cardRecognition/d_k.png',
	test_ab: './src/cardRecognition/test_ab.png',
}

for (var i = 0; i < SUITS_NAMES.length; i++) {
	date[SUITS_NAMES[i]] = `./src/cardRecognition/${SUITS_NAMES[i]}.png`;
}

const cardRecognition = new CardRecognition();

cardRecognition.parse(date.ab);
cardRecognition.parse(date.dk);
cardRecognition.parse(date.test_ab);
