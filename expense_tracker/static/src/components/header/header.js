import { Component } from "@odoo/owl";

export class Header extends Component {
    static template = "expense_tracker.header";

    onClickLogo(ev) {
        const logoClickedEvent = new CustomEvent('logo_clicked', {
            detail: {},
            bubbles: true,
        },);
        ev.currentTarget.dispatchEvent(logoClickedEvent);
    }

    onActivateMenu(ev) {
        const menuName = ev.currentTarget.getAttribute('data-name');
        const screenName = ev.currentTarget.getAttribute('data-screen');
        this.env.bus.trigger('change_screen', { "screen_name": screenName, "menu_name": menuName });
    }
}
