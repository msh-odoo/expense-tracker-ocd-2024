import { Component, useState, onWillStart, onWillUpdateProps } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { useModel } from "../../model/model";
import { ExpenseTrackerModel } from "../../model/expense_tracker_model";
import { FormViewStatic } from '../../components/formview_static/formview_static';


class ExpenseForm extends Component {
    static template = "expense_tracker.ExpenseForm";
    static components = { FormViewStatic }
    setup() {
        this.model = useModel(ExpenseTrackerModel, this.modelParams);
        this.state = useState({ data: {} });
        this.title = "Expense";
        this.modelName = "personal.expense";
        const options = {
            model: this.modelName,
            id: this.props.id,
            fields: ["id", "name", "user_id", "date", "amount", "category_id", "payment_method_id"],
        };

        onWillStart(async () => {
            const res = await this.model.load_expense_form_data(options);
            this.state.data = res;
        });
        onWillUpdateProps((nextProps) => this.state.data = this.model.load_expense_form_data(options));
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
