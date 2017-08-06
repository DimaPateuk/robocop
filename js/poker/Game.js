import BoardCards from './BoardCards.js';

export default class Game {
	constructor(players, littleBlind, bigBlind) {
		this.players = players;
		this.dealerPosition = 0;
		this.gameBank = 0;
		this.littleBlind = littleBlind;
		this.bigBlind = bigBlind;

	}

	start () {
		this.deck = new Deck();
		this.boardCards = new BoardCards();
		this.giveOutCards();
	}

	giveOutCards() {
		let indexPosition = this.dealerPosition;

		for (let i = 0; i < this.players.length; i++) {
			if (indexPosition === this.players.length) {
				indexPosition = 0;
			}
			this.players[indexPosition].setHandCards(new HandCards(this.deck));
			indexPosition++;
		}

		this.gameBank = this.players[this.dealerPosition + 1].bet(this.bigBlind);
	}


	getNextPlayerIndex(currentIndex) {
		return currentIndex === this.players.length - 1 ? 0 : currentIndex + 1;
	}

	firstCircle() {
		this.currentBet = this.bigBlind;

		let decision = this.players[this.dealerPosition].makeDecision(this.currentBet);
		if (decision === FOLD) {
			//????????/
		}

	}





};