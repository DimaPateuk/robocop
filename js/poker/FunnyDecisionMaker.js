import {
	CHECK,
	FOLD,
	CALL,
	BET,
	ALL_IN,
	RAISE,
} from './constants';
import CardsInfo from './combinations/CardsInfo';
import Deck from './cards/Deck';
import maxBy from 'lodash/maxBy';
import min from 'lodash/min';

const maxCardCountOnBoard = 5;
const fakeGameCount = 10000;

export default class FunnyDecisionMaker {
	makeDecision (gameInfo) {
		const {
			pot,
			index,
			player,
			bigBlind,
			gameStage,
			minimalBet,
			boardCards,
			oponentsCount,
		} = gameInfo;

		const info = {
			moreThenOneWinner: 0,
			win: 0,
			lose: 0,
		};

		for (let i = 0; i < fakeGameCount; i++) {
			info[this.makeFakeGame(gameInfo)]++;
		}

		const win = info.win / fakeGameCount;
		const lose = 1 - win;

		const EVOneMinimalBet = win * pot - lose * minimalBet;

		console.log(`FunnyDecisionMaker: ${player.name} | pot: ${pot} | win reate: ${info.win / fakeGameCount}`);

		if (this.shouldIFold(minimalBet, bigBlind, win)) {
			return FOLD;
		}

		// return minimalBet;
		if (EVOneMinimalBet < 0) {
			console.log(`FunnyDecisionMaker: EV: ${EVOneMinimalBet}`)
			return minimalBet === 0 ? 0 : FOLD;
		}

		let minBet = minimalBet || min([bigBlind, player.bank]);
		let perspectiveBet = minBet;
		let prevEV = EVOneMinimalBet;

		while (true) {
			const nextPerspectiveBet = perspectiveBet + minBet;
			const EV = win * pot - lose * nextPerspectiveBet;

			if (EV > 0) {
				perspectiveBet = nextPerspectiveBet;
				prevEV = EV;
			} else {
				const result = min([perspectiveBet, player.bank]);
				console.log(`FunnyDecisionMaker: EV: ${prevEV} | perspectiveBet: ${perspectiveBet} | result bet: ${result}`)
				return result;
			}
		}
	}

	shouldIFold (minimalBet, bigBlind, win) {
		return (minimalBet > bigBlind * 2 && win < 0.5) ||
			(minimalBet > bigBlind * 3 && win < 0.6);
	}

	makeFakeGame (gameInfo) {
		const {
			index,
			player,
			bigBlind,
			gameStage,
			minimalBet,
			boardCards,
			oponentsCount,
		} = gameInfo;

		const boardCardWithPlayerCard = boardCards.concat(player.handCards.cards);
		const neededCardForFullSet = maxCardCountOnBoard - boardCards.length;
		const randomCard = Deck.DrawRandomCards(oponentsCount * 2 + neededCardForFullSet, boardCardWithPlayerCard);
		const boardCardsWithRandomCards = boardCards.concat(randomCard.splice(0, neededCardForFullSet));
		const resultBoardCardWithPlayerCard = boardCardsWithRandomCards.concat(player.handCards.cards);
		const heighCombinatoinInfos = [new CardsInfo(resultBoardCardWithPlayerCard).heighCombinatoinInfo];
		for (let i = 0; i < oponentsCount; i++) {
			const cards = boardCardsWithRandomCards.concat(randomCard.splice(0, 2));
			heighCombinatoinInfos.push(new CardsInfo(cards).heighCombinatoinInfo);
		}

		const winner = maxBy(heighCombinatoinInfos, 'power');

		if (heighCombinatoinInfos[0].power === winner.power) {
			const moreThenOneWinner = heighCombinatoinInfos
				.slice(1)
				.some(info => winner.power === info.power);

			return moreThenOneWinner ? 'moreThenOneWinner' : 'win';

		}

		return 'lose';

	}

}
