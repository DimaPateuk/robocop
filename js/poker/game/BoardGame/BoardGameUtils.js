export default class BoardGameUtils {
	getNextIndex (index) {
		const nextIndex = index + 1;
		return nextIndex === this.players.length ? 0 : nextIndex;
	}

	getNextPlayer (index) {
		index = this.getNextIndex(index);
		let player = this.players[index];

		while (!this.playersInGame[player.id]) {
			index = this.getNextIndex(index);
			player = this.players[index];
		}

		return {
			player,
			index
		};
	}

	get firstAfterDillerPlayerInGame () {
		return this.getNextPlayer(this.dillerPosition).player;
	}

	get secondAfterDillerIndex () {
		return this.getNextPlayer(this.getNextPlayer(this.dillerPosition).index).player;
	}

	foreEachPlayerFrom (fn, index = this.dillerPosition) {
		for (var i = 0; i < this.players.length; i++) {
			const player = this.players[index];
			if (this.playersInGame[player.id]) {
				fn(player, index);
			}
			index = this.getNextIndex(index);
		}
	}
}
