import { SimpleComponent} from './simple-component';

/** A list component is a component that its main functionality is to hold other components which need to be grabbed
 * in any form or situation. We do this by assigning each new component into a `items` property so that the
 * `getItem` statement can then retrieve it
*/
export class ListComponent extends SimpleComponent {
    constructor(selector) {
        super(selector);
            this.items = [];
    }

    getItem(index) {
        if (typeof index !== "number")
          throw Error("getRow must have a number as an argument");
        if (index < 0 || index > this.items.length) throw Error("Out of Bounds");
        return this.items[index];
      }
}