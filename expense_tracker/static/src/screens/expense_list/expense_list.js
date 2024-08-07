import { Component } from '@odoo/owl';

import { registry } from "@web/core/registry";

export class PersonalExpenseList extends Component {
    static template = 'expense_tracker.PersonalExpenseList';

    get totalAmount() {
        return 2000.00;
    }

    _onCreateExpense(ev) {
        this.env.bus.trigger('change_screen', { 'screen_name': 'ExpenseForm', model: "personal.expense", isNew: true, });
    }

    _onDeleteExpense(ev) {
        this._deleteRecord();
    }
    async _deleteRecord() {
        // Delete Record Here
    }
}

PersonalExpenseList.props = {
    hasButtons: { type: Boolean, optional: true },
    showFooter: { type: Boolean, optional: true },
};

PersonalExpenseList.defaultProps = {
    hasButtons: true,
    showFooter: true,
};

registry.category("screens").add("ExpenseList", PersonalExpenseList);
