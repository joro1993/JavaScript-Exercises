import { WritableComponent } from '../lib/writable-component';

/** Much like CurrentTurn, it shouws the Symbol that is in-play */
export class PlaySymbol extends WritableComponent {
    constructor() {
        super("symbol");
        this.element.setAttribute("style", "float: left;");
    }
    set textContent(v) {
        super.textContent = `playing: ${v}`;
    }
}