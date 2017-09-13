
export default class BoardGameUtils {

	constructor () {
		this._subscriptions = {};
	}

	on (eventName, cb) {
		if (!this._subscriptions[eventName]) {
			this._subscriptions[eventName] = [cb];
		} else {
			this._subscriptions[eventName].push(cb);
		}

		return () => this.off(eventName, cb);
	}

	off (eventName, cb) {
		const arr = this._subscriptions[eventName];

		if (!cb) {
			this._subscriptions[eventName] = [];
			return;
		}

		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === cb) {
				arr.splice(i, 1);
				return;
			}
		}
	}

	offAll () {
		this._subscriptions = {};
	}

	emit (eventName, data) {
		const arr = this._subscriptions[eventName] || [];
		for (let i = 0; i < arr.length; i++) {
			(function (index) {
				setTimeout(() => arr[index](data), 1);
			})(i);
		}
	}

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

			if (player.bank < 0) {
				throw Error(player.bank < 0);
			}

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

	get playersInGameWithBankArr () {
		return this.playersInGameArr
			.filter(player => player.bank);
	}


	get thirdAfterDilerIndex () {
		return this.getNextIndex(this.getNextIndex(this.getNextIndex(this.dillerPosition)));
	}
}
