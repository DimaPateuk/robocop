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


let boardGameId = 0;
let gameId = 0;



const createStages = () => [PreFlop/*, Flop, Turn, River, Showdown*/];

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
		this.offAll();
		this.stages = createStages();

		const stage = this.stages.shift();
		this.currentState = new stage(this);

		console.log('------------------');
		console.log('game preparation');
		console.log('------------------');

		this.countGames++;
		if (this.countGames % 50 === 0) {
			this.bigBlind *= 2;
			this.ante *= 2;
		}

		this.players = this.players.filter(player => player.bank > 0);
		if (this.players.length === 1) {
			console.log('ONLY ONE PLAYER IN GAME');
			return;
		}
		this.dillerPosition = this.getNextIndex(this.dillerPosition);
		console.log('dillerPosition:', this.dillerPosition, this.players[this.dillerPosition].name);
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
			console.log('!!!!!! no Stages');
			return;
		}

		const stage = this.stages.shift();
		this.currentState = new stage(this);
		this.currentState.start();
	}
}
