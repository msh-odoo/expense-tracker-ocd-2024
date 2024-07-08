import { Component, useState } from '@odoo/owl';
import { registry } from "@web/core/registry";


class ExpenseCategoryForm extends Component {
    static template = "expense_tracker.ExpenseCategoryForm";
    setup() {
        this.state = useState({
            newCategory: {
                icon: '',
                name: '',
            },
            categories: [[1, 'Food'], [2, 'Entertaintment']] // TODO: MSH: Need to fetch from server and maybe use model structure
        });
    }

    _onAddCategory(ev) {
        debugger;
    }
}

registry.category("screens").add("ExpenseCategoryForm", ExpenseCategoryForm);
