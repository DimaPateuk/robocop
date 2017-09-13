import {
	PRE_FLOP,
	FLOP,
	TURN,
	RIVER,
	SHOWDOWN,
	FOLD,
} from '../../constants';
import BaseStage from './BaseStage';

export default class Turn extends BaseStage {
	constructor (boardGame) {
		super(boardGame);
		this.b.stageCards[this.gameStage] = this.b.boardCards.drawTurn();
		console.log('TURN');
	}

	get gameStage () {
		return TURN;
	}
}
