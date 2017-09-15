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

	boardGame.on('end', () => {
			boardGame.start();
	});
	boardGame.start();

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

	boardGame.on('end', () => {
			boardGame.start();
	});
	boardGame.start();

}

function testGameForSixPlayers () {
	const aPlayer = new Player (100, 'aPlayer', new DecisionMakerForTest());

	const bPlayer = new Player (100, 'bPlayer', new DecisionMakerForTest());

	const cPlayer = new Player (100, 'cPlayer', new DecisionMakerForTest());
	const dPlayer = new Player (100, 'dPlayer', new DecisionMakerForTest());
	const iPlayer = new Player (100, 'iPlayer', new DecisionMakerForTest());
	const fPlayer = new Player (100, 'fPlayer', new DecisionMakerForTest());

	const boardGame = new BoardGame([
		aPlayer,
		bPlayer,
		cPlayer,
		dPlayer,
		iPlayer,
		fPlayer,
	], 20, 1);

	boardGame.on('end', () => {
			boardGame.start();
	});

	boardGame.start();

}

export default function testBoardGame () {
	// testGameForTwoPlayers();
	// testGameForThreePlayers();
	// testGameForSixPlayers();


	const RobocopDecisionMakerForTest = new DecisionMakerForTest([
	]);
	const Robocop = new Player (100, 'Robocop', RobocopDecisionMakerForTest);

	const AnticopDecisionMakerForTest = new DecisionMakerForTest([
	]);
	const Anticop = new Player (100, 'Anticop', AnticopDecisionMakerForTest);

	const boardGame = new BoardGame([Robocop, Anticop], 20, 1);

	boardGame.on('end', () => {
			// boardGame.start();
	});

	boardGame.start();
}
