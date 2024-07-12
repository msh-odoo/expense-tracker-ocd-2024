import { Component, useState, onWillStart, onWillUpdateProps } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { useModel } from "../../model/model";
import { ExpenseTrackerModel } from "../../model/expense_tracker_model";


export class PersonalExpenseList extends Component {
    static template = 'expense_tracker.PersonalExpenseList';

    setup() {
        this.model = useModel(ExpenseTrackerModel, this.modelParams);
        this.state = useState({ expenses: [] });
        this.modelName = "personal.expense";

        const options = {
            model: this.modelName,
        };
        if (this.props.expenses) {
            this.state.expenses = this.props.expenses;
        } else {
            onWillStart(async () => {
                const res = await this.model.load_expenses(options);
                this.state.expenses = res;
            });
        }
        onWillUpdateProps((nextProps) => this.state.expenses = this.model.load_expenses(options));
    }

    get totalAmount() {
        return this.state.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    _onCreateExpense(ev) {
        this.env.bus.trigger('change_screen', { 'screen_name': 'ExpenseForm', model: "personal.expense", isNew: true });
    }

    _onClickExpenseRow(ev) {
        this.env.bus.trigger('change_screen', { 'screen_name': 'ExpenseForm', model: "personal.expense", id: ev.currentTarget.getAttribute("data-id") });
    }
}

registry.category("screens").add("ExpenseList", PersonalExpenseList);
