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

const maxCardCountOnBoard = 5;
const fakeGameCount = 10000;

export default class FunnyDecisionMaker {
	makeDecision (gameInfo) {
		const {
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



		console.log(info.win / fakeGameCount);
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
