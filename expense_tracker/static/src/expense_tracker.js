import { Component, useState, useSubEnv } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
import { ORM } from "@web/core/orm_service";
import { Header } from "./components/header/header";
import { Container } from "./components/container/container";
import { PersonalExpenseList } from "./screens/expense_list/expense_list";

export class ExpenseTracker extends Component {
    static template = "expense_tracker.root";
    static components = { Header, Container };

    setup() {
        super.setup();
        const orm = new ORM();
        // Use of useSubEnv to pass orm to this component as well as all it's children
        useSubEnv({ orm, rpc });

        this.mainScreen = useState({ name: 'Expense List', component: PersonalExpenseList });
        this.mainScreenProps = {};
        this.env.bus.addEventListener("change_screen", this.onChangeScreen.bind(this));
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

    /**
     * Called when main screen is changed
     * @param {Event} ev 
     */
    onChangeScreen(ev) {
        const screenRegistry = registry.category("screens");
        const screen = screenRegistry.get(ev.detail.screen_name);
        this.mainScreen.name = ev.detail.screen_name;
        this.mainScreen.component = screen;
        this.mainScreenProps = { ...ev.detail };
    }

    _onLogoClicked(ev) {
        this.mainScreen.name = 'Expense List';
        this.mainScreen.component = PersonalExpenseList;
    }

}
