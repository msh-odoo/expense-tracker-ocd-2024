
import { Component, useState } from "@odoo/owl";
import { Time } from "../time/time";

export class Header extends Component {
    static template = "expense_tracker.header";
    static components = { Time };

    setup() {
        this.state = useState({ activeMenuItem: "home" });
        this.env.bus.addEventListener("change_active_menu", this.changeActiveMenu.bind(this));
    }

    onClickLogo() {
        window.location.href = "/expense_tracker";
    }

    onActivateMenu(ev) {
        const menuName = ev.currentTarget.getAttribute('data-name');
        this.state.activeMenuItem = menuName;
        const screenName = ev.currentTarget.getAttribute('data-screen');
        this.env.bus.trigger('change_screen', { 'screen_name': screenName, ignoreCreate: false });
    }

    changeActiveMenu(ev) {
        this.state.activeMenuItem = ev.detail;
    }
}
