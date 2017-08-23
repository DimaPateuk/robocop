import BoardGameGeneralUtils from './BoardGameGeneralUtils.js';

export default class BoardGameBetUtils extends BoardGameGeneralUtils {

	pickUpBlinds () {
		if (this.players.length === 2) {
			this.pickUpBigBlindFroTwoPlayers();
		} else {
			this.pickUpBigBlindMoreThanTwoPlayers();
			this.pickUpSmallBlind();
		}
	}

	pickUpBigBlindFroTwoPlayers () {
		const bigBlind = this.firstPlayerAfterDiller.bet(this.bigBlind);

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

			this.gameBank += ante;
		});
	}
}
