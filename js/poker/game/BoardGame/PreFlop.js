import {
	PRE_FLOP,
	FLOP,
	TURN,
	RIVER,
	SHOWDOWN,
	FOLD,
} from '../../constants';
import BaseStage from './BaseStage';

export default class PreFlop extends BaseStage {
	constructor (boardGame) {
		super(boardGame);
		console.log('preflop');
	}

	beforeStart () {
		if (this.b.players.length === 2) {
			this.startForTwoPlayers();
		} else {
			this.startMoreThenTwoPlayers();
		}

		this.b.currentBet = this.b.bigBlind;
	}

	startMoreThenTwoPlayers () {
		console.log('------------------');
		console.log(`GAME ${this.b.gameId} started`);
		console.log('for more then two players');
		this.b.playersInGameArr.forEach(player => {
			console.log(player.name);
		});
		console.log('------------------');
		this.b.firstAfterDillerPlayerInGame.bet(this.b.bigBlind / 2);
		this.b.secondAfterDillerPlayerInGame.bet(this.b.bigBlind);

		this.b.playersBets[PRE_FLOP][this.b.firstAfterDillerPlayerInGame.id] += this.b.bigBlind / 2;
		this.b.playersBets[PRE_FLOP][this.b.secondAfterDillerPlayerInGame.id] += this.b.bigBlind;

		this.b.pot += this.b.bigBlind + this.b.bigBlind / 2;
	}

	startForTwoPlayers () {
		console.log('------------------');
		console.log(`GAME ${this.b.gameId} started`);
		console.log('for two players');
		this.b.playersInGameArr.forEach(player => {
			console.log(player.name);
		});
		console.log('------------------');
		const player = this.b.firstAfterDillerPlayerInGame;
		const bigBlind = player.bet(this.b.bigBlind);
		this.b.pot += bigBlind;
		this.b.playersBets[PRE_FLOP][player.id] += this.b.bigBlind;
	}

	get gameStage () {
		return PRE_FLOP;
	}
}
