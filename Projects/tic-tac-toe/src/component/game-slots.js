import { WritableComponent } from '../lib/writable-component';

/** GameSlot is the class that's responsible to maintaign visual correlation between the GameEngine and the GameHud
 * Because this holds but the structure of the Component, we should refrain from making eventListeners here - unless
 * we want some special functionality that's not related to the HUD to happen (and even then, only if you can't write
 * that method into a Model or Service)
 * */

 export class GameSlots extends WritableComponent {
    /** This class take slot as an argument; this will be made further on, on the GameEngine library
   * for now, we need only worry that this Object will have, in the future, to be populated with
   * {row: number, column: number} and that even further down, it will have a symbol property
   */
    constructor(slot) {
        super('game-slot');
    /** We set the style of the element after calling its super class and since we know this.element is a DOM Node
     * we can call all the browser functionalities on it - namely setAttibute()
     */
        this.element.setAttribute(
            "style",
            "height: 60px; width: 60px; background-color: grey; display: inline-block; " +
            "border: 1px solid black; margin: 5px; font-size: large; color: black; line-height: 60px;" +
            "text-align: center; cursor: pointer"
        );

        this.element.setAttribute('slot-row', slot.row);
        this.element.setAttribute('slot-column', slot.column);
        this.element.textContent = "-";
    }
    /** Again, overwriting the base class method because we want it to do more than just setting the value  */
    set textContent(slot) {
        super.textContent = slot.symbol;
        this.element.style.backgroundColor = "white";
    }
 }