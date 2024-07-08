import { Component, useState } from '@odoo/owl';
import { registry } from "@web/core/registry";


class ExpenseCategoriesList extends Component {
    static template = "expense_tracker.CategoriesList";
    setup() {
        this.state = useState({
            categories: [{
                id: 1,
                icon: '',
                name: 'Food',
            }]
        });
    }

    _onClickAddCategory() {
        this.env.bus.trigger('change_screen', { 'screen_name': 'ExpenseCategoryForm' });
    }
}

registry.category("screens").add("CategoriesList", ExpenseCategoriesList);
