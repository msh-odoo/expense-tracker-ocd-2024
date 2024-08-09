import { Component, useState, onWillStart, onWillUpdateProps } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { useModel } from "../../model/model";
import { ExpenseTrackerModel } from "../../model/expense_tracker_model";

export class ExpenseCategoriesList extends Component {
    static template = "expense_tracker.CategoriesList";
    setup() {
        this.model = useModel(ExpenseTrackerModel, this.modelParams);
        this.state = useState({ categories: [], selectedCategories: [] });
        this.modelName = "expense.category";
        this.checkboxInteraction = false;

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
        if (!this.checkboxInteraction && this.state.selectedCategories.length === 0) {
            this.env.bus.trigger('change_screen', { 'screen_name': 'ExpenseCategoryForm', "model": "expense.category", id: ev.currentTarget.getAttribute("data-id") });
        }
        this.checkboxInteraction = false;
    }

    _onCategorySelection(ev) {
        this.checkboxInteraction = true;
        const recordId =  parseInt(ev.currentTarget.getAttribute("data-id"));
        if (ev.currentTarget.checked) {
            if (!this.state.selectedCategories.includes(recordId)) {
                this.state.selectedCategories.push(recordId);
            }
        } else {
            this.state.selectedCategories = this.state.selectedCategories.filter(id => id !== recordId);
        }
    }
    deleteCategory(ev) {
        const recordIds = [...this.state.selectedCategories];
        this._deleteCategory({ detail: { model: "expense.category", ids: recordIds }});
    }

    async _deleteCategory(ev) {
        try {
            const { model, ids } = ev.detail;
            await this.model.orm.unlink(model, ids);
            const options = { model: this.modelName };
            const res = await this.model.load_categories(options);
            this.state.categories = res;
            this.state.selectedCategories = [];
        } catch (error) {
            console.error("Error deleting categories:", error);
        }
    }
}

registry.category("screens").add("CategoriesList", ExpenseCategoriesList);
