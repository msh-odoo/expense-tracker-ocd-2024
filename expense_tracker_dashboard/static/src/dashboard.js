import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";

class ExpenseDashboard extends Component {
    static template = "expense_tracker_dashboard.ExpenseDashboard";
    static components = { Layout };

    setup() {
        this.display = {
            controlPanel: {},
        };
    }
}

registry.category("actions").add("expense_tracker_dashboard.dashboard", ExpenseDashboard);
