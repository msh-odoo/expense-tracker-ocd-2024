import { Component, onWillStart, onWillUpdateProps, useState, useComponent } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { PersonalExpenseList } from "../expense_list/expense_list";
import { useModel } from "../../model/model";
import { ExpenseTrackerModel } from "../../model/expense_tracker_model";

export class Dashboard extends Component {
    static template = "expense_tracker.Dashboard";
    static components = { PersonalExpenseList };

    setup() {
        super.setup();
        this.model = useModel(ExpenseTrackerModel, this.modelParams);
        this.state = useState({ expenses: [] });
        onWillStart(async () => {
            const res = await this.model.load_expenses(this.props);
            this.state.expenses = res;
        });
        onWillUpdateProps((nextProps) => this.state.expenses = this.model.load_expenses(nextProps));
    }

    get modelParams() {
        return {};
    }

    _onQuickCreateExpense() {
        this.env.bus.trigger('change_screen', { 'screen_name': 'ExpenseForm', model: "personal.expense", isNew: true });
        this.env.bus.trigger('change_active_menu', 'expenses' );
    }

    _onQuickCreateCategory() {
        this.env.bus.trigger('change_screen', { 'screen_name': 'ExpenseCategoryForm', model: "expense.category", isNew: true });
        this.env.bus.trigger('change_active_menu', 'categories' );
    }
}

registry.category("screens").add("Dashboard", Dashboard);
