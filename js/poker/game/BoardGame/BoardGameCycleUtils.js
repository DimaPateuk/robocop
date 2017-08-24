import BoardGameBetUtils from './BoardGameBetUtils';
import {
	CHECK,
	FOLD,
	BET,
} from '../../constants';


export default class BoardGameCycleUtils extends BoardGameBetUtils {

	get playersInGameArr () {
		return Object.entries(this.playersInGame)
			.filter(entry => entry[1]);
	}

	get numberPlayersInGame () {
		return this.playersInGameArr.length;
	}

	get playersWhoCanMakeABet () {
		return this.playersInGameArr
			.filter(player => player.bank > 0);
	}

	startBettingCycle (startIndex) {
		this.forEachPlayersInGameFrom((player, index) => {
			const decision = player.makeDecision(this.currentBet, index, this.gameStage);

			if (decision === FOLD) {
				this.playersInGame[player.id] = false;
				return;
			}

			if (decision === CHECK) {
				return;
			}

			this.playerBet(decision);
		}, startIndex);

		console.log(this.gameBank);
	}

}
