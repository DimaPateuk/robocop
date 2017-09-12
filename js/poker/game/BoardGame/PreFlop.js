import {
	PRE_FLOP,
	FLOP,
	TURN,
	RIVER,
	SHOWDOWN,
	FOLD,
} from '../../constants';

export default class PreFlop {
	constructor (boardGame) {
		this.boardGame = boardGame;
		this.boardGame.on('next', (data) => console.log('next!!!!!!!', data));
		console.log('preflop');
	}

	start () {
		this.count = this.boardGame.players.length;
		const dillerPosition = this.boardGame.dillerPosition;
		if (this.boardGame.players.length === 2) {
			this.currentIndex = dillerPosition;
		} else {
			this.currentIndex = this.boardGame.getNextIndex(this.boardGame.getNextIndex(this.boardGame.getNextIndex(dillerPosition)));
		}
		this.next();
	}

	get gameStage () {
		return PRE_FLOP;
	}

	next () {
		if (this.count < 0) {
			console.log('check players bets');
			return;
		}
		if (this.boardGame.playersInGameArr.length === 1) {
			return;
		}
		this.count--;

		const player = this.boardGame.players[this.currentIndex];
		const gameStage = this.gameStage;
		const playerBetInCycle = this.boardGame.playersBets[gameStage][player.id];
		const boardCards = this.boardGame.boardCards.cards;

		console.log('111111', player.name);
		let minimalBet = this.currentBet - playerBetInCycle;
		if (this.currentBet > player.bank) {
			minimalBet = player.bank;
		}

		if (minimalBet < 0) {
			throw Error('minimalBet < 0');
		}
		player.makeDecision({
			index: this.currentIndex,
			minimalBet,
			gameStage,
			boardCards,
			bigBlind: this.bigBlind,
		}, (decision) => this.boardGame.emit('next', { decision }));


	}

	playerMadeDecision (player, decision) {
		console.log(player.name, decision);
		this.next();
	}


}
