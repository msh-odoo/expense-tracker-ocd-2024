import { Component, useState } from '@odoo/owl';
import { registry } from "@web/core/registry";


class ExpenseForm extends Component {
    static template = "expense_tracker.ExpenseForm";
    setup() {
        this.state = useState({
            newExpense: {
                name: '',
                date: '',
                amount: 0,
                category: 'food'
            }
        });
    }

    addExpense() {
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