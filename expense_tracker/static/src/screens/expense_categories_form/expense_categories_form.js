import { Component, onWillStart, useState, useRef } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { useModel } from "../../model/model";
import { ExpenseTrackerModel } from "../../model/expense_tracker_model";
import { FormView } from '../../components/formview/formview';

class ExpenseCategoryForm extends Component {
    static template = "expense_tracker.ExpenseCategoryForm";
    static components = { FormView };

    setup() {
        this.model = useModel(ExpenseTrackerModel, this.modelParams);
        this.state = useState({ data: {record: {}}, isValidForm: true });
        this.title = "Category";
        this.modelName = "expense.category";
        this.form = useRef("form");

        onWillStart(async () => {
            if (this.props.id) {
                await this.loadData(this.props.id);
            }
        });
    }

    /**
     * Checks form valid or not based on given value.
     */
    checkFormValid() {
        let isValid = true;
        this.form.el.querySelectorAll(".form-control").forEach((elem) => {
            if (elem.required && !elem.value) {
                isValid = false;
            }
        });
        this.state.isValidForm = isValid;
    }

    async loadData(id) {
        const options = {
            model: this.modelName,
            id: id,
            fields: ["name", "icon", "description"],
        };
        const res = await this.model.load_category_form_data(options);
        debugger;
        this.state.data = res;
    }

    async _onAddCategory() {
        this.checkFormValid();
        if (!this.state.isValidForm) {
            return;
        }
        if(this.state.data.record.id) {
            await this.model.orm.write("expense.category", [this.state.data.record.id], {
                name: this.state.data.record.name,
                icon: this.state.data.record.icon,
                description: this.state.data.record.description
            })
        } else {
            await this.model.orm.create("expense.category", [{
                name: this.state.data.record.name,
                icon: this.state.data.record.icon,
                description: this.state.data.record.description
            }])
        }
        this.env.bus.trigger('change_screen', { 'screen_name': 'CategoriesList' });
    }
}

registry.category("screens").add("ExpenseCategoryForm", ExpenseCategoryForm);
