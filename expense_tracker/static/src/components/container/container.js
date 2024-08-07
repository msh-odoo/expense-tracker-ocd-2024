import { Component } from "@odoo/owl";

export class Container extends Component {
    static template = "expense_tracker.container";
}

Container.props = {
    mainScreenProps: { type: Object, optional: true },
    tname: { type: String },
    component: { type: Function }
};

Container.defaultProps = {
    mainScreenProps: {},
};
