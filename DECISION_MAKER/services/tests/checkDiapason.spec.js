/* eslint no-undef: 'off' */
import { checkDiapason } from('../checkDiapason');
import Card from('../../../js/poker/cards/Card');
import {
  HEART,
  DIAMOND,
  CLUB,
  SPADE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
  ACE,
} from '../../../js/poker/constants';

describe('checkDiapason -->', () => {
  describe('should return true if diapason contains passed cards', () => {
    it('AA-22 contains two Aces', () => {
      const firstCard = new Card(ACE, SPADE);
      const secondCard = new Card(ACE, CLUB);
      const diapason = ['AA-22'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('AA contains two Aces', () => {
      const firstCard = new Card(ACE, SPADE);
      const secondCard = new Card(ACE, CLUB);
      const diapason = ['AA'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('77 contains two Aces', () => {
      const firstCard = new Card(SEVEN, SPADE);
      const secondCard = new Card(SEVEN, CLUB);
      const diapason = ['77'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('AA-22 contains two Jacks', () => {
      const firstCard = new Card(JACK, SPADE);
      const secondCard = new Card(JACK, CLUB);
      const diapason = ['AA-22'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('AA-22 contains two Four', () => {
      const firstCard = new Card(FOUR, SPADE);
      const secondCard = new Card(FOUR, CLUB);
      const diapason = ['AA-22'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('AKs-A2s contains ACE SPADE & 2 SPADE', () => {
      const firstCard = new Card(ACE, SPADE);
      const secondCard = new Card(TWO, SPADE);
      const diapason = ['AKs-A2s'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('AKs-A2s contains ACE SPADE & QUEEN SPADE', () => {
      const firstCard = new Card(ACE, SPADE);
      const secondCard = new Card(QUEEN, SPADE);
      const diapason = ['AKs-A2s'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('AKs-A2s contains ACE DIAMOND & QUEEN DIAMOND', () => {
      const firstCard = new Card(ACE, DIAMOND);
      const secondCard = new Card(FOUR, DIAMOND);
      const diapason = ['AKs-A2s'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('AKs-A2s contains ACE DIAMOND & QUEEN DIAMOND', () => {
      const firstCard = new Card(ACE, DIAMOND);
      const secondCard = new Card(TEN, DIAMOND);
      const diapason = ['AKs-A2s'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('AKs contains ACE DIAMOND & KING DIAMOND', () => {
      const firstCard = new Card(ACE, DIAMOND);
      const secondCard = new Card(KING, DIAMOND);
      const diapason = ['AKs'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('A6s contains ACE DIAMOND & SIX DIAMOND', () => {
      const firstCard = new Card(ACE, DIAMOND);
      const secondCard = new Card(SIX, DIAMOND);
      const diapason = ['A6s'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('KQs-K2s contains KING SPADE & 2 SPADE', () => {
      const firstCard = new Card(KING, SPADE);
      const secondCard = new Card(TWO, SPADE);
      const diapason = ['KQs-K2s'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('KQs-K2s contains KING SPADE & QUEEN SPADE', () => {
      const firstCard = new Card(KING, SPADE);
      const secondCard = new Card(QUEEN, SPADE);
      const diapason = ['KQs-K2s'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('KQs-K2s contains KING DIAMOND & QUEEN DIAMOND', () => {
      const firstCard = new Card(KING, DIAMOND);
      const secondCard = new Card(FOUR, DIAMOND);
      const diapason = ['KQs-K2s'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('KQs-K2s contains KING DIAMOND & QUEEN DIAMOND', () => {
      const firstCard = new Card(KING, DIAMOND);
      const secondCard = new Card(TEN, DIAMOND);
      const diapason = ['KQs-K2s'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('KJs contains KING DIAMOND & JACK DIAMOND', () => {
      const firstCard = new Card(KING, DIAMOND);
      const secondCard = new Card(JACK, DIAMOND);
      const diapason = ['KJs'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });

    it('K5s contains KING CLUB & FIVE CLUB', () => {
      const firstCard = new Card(KING, CLUB);
      const secondCard = new Card(SIX, CLUB);
      const diapason = ['K5s'];
      const result = checkDiapason(firstCard, secondCard, diapason);

      expect(result).toBeTruthy();
    });
  });
});
