import BoardCards from '../../cards/BoardCards.js';
import Deck from '../../cards/Deck.js';
import HandCards from '../../cards/HandCards.js';
import BoardGameBetUtils from './BoardGameBetUtils.js';
import {
	CHECK,
	FOLD,
	GO_TO_THE_NEXT_STAGE,
	SHOW_DOWN,
	RPE_FLOP,
	GAME_END,
} from '../../constants';

export default class BoardGame extends BoardGameBetUtils {

	start () {
		this.deck = new Deck();
		this.boardCards = new BoardCards(this.deck);
		this.gameStage = RPE_FLOP;
		this.pickUpAnte();
		this.pickUpBlinds();

		this.startForTwoPlayers();
	}

	end () {
		this.deck = null;
		this.boardCards = null;
		this.dealerPosition = this.firstPositionAfterDiller;
		this.anteBank = 0;
		this.gameBank = 0;
		this.currentBet = 0;
		this.gameStage = GAME_END;
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

	get playersInGameArr () {
		return Object.entries(this.playersInGame)
			.filter(entry => entry[1]);
	}

	get numberPlayersInGame () {
		return this.playersInGameArr.length;
	}

	get playersWhoCanMakeABet () {
		return this.playersInGameArr
			.filter(player => player.bank > 0);
	}

	win (player) {
		player.win(this.bankInGame);
		this.end();
	}

	startBettingCycle (startIndex) {

		this.forEachPlayersInGameFrom((player, index) => {

		}, startIndex);
	}

}
