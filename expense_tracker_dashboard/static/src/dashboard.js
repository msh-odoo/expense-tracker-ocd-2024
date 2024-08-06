import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";

class ExpenseDashboard extends Component {
    static template = "expense_tracker_dashboard.ExpenseDashboard";
    static components = { Layout };

    setup() {
        this.action = useService("action");
        this.display = {
            controlPanel: {},
        };
    }

    openExpenseView() {
        this.action.doAction("expense_tracker.action_personal_expense");
    }

    openCategories() {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Categories",
            res_model: "expense.category",
            views: [
                [false, "list"],
                [false, "form"],
            ],
        });
    }
}

registry.category("actions").add("expense_tracker_dashboard.dashboard", ExpenseDashboard);
