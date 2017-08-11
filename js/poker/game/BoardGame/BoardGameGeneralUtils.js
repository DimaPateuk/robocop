import BoardGameBase from './BoardGameBase.js';

export default class BoardGameGeneralUtils extends BoardGameBase {
	getNextPlayerIndex(currentIndex) {
		return currentIndex === this.players.length - 1 ? 0 : currentIndex + 1;
	}

	forEachFromDiller(fn) {
		let indexPosition = this.dealerPosition;

		for (let i = 0; i < this.players.length; i++) {
			fn(this.players[indexPosition]);
			indexPosition = this.getNextPlayerIndex(indexPosition);
		}
	}

	get dillerPlayer () {
		return this.players[this.dealerPosition];
	}

	get firstPlayerBeforeDiller () {
		return this.players[this.dealerPosition + 1];
	}

	get secondPlayerBeforeDiller () {
		return this.players[this.dealerPosition + 2];
	}
}
