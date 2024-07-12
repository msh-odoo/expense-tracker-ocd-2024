import { Component, useRef } from '@odoo/owl';

export class FormView extends Component {
    static template = "expense_tracker.FormView";
    setup() {
        this.formElement = useRef("formElement");
        super.setup();
    }

    _onClickSubmitForm(ev) {
        ev.preventDefault();
        debugger;
        const event = new CustomEvent("submit", { bubbles: true });
        this.formElement.el.dispatchEvent(event);
    }
}
