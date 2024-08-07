import { Component } from '@odoo/owl';
import { registry } from "@web/core/registry";

class ExpenseForm extends Component {
    static template = "expense_tracker.ExpenseForm";
    setup() {
        this.title = "Expense";
    }

    async _onClickSubmitForm(ev) {
        // Form submit logic here
    }
}

registry.category("screens").add("ExpenseForm", ExpenseForm);
