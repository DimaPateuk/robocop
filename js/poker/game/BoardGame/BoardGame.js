import BoardCards from '../../cards/BoardCards.js';
import Deck from '../../cards/Deck.js';
import HandCards from '../../cards/HandCards.js';
import BoardGameBetUtils from './BoardGameBetUtils.js';
import {
	CHECK,
	FOLD,
} from '../../constants';

export default class BoardGame extends BoardGameBetUtils {

	start () {
		this.deck = new Deck();
		this.boardCards = new BoardCards(this.deck);
		this.pickUpAnte();
		this.pickUpBlinds();
		this.currentBet = 0;

		this.startForTwoPlayers();
	}

	end () {
		this.deck = null;
		this.boardCards = null;
		this.dealerPosition = this.firstPositionAfterDiller;
		this.gameBank = 0;
		this.currentBet = 0;
	}

	giveOutCards () {
		this.playersInGame = {};

		this.forEachPlayerFromDiller(player => {
			player.setHandCards(new HandCards(this.deck));
			this.playersInGame[player.id] = player;
		});
	}

	startForTwoPlayers () {
		this.giveOutCards();

		this.startBettingCycle(this.dealerPosition);
	}

	get numberPlayerInGame () {
		return Object.entries(this.playersInGame)
			.filter(entry => entry[1]).length;
	}

	win(player) {
		player.win(this.bankInGame);
		this.end();
	}

	startBettingCycle (startIndex) {
		let playerCount = this.numberPlayerInGame;
				// if (player.bankInGame !== this.currentBet) {
				// 	player.bet(this.currentBet);
				// }

		// while(true) {

			this.forEachPlayersInGameFrom((player, index, breakCb) => {
				if (playerCount === 1) {
					this.win(player);
					//breakCb()
				}

				const playerDesision = player.makeDecision(this.currentBet, index);
				if (playerDesision === FOLD) {
					this.playersInGame[player.id] = false;
					playerCount--;
					return;
				}

				if (playerDesision === CHECK) {
					return;
				}

				this.bet(playerDesision);
			}, startIndex);


			console.log(this.players);
			console.log(this.currentBet);
			console.log(this.gameBank);

		// }

	}
}
