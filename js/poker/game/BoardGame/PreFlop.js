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

	getInitialIndex () {
		let result;

		if (this.b.players.length === 2) {
			result = this.b.dillerPosition;
		} else {
			result = this.b.thirdAfterDilerIndex;
		}

		return result;
	}

	get gameStage () {
		return PRE_FLOP;
	}
}
