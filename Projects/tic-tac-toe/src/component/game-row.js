import { ListComponent } from '../lib/list-component';
import { GameSlot } from './game-slots';

/** GameRow is responsible for iterating the rows and creating the respective GameSlot, much like GameField */
export class GameRow extends ListComponent {
    /** Again, we will speak about these arguments further on, for now: row is an Array of slots
   * which can be iterated
   */
    constructor(row) {
        super("game-row");
        let gameSlot;
        this.items = [];
        this.element.setAttribute('style', 'display: block;');

        row.forEach(slot => {
            gameSlot = new gameSlot(slot);
            this.element.apppendChild(gameSlot.element);
            this.items.push(gameSlot);
        });
    }
}