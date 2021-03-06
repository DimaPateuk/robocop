import BoardCards from '../../cards/BoardCards.js';
import Deck from '../../cards/Deck.js';
import HandCards from '../../cards/HandCards.js';
import BoardGameUtils from './BoardGameUtils.js';
import CardsInfo from '../../combinations/CardsInfo';

import {
	PRE_FLOP,
	FLOP,
	TURN,
	RIVER,
	SHOWDOWN,
	FOLD,
} from '../../constants';

import sortBy from 'lodash/sortBy';
import maxBy from 'lodash/maxBy';
import sumBy from 'lodash/sumBy';

import PreFlop from './PreFlop';
import Flop from './Flop';
import Turn from './Turn';
import River from './River';
import Showdown from './Showdown';

let boardGameId = 0;
let gameId = 0;

const createStages = () => [PreFlop, Flop, Turn, River, Showdown];

export default class BoardGame extends BoardGameUtils {

	constructor (players, bigBlind, ante = 0) {
		super();

		this.id = boardGameId++;

		this.players = players.filter(player => player.bank > 0);
		this.bigBlind = bigBlind;
		this.ante = ante;
		this.dillerPosition = 0;

		this.countGames = 0;
	}

	start () {
		this.players = this.players.filter(player => player.bank > 0);
		if (this.players.length === 1) {
			console.log('ONLY ONE PLAYER IN GAME');
			return;
		}

		this.id++;
		console.log(`--------------- GAME ${this.id} started`);

		this.stages = createStages();

		const stage = this.stages.shift();
		this.currentState = new stage(this);
		this.countGames++;
		if (this.countGames % 50 === 0) {
			this.bigBlind *= 2;
			this.ante *= 2;
		}

		this.dillerPosition = this.getNextIndex(this.dillerPosition);
		this.gameId = gameId++;
		this.deck = new Deck();
		this.boardCards = new BoardCards(this.deck);
		this.pot = 0;
		this.anteInGame = 0;
		this.playersInGame = {};
		this.playersBets = {
			[PRE_FLOP]: {},
			[FLOP]: {},
			[TURN]: {},
			[RIVER]: {},
		};
		this.stageCards = {
			[PRE_FLOP]: [],
			[FLOP]: [],
			[TURN]: [],
			[RIVER]: [],
		};

		this.players.forEach((player, index) => {
			player.bankInGame = 0;
			const ante = player.ante(this.ante);

			if (ante <= 0) {
				throw Error('ante <= 0');
			}

			this.anteInGame += ante;

			this.playersInGame[player.id] = {
				index,
				player,
			};

			this.playersBets[PRE_FLOP][player.id] = 0;
			this.playersBets[FLOP][player.id] = 0;
			this.playersBets[TURN][player.id] = 0;
			this.playersBets[RIVER][player.id] = 0;

			player.setHandCards(new HandCards(this.deck));
		});


		this.currentState.start();
	}

	nextStage () {

		if (!this.stages.length) {
			throw Error('!!!!!! no Stages');
		}

		const stage = this.stages.shift();
		this.currentState = new stage(this);
		this.currentState.start();
	}

	winBecauseAllFolded (winner) {
		winner.bank += this.pot + this.anteInGame;
		console.log(`--------------- winner ${winner.name}: ${winner.bank}`);
		console.log('--------------- Game END');
		this.emit('end');
	}
}
