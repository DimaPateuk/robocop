import BoardCards from '../../cards/BoardCards.js';
import Deck from '../../cards/Deck.js';
import HandCards from '../../cards/HandCards.js';
import {
	CHECK,
	FOLD,
	GO_TO_THE_NEXT_STAGE,
	SHOW_DOWN,
	RPE_FLOP,
	GAME_END,
} from '../../constants';

export default class BoardGame {

	constructor(players, smallBlind, bigBlind, ante) {
		this.players = players;
		this.smallBlind = smallBlind;
		this.bigBlind = bigBlind;
		this.ante = ante;
	}


	start () {
		console.log(this.players);
	}
}
