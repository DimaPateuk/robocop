import {
	PRE_FLOP,
	FLOP,
	TURN,
	RIVER,
	SHOWDOWN,
	FOLD,
} from '../../constants';
import BaseStage from './BaseStage';

export default class Showdown extends BaseStage {
	constructor (boardGame) {
		super(boardGame);
		console.log('TURN');
	}

	start () {
		console.log('---------------------');
		console.log('Game stage - "showdown');
		console.log(`board cards - ${this.b.boardCards.toStringAll()}`);
		this.b.playersInGameArr.forEach(player => {
			console.log(`${player.name} - ${player.handCards.toString()}`);
		});
		console.log('---------------------');
	}

	get gameStage () {
		return Showdown;
	}
}
