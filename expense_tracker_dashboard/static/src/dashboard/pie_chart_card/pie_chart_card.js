/** @odoo-module */

import { Component } from "@odoo/owl";
import { PieChart } from "../pie_chart/pie_chart";

export class PieChartCard extends Component {
    static template = "expense_tracker_dashboard.PieChartCard";
    static components = { PieChart }
    static props = {
        title: {
            type: String,
        },
        values: {
            type: Object,
        },
    }
}