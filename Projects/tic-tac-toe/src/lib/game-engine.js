/**
 * Skriven av Jonas Rosberg 2020-07-05
 */
'use strict';
import { WinCondition } from './win-conditions';
import { createSquare } from './map';

/** With the map and Win Conditions out of the way, what's left for us to do is the Game Engine itself.
 * This class should take care of which turn is it, field occupation and if provided symbol won and what line was made */
export class GameEngine {
    constructor(symbols, lastWinner) {
        if(!symbol || symbols.length !== 2)
            throw Error("A game must be made of two symbols");
            this.turnOf = lastWinner
                ? lastWinner
                : Math.round(Math.random()) === 0
                    ? symbols[0]
                    : symbols[1];
            this.symbol = symbols;
            this.field = createSquare(3);
            this.winCondition = new WinCondition(this.field);
    }

     /** We created a square of 3 by 3, so we know anything beyond that is out of bounds; As well as anything bellow zero
   * so lets just go ahead and create a return statement that translate into that.
   * but first, lets check for the validity of the arguments - lets we throw an error further down because we allowed some
   * illegal input.
   * */
  isOutOfBounds(coords) {
      if(
          !coords ||
          typeof coords.row !== "number" ||
          typeof coords.column !== "number"
      )
      return true;
      return (
          coords.row > 3 || coords.row < 0 || coords.column > 3 || coords.column < 0
      );
    }
    isTurnOf(symbol) {
        return this.turnOf === symbol;
  }

  toggleTurn() {
      return (this.turnOf =
        this.turnOf === this.symbols[0] ? this.symbols[1] : this.symbols[0]);
  }

  /**
   * update the slot state to that of an occupied one with the symbol matching the turn order.
   * @param coords {Object} {row: number, column: number}
   * @returns {Object || Boolean} {occupied: boolean, symbol: string, row: number, column: number}
   */

   occupyField(coords) {
       if(this.isOutOfBounds(coords)) return false;

       let slot = this.field[coords.row][coords.column];
       if(slot.occupied) return false;

       slot.occupied = true;
       slot.symbol = this.turnOf;
       return slot;
   }

    /** A simple alias to call winCondition.hasLine with the provided symbol */
    get isWinner() {
        return this.winCondition.hasLine(this.turnOf);
    }
    get isTie() {
        return this.winCondition.tieExist;
    }
}