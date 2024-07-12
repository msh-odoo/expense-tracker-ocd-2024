import { Component, useState, onWillStart, onWillUpdateProps } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { useModel } from "../../model/model";
import { ExpenseTrackerModel } from "../../model/expense_tracker_model";

class ExpenseCategoriesList extends Component {
    static template = "expense_tracker.CategoriesList";
    setup() {
        this.model = useModel(ExpenseTrackerModel, this.modelParams);
        this.state = useState({ categories: [] });
        this.modelName = "expense.category";

        onWillStart(async () => {
            const res = await this.model.load_categories(this.props);
            this.state.categories = res;
        });
        onWillUpdateProps((nextProps) => this.state.categories = this.model.load_categories(nextProps));
    }

    _onClickAddCategory(ev) {
        this.env.bus.trigger('change_screen', { 'screen_name': 'ExpenseCategoryForm', "model": "expense.category", isNew: true });
    }

    _onClickCategory(ev) {
        this.env.bus.trigger('change_screen', { 'screen_name': 'ExpenseCategoryForm', "model": "expense.category", id: ev.currentTarget.getAttribute("data-id") });
    }
}

registry.category("screens").add("CategoriesList", ExpenseCategoriesList);
