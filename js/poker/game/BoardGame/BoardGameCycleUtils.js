import BoardGameBetUtils from './BoardGameBetUtils';
import {
	CHECK,
	FOLD,
	BET,
} from '../../constants';


export default class BoardGameCycleUtils extends BoardGameBetUtils {

	get playersInGameArr () {
		return Object.entries(this.playersInGame)
			.map(entry => entry[1])
			.filter(entry => entry);
	}

	get numberPlayersInGame () {
		return this.playersInGameArr.length;
	}

	get playersWhoCanMakeABet () {
		return this.playersInGameArr
			.filter(player => player.bank > 0);
	}

	get areAllPlayersHasTheSameBet () {
		const players = this.playersWhoCanMakeABet;
		let prevBank = players[0].bankInGame;
		for (var i = 1; i < players.length; i++) {
			if (prevBank !== players[i].bankInGame) {
				return false;
			}

			prevBank = players[i].bankInGame;
		}

		return true;
	}

	startBettingCycle (startIndex) {
		this.forEachPlayersInGameFrom((player, index) => {
			if (this.numberPlayersInGame === 1) {
				console.log('win', player);
				return;
			}
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

		if (this.numberPlayersInGame === 1) {
			return;
		}

		console.log();

		console.log(this.areAllPlayersHasTheSameBet);

		console.log(this.gameBank);
	}

}
