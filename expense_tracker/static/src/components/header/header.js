import { Component, useState } from "@odoo/owl";

export class Header extends Component {
    static template = "expense_tracker.header";

    setup() {
        super.setup();
        this.state = useState({ activeMenuItem: "home" });
    }

    onClickLogo(ev) {
        const logoClickedEvent = new CustomEvent('logo_clicked', {
            detail: {},
            bubbles: true,
        },);
        ev.currentTarget.dispatchEvent(logoClickedEvent);
    }

    onActivateMenu(ev) {
        const menuName = ev.currentTarget.getAttribute('data-name');
        this.state.activeMenuItem = menuName;
        const screenName = ev.currentTarget.getAttribute('data-screen');
        this.env.bus.trigger('change_screen', { "screen_name": screenName, "menu_name": menuName });
    }
}
