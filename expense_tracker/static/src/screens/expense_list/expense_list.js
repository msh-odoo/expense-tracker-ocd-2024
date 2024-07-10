import { Component, useState } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { useModel } from "../../model/model";
import { ExpenseTrackerModel } from "../../model/expense_tracker_model";


export class PersonalExpenseList extends Component {
    static template = 'expense_tracker.PersonalExpenseList';

    setup() {
        this.model = useState(useModel(ExpenseTrackerModel, this.modelParams));
        if (this.props.expenses) {
            this.model.expenses = this.props.expenses;
        }
    }

    get totalAmount() {
        return this.model.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    _onClickExpenseRow(ev) {
        this.env.bus.trigger('change_screen', { 'screen_name': 'ExpenseForm' });
    }
}

registry.category("screens").add("ExpenseList", PersonalExpenseList);
