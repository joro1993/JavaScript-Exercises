import { SimpleComponent } from './simple-component';

/** A writeable calss holds a alias property to change the elements' textContent andextends SimpleCompoent */
export class WritableComponent extends SimpleComponent {
    constructor(selector) {
        super(selector);
    }
    /** get property sets the function as a getter, you can use as writableComponent.textContent */
    get textContent() {
        return this.element.textContent;
    }

    /** The setter makes it that you can set it to avalue, writableComponent.textContent = "some value"  */
    set textContent(v) {
        return (this.element.textContent = v);
    }
}