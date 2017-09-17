import {
	PRE_FLOP,
	FLOP,
	TURN,
	RIVER,
	SHOWDOWN,
	FOLD,
} from '../../constants';
import BaseStage from './BaseStage';

export default class River extends BaseStage {
	constructor (boardGame) {
		super(boardGame);
		this.b.stageCards[this.gameStage] = this.b.boardCards.drawRiver();
		console.log('--------------- RIVER');
	}

	get gameStage () {
		return RIVER;
	}
}
