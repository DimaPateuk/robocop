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

export default () => {
	const RobocopDecisionMakerForTest = new DecisionMakerForTest([
	]);
	const Robocop = new Player (100, 'Robocop', RobocopDecisionMakerForTest);

	const AnticopDecisionMakerForTest = new DecisionMakerForTest([
	]);
	const Anticop = new Player (100, 'Anticop', AnticopDecisionMakerForTest);


	const CopDecisionMakerForTest = new DecisionMakerForTest([
	]);
	const Cop = new Player (100, 'Cop', CopDecisionMakerForTest);

	const boardGame = new BoardGame([Robocop, Anticop, Cop], 10, 20, 1);

	boardGame.start();

	// while (boardGame.players.length !== 1) {
	// 	boardGame.start();
	// }
};
