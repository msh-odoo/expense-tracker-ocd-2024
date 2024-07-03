import { Component, useState, useSubEnv, onMounted, useRef, reactive, useExternalListener } from "@odoo/owl";
import { Header } from "./components/header/header";
import { Container } from "./components/container/container";
import { registry } from "@web/core/registry";
import { ORM } from "@web/core/orm_service";
import { Dashboard } from "./screens/expense_dashboard/expense_dashboard";
import { rpc } from "@web/core/network/rpc";

export class ExpenseTracker extends Component {
    static template = "expense_tracker.root";
    static components = { Header, Container };

    setup() {
        super.setup();
        const orm = new ORM();
        // Use of useSubEnv to pass orm to this component as well as all it's children
        useSubEnv({ orm, rpc });
        this.mainScreen = useState({ name: 'Dashboard', component: Dashboard });
        this.env.bus.addEventListener("change_screen", this.onChangeScreen.bind(this));
        // this.env.bus.addEventListener("add_dialog", this.onAddDialog.bind(this));
        this.mainScreenProps = {};
    }

    /**
     * Used to give the `state.mobileSearchBarIsShown` value to main screen props
     */
    get mainScreenPropsFielded() {
        return Object.assign({}, this.mainScreenProps);
    }

    /**
     * Called when main screen is changed
     * @param {Event} ev 
     */
    onChangeScreen(ev) {
        const screenRegistry = registry.category("screens");
        const screen = screenRegistry.get(ev.detail.screen_name)
        this.mainScreen.name = ev.detail.screen_name;
        this.mainScreen.component = screen;
        this.mainScreenProps = { ...ev.detail };
    }
}

ExpenseTracker.components = { Header, Container } // Footer, DialogContainer
