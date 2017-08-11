import BoardGameGeneralUtils from './BoardGameGeneralUtils.js';

export default class BoardGameBetUtils extends BoardGameGeneralUtils {

	pickUpBigBlind () {
			let player = this.secondPlayerBeforeDiller || this.firstPlayerBeforeDiller;
			const bigBlind = player.bet(this.bigBlind)

			this.gameBank += bigBlind;
	}

	pickUpSmallBlind () {
			const smallBlind = this.firstPlayerBeforeDiller.bet(this.smallBlind)

			this.gameBank += smallBlind;
	}

	pickUpAnte () {
		this.forEachFromDiller((player) => {
			const ante = player.ante(this.ante);

			this.gameBank += ante;
		});
	}
}
