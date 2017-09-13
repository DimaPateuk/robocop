import {
	PRE_FLOP,
	FLOP,
	TURN,
	RIVER,
	SHOWDOWN,
	FOLD,
} from '../../constants';

export default class BaseStage {
	constructor (boardGame) {
		this.b = boardGame;

		this.next = this.next.bind(this);
		this.nextHandler = this.nextHandler.bind(this);
		this.nextPlayerTurnHandler = this.nextPlayerTurnHandler.bind(this);

		this.b.on('playerMadeDecision', this.nextHandler);
		this.b.on('nextPlayerTurn', this.nextPlayerTurnHandler);

	}

	nextPlayerTurnHandler () {
		const prev = this.currentIndex;
		this.currentIndex = this.b.getNextPlayer(this.currentIndex).index;
		if (prev === this.currentIndex) {
			throw Error('prev === this.currentIndex');
		}
		this.next();
	}

	nextHandler (data) {
		const {
			player,
			decision,
			minimalBet,
			playerBetInCycle,
		} = data;

		if (decision === FOLD) {
			this.b.playersInGame[player.id] = null;
			this.b.emit('nextPlayerTurn');

			return;
		}

		if (decision < minimalBet) {
			throw Error('decision < minimalBet');
		}

		this.b.playersBets[this.gameStage][player.id] += decision;
		this.b.pot += decision;

		const nextBet = playerBetInCycle + decision;

		if (nextBet > this.b.currentBet) {
			this.b.currentBet = nextBet;
		}

		this.b.emit('nextPlayerTurn');
	}

	start () {
		this.cycleCount = this.b.players.length;
		this.currentIndex = this.getInitialIndex();
		this.next();
	}

	next () {
		if (this.cycleCount === 0) {
			const allBetsInStage = this.b.playersBets[this.gameStage];
			const betsInStage = this.b.playersInGameWithBankArr
				.map(player => allBetsInStage[player.id]);

			const continueBetting = !betsInStage.every((value) => value === this.b.currentBet);
			if (continueBetting) {
				this.cycleCount = this.b.players.length;
			} else {
				this.b.offAll();
				this.b.nextStage();
				return;
			}
		}

		const playersInGameArr = this.b.playersInGameArr;
		if (playersInGameArr.length === 1) {
			console.log('all players folded');
			this.b.winBecauseAllFolded(playersInGameArr[0]);
			this.b.offAll();
			return;
		}

		this.cycleCount--;

		const player = this.b.players[this.currentIndex];
		const playerBank = player.bank;

		if (playerBank === 0) {
			this.b.emit('nextPlayerTurn');
			return;
		}

		if (playerBank < 0) {
			throw Error('playerBank < 0');
		}

		const playerBetInCycle = this.b.playersBets[this.gameStage][player.id];
		const boardCards = this.b.boardCards.cards;
		const minimalBet = this.b.currentBet > playerBank ?
			playerBank :
			this.b.currentBet - playerBetInCycle;

		if (minimalBet < 0) {
			throw Error('minimalBet < 0');
		}

		player.makeDecision({
			boardCards,
			minimalBet,
			index: this.currentIndex,
			bigBlind: this.bigBlind,
			gameStage: this.gameStage,
		}, (decision) => this.b.emit('playerMadeDecision', { decision, player, minimalBet, playerBetInCycle }));
	}

	getInitialIndex () {
		throw Error('not implemented exeption');
	}
}
