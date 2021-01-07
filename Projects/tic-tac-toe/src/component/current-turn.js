import { WritableComponent } from '../lib/writable-component';

/** This class holds the current turn number. Its overwriting its base class because we want to add more text than
 * the simple "value" that WritableComponent allows */

 export class CurrentTurn extends WritableComponent {
     constructor() {
         super("current-turn");
         this.element.setAttribute("style", "float: left");
     }

     set textContent(v) {
         super.textContent = `turn No: ${v}`;
     }
 }