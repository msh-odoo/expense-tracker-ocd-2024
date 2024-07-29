
import { Component, useState } from "@odoo/owl";
import { Time } from "../time/time";
// import { Search } from "./search";

export class Header extends Component {
    static template = "expense_tracker.header";
    static components = { Time };

    setup() {
        this.state = useState({ activeMenuItem: "home" });
    }

    onClickLogo() {
        window.location.href = "/expense_tracker";
    }

    onActivateMenu(ev) {
        const menuName = ev.currentTarget.getAttribute('data-name');
        this.state.activeMenuItem = menuName;
        const screenName = ev.currentTarget.getAttribute('data-screen');
        this.env.bus.trigger('change_screen', { 'screen_name': screenName });
    }
}
