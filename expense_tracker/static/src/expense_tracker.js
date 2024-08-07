import { Component, xml } from "@odoo/owl";
import { Header } from "./components/header/header";
import { Container } from "./components/container/container";
import { PersonalExpenseList } from "./screens/expense_list/expense_list";

export class ExpenseTracker extends Component {
    static template = "expense_tracker.root";
    static components = { Header, Container };

    setup() {
        super.setup();
        this.mainScreen = { name: 'Expense List', component: PersonalExpenseList };
        this.mainScreenProps = {};
    }

    /**
     * Used to give the `state.mobileSearchBarIsShown` value to main screen props
     */
    get mainScreenPropsFielded() {
        return Object.assign({
            hasButtons: true,
            showFooter: false,
        }, this.mainScreenProps);
    }

}
