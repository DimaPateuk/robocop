import {
	PRE_FLOP,
	FLOP,
	TURN,
	RIVER,
	SHOWDOWN,
	FOLD,
} from '../../constants';
import BaseStage from './BaseStage';

export default class Flop extends BaseStage {
	constructor (boardGame) {
		super(boardGame);
		this.b.stageCards[this.gameStage] = this.b.boardCards.drawFlop();
		console.log('flop');
	}

	get gameStage () {
		return FLOP;
	}
}
