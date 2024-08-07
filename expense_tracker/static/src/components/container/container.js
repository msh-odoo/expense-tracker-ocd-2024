import { Component } from "@odoo/owl";
import { PersonalExpenseList } from "../../screens/expense_list/expense_list";

export class Container extends Component {
    static template = "expense_tracker.container";
    static components = { PersonalExpenseList };
}
