import PreflopDecision from './gameStagesDecisions/PreflopDecision.js';
import FlopDecision from './gameStagesDecisions/FlopDecision.js';
import TurnDecision from './gameStagesDecisions/TurnDecision.js';
import RiverDecision from './gameStagesDecisions/RiverDecision.js';

/**
 * @typedef {Object} PlayerDecision
 * @param {string} position
 * @param {number} moneyAmount
*/

/**
 * @typedef {Decision} PlayerDecision
 * @param {boolean} toFold
 * @param {boolean} toCheck
 * @param {boolean} toCall
 * @param {boolean} toRaise
 * @param {number} moneyAmount
*/

class DecisionMaker {
  /**
   * @param {number} bigBlind
   * @param {string} gameStage
   * @param {string} position
   * @param {string} selfCard
   * @param {PlayerDecision[]} previousPlayersMove
  */
  constructor(bigBlind, gameStage, position, selfCards, previousPlayersMove) {
    this.decision = this._makeDecision(bigBlind, gameStage, position, selfCards, previousPlayersMove);
  }

  /**
   * @param {number} bigBlind
   * @param {string} gameStage
   * @param {string} position
   * @param {string} selfCard
   * @param {PlayerDecision[]} previousPlayersMove
   * return {Decision} A decision to the game stage
  */
  _makeDecision(bigBlind, gameStage, position, selfCards, previousPlayersMove) {
    switch(gameStage) {
      case 'PREFLOP':
        return new Preflop(bigBlind, position, selfCards, previousPlayersMove);
      case 'FLOP' :
        return new Flop(bigBlind, position, selfCards, previousPlayersMove);
      case 'TURN' :
        return new Turn(bigBlind, position, selfCards, previousPlayersMove);
      case 'RIVER' :
        return new River(bigBlind, position, selfCards, previousPlayersMove);
    }
  }
};
