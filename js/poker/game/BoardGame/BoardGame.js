import BoardCards from '../../cards/BoardCards.js';
import Deck from '../../cards/Deck.js';
import HandCards from '../../cards/HandCards.js';
import BoardGameBetUtils from './BoardGameBetUtils.js';

export default class BoardGame extends BoardGameBetUtils{

	start () {
		this.deck = new Deck();
		this.boardCards = new BoardCards(deck);
		this.giveOutCards();

		this.startForTwoPlayers();
	}

	end () {
		this.dealerPosition++;
		this.gameBank = 0;
	}

	giveOutCards() {
		this.forEachFromDiller(player => {
			player.setHandCards(new HandCards(this.deck));
		});
	}

	startForTwoPlayers() {
		this.currentBet = this.bigBlind;

	}

};
