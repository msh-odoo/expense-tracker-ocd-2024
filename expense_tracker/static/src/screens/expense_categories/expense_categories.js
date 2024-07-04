import { Component, useState } from '@odoo/owl';
import { registry } from "@web/core/registry";


class ExpenseCategoriesList extends Component {
    static template = "expense_tracker.CategoriesList";
    setup() {
        this.state = useState({
            categories: [{
                id: 1,
                name: '',
                date: '',
                amount: 0,
                category: 'food'
            }]
        });
    }

    addCategory() {
        this.trigger('expense-added', { ...this.state.newExpense });
        this.state.newExpense = {
            name: '',
            date: '',
            amount: 0,
            category: 'food'
        };
    }
}

registry.category("screens").add("CategoriesList", ExpenseCategoriesList);
