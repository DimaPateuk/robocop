import BoardGameGeneralUtils from './BoardGameGeneralUtils.js';

export default class BoardGameBetUtils extends BoardGameGeneralUtils {

	playerBet (value) {
		this.gameBank += value;
		if (value > this.currentBet) {
			this.currentBet = value;
		}
	}

	pickUpBlinds () {
		if (this.players.length === 2) {
			this.pickUpBigBlindFroTwoPlayers();
		} else {
			this.pickUpBigBlindMoreThanTwoPlayers();
			this.pickUpSmallBlind();
		}

		this.currentBet = this.bigBlind;
	}

	pickUpBigBlindFroTwoPlayers () {
		const bigBlind = this.firstPlayerAfterDiller.bet(this.bigBlind);
		console.log('big blind', this.firstPlayerAfterDiller.name, this.bigBlind);
		this.gameBank += bigBlind;
	}

	pickUpBigBlindMoreThanTwoPlayers () {
		const bigBlind = this.secondPlayerAfterDiller.bet(this.bigBlind);

		this.gameBank += bigBlind;
	}

	pickUpSmallBlind () {
		const smallBlind = this.firstPlayerAfterDiller.bet(this.smallBlind);

		this.gameBank += smallBlind;
	}

	pickUpAnte () {
		this.forEachPlayerFromDiller((player) => {
			const ante = player.ante(this.ante);

			this.anteBank += ante;
		});
	}
}
