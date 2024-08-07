import { Component, useRef, useState, onMounted } from '@odoo/owl';

export class FormView extends Component {
    static template = "expense_tracker.FormView";
    setup() {
        this.formElement = useRef("formElement");
        super.setup();
        const { record } = this.props.data;
        this.state = useState({ data: record });
        this.record = Object.keys(record).filter(key => key !== 'id');

        onMounted(() => {
            this.formElement.el.querySelector("input.form-control").focus();
        })
    }
}
