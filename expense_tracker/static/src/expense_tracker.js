import { Component, xml } from "@odoo/owl";
import { Header } from "./components/header/header";
import { Container } from "./components/container/container";

export class ExpenseTracker extends Component {
    static template = "expense_tracker.root";
    static components = { Header, Container };
}
