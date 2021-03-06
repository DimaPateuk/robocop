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
		console.log('--------------- PRE_FLOP');
	}

	beforeStart () {
		console.log('--------------- BLINDS START')
		if (this.b.players.length === 2) {
			this.startForTwoPlayers();
		} else {
			this.startMoreThenTwoPlayers();
		}

		console.log('--------------- BLINDS END')

		this.b.currentBet = this.b.bigBlind;
	}

	startMoreThenTwoPlayers () {
		const bigBlind = this.b.firstAfterDillerPlayerInGame.bet(this.b.bigBlind / 2);
		const smallBlind = this.b.secondAfterDillerPlayerInGame.bet(this.b.bigBlind);

		this.b.playersBets[PRE_FLOP][this.b.firstAfterDillerPlayerInGame.id] += smallBlind;
		this.b.playersBets[PRE_FLOP][this.b.secondAfterDillerPlayerInGame.id] += bigBlind;

		this.b.pot += smallBlind + bigBlind;

	}

	startForTwoPlayers () {
		const player = this.b.firstAfterDillerPlayerInGame;
		const bigBlind = player.bet(this.b.bigBlind);
		this.b.pot += bigBlind;
		this.b.playersBets[PRE_FLOP][player.id] += bigBlind;
	}

	get gameStage () {
		return PRE_FLOP;
	}
}
