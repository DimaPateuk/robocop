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


const RobocopDecisionMakerForTest = new DecisionMakerForTest([
	BET,
]);


const Robocop = new Player (100, 'Robocop', RobocopDecisionMakerForTest);


const AnticopDecisionMakerForTest = new DecisionMakerForTest([
	CHECK,
]);


const Anticop = new Player (100, 'Anticop', AnticopDecisionMakerForTest);

const boardGame = new BoardGame([Robocop, Anticop], 10, 20, 1);


// console.log(Robocop.handCards.toString());
// console.log(Anticop.handCards.toString());

export default () => {
	// while(Robocop.bank !== 0 || Anticop.bank !== 0) {
		boardGame.start();
		boardGame.start();
		// boardGame.start();
		// boardGame.start();
	// }
};
