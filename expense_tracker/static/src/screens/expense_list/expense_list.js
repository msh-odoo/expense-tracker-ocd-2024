import { Component, useState, onWillStart } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { useModel } from "../../model/model";
import { ExpenseTrackerModel } from "../../model/expense_tracker_model";

export class PersonalExpenseList extends Component {
    static template = 'expense_tracker.PersonalExpenseList';

    setup() {
        this.model = useModel(ExpenseTrackerModel, this.modelParams);
        this.state = useState({ expenses: [] , selectedCheckboxes: []});
        this.modelName = "personal.expense";
        const options = {
            model: this.modelName,
        };
        onWillStart(async () => {
            const res = await this.model.load_expenses(options);
            this.state.expenses = res;
        });
    }

    get totalAmount() {
        return this.state.expenses.reduce((sum, expense) => sum + expense.amount, 0);
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
