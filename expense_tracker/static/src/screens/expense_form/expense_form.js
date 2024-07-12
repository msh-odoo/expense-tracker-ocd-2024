import { Component, useState, onWillStart, onWillUpdateProps } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { useModel } from "../../model/model";
import { ExpenseTrackerModel } from "../../model/expense_tracker_model";
import { FormView } from '../../components/formview/formview';


class ExpenseForm extends Component {
    static template = "expense_tracker.ExpenseForm";
    static components = { FormView }
    setup() {
        this.model = useModel(ExpenseTrackerModel, this.modelParams);
        this.state = useState({ data: {} });
        this.title = "Expense";

        onWillStart(async () => {
            const res = await this.model.load_data(this.props);
            this.state.data = res;
        });
        onWillUpdateProps((nextProps) => this.state.expense_data = this.model.load_data(nextProps));
    }

    addExpense() {
        debugger;
        this.trigger('expense-added', { ...this.state.newExpense });
        this.state.newExpense = {
            name: '',
            date: '',
            amount: 0,
            category: 'food'
        };
    }
}

registry.category("screens").add("ExpenseForm", ExpenseForm);
