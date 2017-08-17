// import Game from './poker/game/BoardGame/BoardGame.js';
// import Player from './poker/Player.js';


// const firstPlayer = new Player (100, 'Robocop');
// const secondPlayer = new Player (100, 'Anticop');

// const game = new Game([firstPlayer, secondPlayer], 10, 20, 1);

// game.start();


// console.log(firstPlayer.handCards.toString());
// console.log(secondPlayer.handCards.toString());

import { isRoyalFlush } from './poker/combinations/RoyalFlush';
import { isStraightFlush } from './poker/combinations/StraightFlush';
import { isFourOfAKind } from './poker/combinations/FourOfAKind';
import { isFullHouse } from './poker/combinations/FullHouse';
import { isStraight } from './poker/combinations/Straight';
