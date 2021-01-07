import { BackgroundPane } from './background-pane';
import { SimpleComponent } from '../lib/simple-component';

/** Notice is the component we use when we want to show any special message to the user.
 * We first create the backgroundPane and attach it so we have a nice, clean, separated information.
 * The constructor takes a sentence (the text to show) and an interval that defaults to 1s so the notice auto-destroys
 * itself after X seconds. */

export class Notice extends SimpleComponent {
    constructor(text, interval = 5000) {
        super('notice');

    /** Before initializing a notice, check for the existance of a previous one and delete that so we dont
     * overposition text that the user wont be able to read */
    let element = document.querySelector(this.selector);
    if (element) this.removeElements();

    this.element.setAttribute(
        "style",
        "position: absolute; top: 20%, background-color; white; z-index: 11;" +
        "text-align: center; font-family: Monospace; font-size: 25px; width: 100%"
    );
    this.element.textContent = text;
    this.backgroundPane = new BackgroundPane();

    document.body.appendChild(this.backgroundPane.element);
    document.body.appendChild(this.element);

    setTimeout(() => this.removeElements(), interval);
    }
    
    removeElements() {
        this.backgroundPane.destroy();
        this.destroy();
    }
}