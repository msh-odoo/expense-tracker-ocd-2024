import { Component, useState, onWillStart } from '@odoo/owl';

import { registry } from "@web/core/registry";

export class PersonalExpenseList extends Component {
    static template = 'expense_tracker.PersonalExpenseList';

    setup() {
        this.state = useState({ expenses: [] , selectedCheckboxes: []});
        onWillStart(async () => {
            const res = await new Promise((resolve, reject) => {
                setTimeout(() => { // Consider we are fetching data from server and server trip takes 500 miliseconds
                    resolve([
                        {id: 1, name: "Brunch at Hotel Leela", date: "2024-08-21", amount: 2000.00, category_id: [1, "Food"]},
                        {id: 2, name: "Trip to Switzerland", date: "2024-08-22", amount: 222000.00, category_id: [2, "Travel"]},
                    ]);
                }, 500);
            });
            this.state.expenses = res;
        });
    }

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
