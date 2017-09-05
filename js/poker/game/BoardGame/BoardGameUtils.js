export default class BoardGameUtils {
	getNextIndex (index) {
		const nextIndex = index + 1;
		return nextIndex >= this.players.length ? 0 : nextIndex;
	}

	getNextPlayer (index) {
		index = this.getNextIndex(index);
		let player = this.players[index];

		while (!player || !this.playersInGame[player.id]) {
			index = this.getNextIndex(index);
			player = this.players[index];
		}

		return {
			player,
			index,
		};
	}

	get firstAfterDillerPlayerInGame () {
		return this.getNextPlayer(this.dillerPosition).player;
	}

	get secondAfterDillerPlayerInGame () {
		return this.getNextPlayer(this.getNextPlayer(this.dillerPosition).index).player;
	}

	foreEachPlayerFromWithBank (fn, index = this.dillerPosition) {
		for (var i = 0; i < this.players.length; i++) {
			const player = this.players[index];
			if (this.playersInGame[player.id] && player.bank > 0) {
				fn(player, index);
			}
			index = this.getNextIndex(index);
		}
	}

	get playersInGameArr () {
		return Object.entries(this.playersInGame)
			.filter(entry => entry[1])
			.map(entry => entry[1].player);
	}
}
