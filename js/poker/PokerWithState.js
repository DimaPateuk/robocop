var createStages = () => [PreFlop, Flop, Turn, River, Showdown];

var Poker = function () {
	var stages = createStages();

	var stage = stages.shift();
	var currentState = new stage(this);

	this.nextStage = function () {

		if (!stages.length) {

			return;
		}
		var stage = stages.shift();
		currentState = new stage(this);
		currentState.start();
	};

	this.start = function () {
		currentState.start();
	};
};

var PreFlop = function (Poker) {
	this.poker = Poker;

	console.log('PreFlop');

	this.next = function () {
		this.poker.nextStage();
	};

	this.start = function () {
		this.poker.nextStage();
	};

};

var Flop = function (Poker) {
	this.poker = Poker;

	console.log('Flop');

	this.next = function () {
		this.poker.nextStage();
	};

	this.start = function () {
		this.poker.nextStage();
	};

};

var Turn = function (Poker) {
	this.poker = Poker;

	console.log('Turn');

	this.next = function () {
		this.poker.nextStage();
	};

	this.start = function () {
		this.poker.nextStage();
	};

};

var River = function (Poker) {
	this.poker = Poker;

	console.log('River');

	this.next = function () {
		this.poker.nextStage();
	};

	this.start = function () {
		this.poker.nextStage();
	};

};

var Showdown = function (Poker) {
	this.poker = Poker;

	console.log('Showdown');

	this.next = function () {
		this.poker.nextStage();
	};

	this.start = function () {
		this.poker.nextStage();
	};
};


var poker = new Poker();

poker.start();
