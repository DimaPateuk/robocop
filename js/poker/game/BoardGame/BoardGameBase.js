export default class BoardGameBase {
	constructor (players, smallBlind, bigBlind, ante = 0) {
		this.players = players;
		this.dealerPosition = 0;
		this.gameBank = 0;
		this.smallBlind = smallBlind;
		this.bigBlind = bigBlind;
		this.ante = ante;

		this.deck = null;
		this.boardCards = null;
	}
}
