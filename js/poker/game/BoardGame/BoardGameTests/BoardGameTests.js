import BoardGame from '../BoardGame.js';
import Player from '../../../Player.js';
import DecisionMakerForTest from '../../../DecisionMakerForTest';
import {
	CHECK,
	FOLD,
	CALL,
	BET,
	ALL_IN,
	RAISE,
} from '../../../constants';

function testGameForTwoPlayers() {
	const RobocopDecisionMakerForTest = new DecisionMakerForTest([
	]);
	const Robocop = new Player (100, 'Robocop', RobocopDecisionMakerForTest);

	const AnticopDecisionMakerForTest = new DecisionMakerForTest([
	]);
	const Anticop = new Player (100, 'Anticop', AnticopDecisionMakerForTest);

	const boardGame = new BoardGame([Robocop, Anticop], 20, 1);

	while (boardGame.players.length !== 1) {
		boardGame.start();
	}
}

function testGameForThreePlayers () {
	const RobocopDecisionMakerForTest = new DecisionMakerForTest([
	]);
	const Robocop = new Player (100, 'Robocop', RobocopDecisionMakerForTest);

	const AnticopDecisionMakerForTest = new DecisionMakerForTest([
	]);
	const Anticop = new Player (100, 'Anticop', AnticopDecisionMakerForTest);

	const CopDecisionMakerForTest = new DecisionMakerForTest([
	]);
	const Cop = new Player (100, 'Cop', CopDecisionMakerForTest);

	const boardGame = new BoardGame([Robocop, Anticop, Cop], 20, 1);

	while (boardGame.players.length !== 1) {
		boardGame.start();
	}
}

function testGameForSixPlayers () {
	const aPlayer = new Player (100, 'aPlayer');

	const bPlayer = new Player (100, 'bPlayer');

	const cPlayer = new Player (100, 'cPlayer');
	const dPlayer = new Player (100, 'dPlayer');
	const iPlayer = new Player (100, 'iPlayer');
	const fPlayer = new Player (100, 'fPlayer');

	const boardGame = new BoardGame([
		aPlayer,
		bPlayer,
		cPlayer,
		dPlayer,
		iPlayer,
		fPlayer,
	], 20, 1);

	while (boardGame.players.length !== 1) {
		boardGame.start();
	}
}


export default function testBoardGame () {
	// for (var i = 0; i < 10; i++) {
	// 	testGameForTwoPlayers();
	// 	testGameForThreePlayers();
	// 	testGameForSixPlayers();
	// }


	const RobocopDecisionMakerForTest = new DecisionMakerForTest([
	]);
	const Robocop = new Player (100, 'Robocop', RobocopDecisionMakerForTest);

	const AnticopDecisionMakerForTest = new DecisionMakerForTest([
	]);
	const Anticop = new Player (100, 'Anticop', AnticopDecisionMakerForTest);

	const boardGame = new BoardGame([Robocop, Anticop], 20, 1);

	boardGame.start();

	boardGame.on('end', () => {
		if (boardGame.players.length === 1) {
			console.log('game END !!!!!!!!!');
			console.log(boardGame.players[0].name, 'winner');

			return;
		}

		boardGame.start();
	});

}
