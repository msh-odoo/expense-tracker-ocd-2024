import { Component } from '@odoo/owl';
import { registry } from "@web/core/registry";


export class TagsList extends Component {
    static template = 'expense_tracker.TagsList';

    setup() {
        this.props.expenses = useState([]);
        this.state = useState({
            expenses: [
                { id: 1, name: 'Lunch', date: '2024-07-01', amount: 15.00, category: 'food' },
                { id: 2, name: 'Taxi', date: '2024-07-02', amount: 30.00, category: 'transport' },
            ],
        });
    }

    get totalAmount() {
        return this.state.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }
}

registry.category("screens").add("TagsList", TagsList);
