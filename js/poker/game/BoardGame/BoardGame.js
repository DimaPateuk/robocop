import BoardCards from '../../cards/BoardCards.js';
import Deck from '../../cards/Deck.js';
import HandCards from '../../cards/HandCards.js';
import BoardGameBetUtils from './BoardGameBetUtils.js';

export default class BoardGame extends BoardGameBetUtils {

	start () {
		this.deck = new Deck();
		this.boardCards = new BoardCards(this.deck);
		this.pickUpAnte();
		this.pickUpBlinds();
		this.currentBet = this.bigBlind;

		this.startForTwoPlayers();
	}

	end () {
		this.deck = null;
		this.boardCards = null;
		this.dealerPosition = this.firstPositionAfterDiller;
		this.gameBank = 0;
	}

	giveOutCards () {
		this.playerInGame = {};

		this.forEachPlayerFromDiller(player => {
			player.setHandCards(new HandCards(this.deck));
			this.playerInGame[player.id] = player;
		});
	}

	startForTwoPlayers () {
		this.giveOutCards();

		this.startBettingCycle(this.dealerPosition);
	}

	startBettingCycle (startIndex) {

		this.forEachPlayerInGameFrom(player => {
			// if (player.bankInGame !== this.currentBet) {
			// 	player.bet(this.currentBet);
			// }
		}, startIndex);

		Object.entries(this.playerInGame)
			.forEach(entry => {
				console.log(entry[1]);
			});

		var t = Object.entries(this.playerInGame)
			.every(entry => entry[1].bankInGame === this.currentBet);
		console.log(this.players);
		console.log(t);
	}
}
