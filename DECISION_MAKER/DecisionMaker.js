/* eslint import/no-unresolved: 'off' */
/* eslint import/extensions: 'off' */
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
  static _makeDecision(bigBlind, gameStage, position, selfCards, previousPlayersMove) {
    const decisions = {
      PREFLOP: PreflopDecision,
      FLOP: FlopDecision,
      TURN: TurnDecision,
      RIVER: RiverDecision,
    };
    return new decisions[gameStage](bigBlind, position, selfCards, previousPlayersMove);
  }
}

export default DecisionMaker;
