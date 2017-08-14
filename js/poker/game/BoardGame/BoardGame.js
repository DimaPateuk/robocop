import BoardCards from '../../cards/BoardCards.js';
import Deck from '../../cards/Deck.js';
import HandCards from '../../cards/HandCards.js';
import BoardGameBetUtils from './BoardGameBetUtils.js';

export default class BoardGame extends BoardGameBetUtils{

	start () {
		this.deck = new Deck();
		this.boardCards = new BoardCards(this.deck);

		this.startForTwoPlayers();
	}

	end () {
		this.deck = null;
		this.boardCards = null;
		this.dealerPosition++;
		this.gameBank = 0;
	}

	giveOutCards() {
		this.forEachFromDiller(player => {
			player.setHandCards(new HandCards(this.deck));
		});
	}

	startForTwoPlayers() {
		this.pickUpBigBlind();
		// this.pickUpSmallBlind();
		this.pickUpAnte();
		this.giveOutCards();
		this.currentBet = this.bigBlind;



	}

};
