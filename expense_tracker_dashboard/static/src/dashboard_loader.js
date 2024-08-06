/** @odoo-module */

import { registry } from "@web/core/registry";
import { LazyComponent } from "@web/core/assets";
import { Component, xml, useSubEnv } from "@odoo/owl";
import { ORM } from "@web/core/orm_service";
import { rpc } from "@web/core/network/rpc";

class AwesomeDashboardLoader extends Component {
    static components = { LazyComponent };
    static template = xml`
    <LazyComponent bundle="'expense_tracker_dashboard.dashboard'" Component="'ExpenseDashboard'" props="props"/>
    `;

    setup() {
        super.setup();
        const orm = new ORM();
        // Use of useSubEnv to pass orm to this component as well as all it's children
        useSubEnv({ orm, rpc });
    }
}

registry.category("actions").add("expense_tracker_dashboard.dashboard", AwesomeDashboardLoader);
