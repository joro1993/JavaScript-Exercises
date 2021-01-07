export class SimpleComponent {
    /**
     * This class generates a element proberty containing a NodeElement ti be aooebded into the DOM. This class should be
     * the base of every other compoent we will create and therefore should contain its removal from dom.
     * @param selector {String} the selector of the element to be created
     */
    constructor(selector) {
        if (!selector) 
            throw Error("A SimpleComponent must be composed of selector");
        this.selector = selector.toString();
        this.element = document.createElement(this.selector);
    }

    /** call this when you want to remove the element from the DOM */
    destroy() {
        document.body.removeChild(this.element);
    }
}