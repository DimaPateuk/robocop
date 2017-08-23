import BoardGameBase from './BoardGameBase.js';

export default class BoardGameGeneralUtils extends BoardGameBase {

	getNextPlayerIndex (currentIndex) {
		return currentIndex === this.players.length - 1 ? 0 : currentIndex + 1;
	}

	forEachPlayersInGameFrom (fn, startIndex) {
		this.forEachPlayerFrom((player, indexPosition) => {
			const inGame = this.playersInGame[player.id];

			if (player.bank < 0) {
				throw Error('player.bank < 0');
			}

			if (inGame && player.bank > 0) {
				fn(player, indexPosition);
			}
		}, startIndex);
	}


	forEachPlayerFromDiller (fn) {
		this.forEachPlayerFrom(fn, this.dealerPosition);
	}

	forEachPlayerFrom (fn, startIndex = 0) {
		let indexPosition = startIndex;

		for (let i = 0; i < this.players.length; i++) {
			fn(this.players[indexPosition], i);
			indexPosition = this.getNextPlayerIndex(indexPosition);
		}
	}

	get dillerPlayer () {
		return this.players[this.dealerPosition];
	}

	get firstPositionAfterDiller () {
		return this.getNextPlayerIndex(this.dealerPosition);
	}

	get firstPlayerAfterDiller () {
		return this.players[this.firstPositionAfterDiller];
	}

	get secondPositionAfterDiller () {
		let nextIndex = this.getNextPlayerIndex(this.dealerPosition);
		nextIndex = this.getNextPlayerIndex(nextIndex);

		return nextIndex;
	}

	get secondPlayerAfterDiller () {
		return this.players[this.secondPositionAfterDiller];
	}
}
