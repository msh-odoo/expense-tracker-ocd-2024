import { Component, useState } from '@odoo/owl';
import { registry } from "@web/core/registry";


class ExpenseCategoryForm extends Component {
    static template = "expense_tracker.ExpenseCategoryForm";
    setup() {
        this.state = useState({ data: {} });
        this.title = "Category";

        onWillStart(async () => {
            const res = await this.model.load_data(this.props);
            this.state.data = res;
        });
        onWillUpdateProps((nextProps) => this.state.expense_data = this.model.load_data(nextProps));
    }

    _onAddCategory(ev) {
        debugger;
    }
}

registry.category("screens").add("ExpenseCategoryForm", ExpenseCategoryForm);
