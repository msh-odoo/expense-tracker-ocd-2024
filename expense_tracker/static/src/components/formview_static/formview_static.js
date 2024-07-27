import { Component, useRef } from '@odoo/owl';

export class FormViewStatic extends Component {
    static template = "expense_tracker.FormViewStatic";
    setup() {
        this.formElement = useRef("formElement");
        super.setup();
    }

}
