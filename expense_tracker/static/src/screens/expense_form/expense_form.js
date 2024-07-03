import { Component, useState } from '@odoo/owl';

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
