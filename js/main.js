import Deck from './poker/Deck.js';
import HandCards from './poker/HandCards.js';
import BoardCards from './poker/BoardCards.js';


const deck = new Deck();

const handCards = new HandCards(deck);
const boardCards = new BoardCards(deck);


console.log('handCards', handCards.toString());

console.log();

console.log('Flop:', boardCards.showFlop());
console.log('Turn:', boardCards.showTurn().toString());
console.log('River:', boardCards.showRiver().toString());
