// на ппрефлопе не имеет значение масть.
// Ad - буба
// Ah - чирва
// As - пика
// Ac - креста
// AKQJT98765432 - картв по убыванию
// AK similar sute; AKo off sute;
//какие бывают позиции EP -> MP -> CO -> BU -> SB -> BB

class PreflopDecision {
  /**
   * @param {number} bigBlind
   * @param {string} position
   * @param {string} selfCard
   * @param {PlayerDecision[]} previousPlayersMove
  */
  constructor(bigBlind, position, selfCards, previousPlayersMove) {
    this._makeDecision(bigBlind, position, selfCards, previousPlayersMove);
  }

  _makeDecision(bigBlind, position, selfCards, previousPlayersMove) {
    this.toFold = this._shouldIFold(bigBlind, position, selfCards, previousPlayersMove);
    this.toCheck = this._shouldICheck(bigBlind, position, selfCards, previousPlayersMove);
    if (!this.toFold && !this.toCheck) {
      this._shouldIBetMoney(bigBlind, position, selfCards, previousPlayersMove);
    }
  };

  _shouldICheck(bigBlind, position, selfCards, previousPlayersMove) {
    return false;
  }

  _shouldIFold() {
    return false;
  }

  _shouldIBetMoney(bigBlind, position, selfCards, previousPlayersMove) {
    this.toRaise = false;
    this.toCall = false;
    this.moneyAmount = 0;
  }
};

export default PreflopDecision;
