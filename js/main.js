import Game from './poker/game/BoardGame/BoardGame.js';
import Player from './poker/Player.js';


const firstPlayer = new Player (100, 'Robocop');
const secondPlayer = new Player (100, 'Anticop');

const game = new Game([firstPlayer, secondPlayer], 10, 20, 1);

game.start();


console.log(game);

