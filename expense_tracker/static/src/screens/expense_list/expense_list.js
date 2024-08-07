import { Component } from '@odoo/owl';

import { registry } from "@web/core/registry";

export class PersonalExpenseList extends Component {
    static template = 'expense_tracker.PersonalExpenseList';

    get totalAmount() {
        return 2000.00;
    }
}

PersonalExpenseList.props = {
    hasButtons: { type: Boolean, optional: true },
    showFooter: { type: Boolean, optional: true },
};

PersonalExpenseList.defaultProps = {
    hasButtons: true,
    showFooter: true,
};

registry.category("screens").add("ExpenseList", PersonalExpenseList);
