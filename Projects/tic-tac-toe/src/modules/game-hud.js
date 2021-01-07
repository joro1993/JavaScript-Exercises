import { GameEngine } from '../lib/game-engine';
import { GameField } from '../component/game-field';
import { Notice } from '../component/notice';
import { TurnInformation } from '../component/turn-information';

/** The GameHud class is what wraps all Componenets into the DOM as well as being responsible for the interaction
 * between the use interface and the Game Engine */
export class GameHud {
    constructor() {
        this.turns = null;
        this.gameEngine = null;
        this.gameField = null;
        this.turnInfo = new TurnInformation();

        document.body.appendChild(this.turnInfo.element);
        this.createGameField(false);
    }

    createGameField(lastWinner = "x") {
        this.turns = 0;
        this.gameEngine = new GameEngine(["x", "o"], lastWinner);

    /** if the GameField component exists in the page, remove that child from the body so we can
     * insert a new, clean, one. */
        const oldGameField = document.querySelector('game-field');
        if (oldGameField) document.body.removeChild(oldGameField);

        /** create a new GameField component */
        this.gameField = new GameField(this.gameEngine.field);

         /** We attach the click event to our GameSlots so we can click and have them actually work */
         this.gameField.items.forEach(row => {
             row.items.forEach(slot => {
                 slot.element.addEventListener("click", element => 
                 this.occupyField(element)
                 );
             });
         });

         /** Append the GameField element to the body of the page */
         document.body.appendChild(this.gameField.element);

         /** Show a notice to the use and update the turn information via our TurnInfo alias */
         new Notice(`Game Start! First to Play: ${this.gameEngine.turnOf}`, 3000);
         this.turnInfo.update(this.turns, this.gameEngine.turnOf);
    }

    get isGameEnd() {
        return this.gameEngine.isWinner || this.gameEngine.isTie;
    }

    /** The HUD Processing of game end is responsible for showing the game end notices and restart the game after Xseconds */
    processGameEnd() {
        let winner = false;
        if (this.gameEngine.isWinner) {
            new Notice(
                `Game End! Winner is ${this.gameEngine.turnOf}! Game took ${
                    this.turns
                } turns`,
                1500 
            );
            winner = this.gameEngine.turnOf;
        } else if (this.gameEngine.isTie) {
            new Notice(`Game End! It's a Tie! Game took ${this.turns} turns`, 1500);
        }

        setTimeout(() => {
            this.createGameField(winner);
        }, 1500);
    }

    /** Occupying a field in the HUD is made by calling the same function on the GameEngine end of things and working
   * with the output to update the interface. We grab the slot row/column from the clicked element and then
   * send it to GameEngine.
   *
   * We know that if occupying a field returns false then the occupation is impossible, we show that to the user.
   * Otherwise, we increment the turn, check if it's game end and if true process it, otherwise call the turn toggle
   * function from gameEngine and update the TurnInformation element. */
  occupyField(element) {
      let coords = {
          row: parseInt(element.target.getAttribute("slot-row"), 10),
          column: parseInt(element.target.getAttribute("slot-column"), 10)
      };

      let turnAction = this.gameEngine.occupyField(coords);
      if(!turnAction) {
          new Notice("This field is already occupied");
          return;
      }

      this.turns++;

      if(this.isGameEnd) {
          this.processGameEnd();
      } else {
          this.gameEngine.toggleTurn();
          this.turnInfo.update(this.turns, this.gameEngine.turnOf);
      }

      this.gameField
        .getItem(turnAction.row)
        .getItem(turnAction.column).textContent = turnAction;
  }
}