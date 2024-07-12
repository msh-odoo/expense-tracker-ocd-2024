import { Component, useRef, useState, onWillStart, onWillUpdateProps } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { useModel } from "../../model/model";
import { ExpenseTrackerModel } from "../../model/expense_tracker_model";


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
