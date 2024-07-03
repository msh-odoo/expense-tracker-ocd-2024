import { Component, useState, onWillStart } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { useModel } from "../../model/model";
import { ExpenseTrackerModel } from "../../model/expense_tracker_model";
import { FormView } from '../../components/formview/formview';

class ExpenseCategoryForm extends Component {
    static template = "expense_tracker.ExpenseCategoryForm";
    static components = { FormView };

    setup() {
        this.model = useModel(ExpenseTrackerModel, this.modelParams);
        this.state = useState({
            data: {
                record: { name: '', icon: '', description: '' },
                record_fields: {
                    name: { string: 'Name' },
                    icon: { string: 'Icon' },
                    description: { string: 'Description' }
                }
            }
        });
        this.title = "Category";
        this.modelName = "expense.category";

        onWillStart(async () => {
            if (this.props.id) {
                await this.loadData(this.props.id);
            }
        });
    }

    async loadData(id) {
        const options = {
            model: this.modelName,
            id: id,
            fields: ["name", "icon", "description"],
        };
        const res = await this.model.load_data(options);
        this.state.data = res;
    }

    async _onAddCategory(newCategory) {
        if(newCategory.id) {
            await this.model.orm.write("expense.category", [newCategory.id], {
                name: newCategory.name,
                icon: newCategory.icon,
                description: newCategory.description
            })
        } else {
            await this.model.orm.create("expense.category", [{
                name: newCategory.name,
                icon: newCategory.icon,
                description: newCategory.description
            }])
        }
        this.env.bus.trigger('change_screen', { 'screen_name': 'CategoriesList' });
    }
}

registry.category("screens").add("ExpenseCategoryForm", ExpenseCategoryForm);
