import { Component, useState, onWillStart, onWillUpdateProps } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { useModel } from "../../model/model";
import { ExpenseTrackerModel } from "../../model/expense_tracker_model";
import { FormView } from '../../components/formview/formview';


class ExpenseCategoryForm extends Component {
    static template = "expense_tracker.ExpenseCategoryForm";
    static components = { FormView };
    setup() {
        this.model = useModel(ExpenseTrackerModel, this.modelParams);
        this.state = useState({ data: {} });
        this.title = "Category";
        this.modelName = "expense.category";
        const options = {
            model: this.modelName,
            id: this.props.id,
        };

        onWillStart(async () => {
            const res = await this.model.load_data(options);
            this.state.data = res;
        });
        onWillUpdateProps((nextProps) => this.state.data = this.model.load_data(options));
    }

    _onAddCategory(ev) {
        debugger;
    }
}

registry.category("screens").add("ExpenseCategoryForm", ExpenseCategoryForm);
