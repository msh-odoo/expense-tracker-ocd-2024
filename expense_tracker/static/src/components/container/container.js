
import { Component } from "@odoo/owl";
import { ExpenseTrackerDashboard } from "../../screens/expense_dashboard/expense_dashboard";
import { ExpenseList } from "../../Screens/expense_list/expense_list";


export class Container extends Component {
    static template = "expense_tracker.container";
}

Container.components = { ExpenseTrackerDashboard, ExpenseList };

Container.props = {
    mainScreenProps: { type: Object, optional: true },
    tname: { type: String },
    component: { type: Function }
};

Container.defaultProps = {
    mainScreenProps: {},
};
