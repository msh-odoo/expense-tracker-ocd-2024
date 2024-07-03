
import { Component, useState, onWillStart } from "@odoo/owl";
// import { ProductList } from "./ProductList";
// import { Sidebar } from "./Sidebar";
import { registry } from "@web/core/registry";
// import { useFetchData } from "../../core/db"

export class ExpenseTrackerDashboard extends Component {
    static template = "expense_tracker.ExpenseTrackerDashboard";

    setup() {
        super.setup();
        this.state = useState({
            products: [],
        });
        // onWillStart(this.willStart);
        // this.fetchData = useFetchData();
    }
    // async willStart() {
    //     this.datas = await this.fetchData();
    //     this.state.products = this.datas.products;
    //     this.env.db.save('datas', this.datas);
    // }

}

// ProductScreen.components = { ProductList, Sidebar }

registry.category("screens").add("ExpenseTrackerDashboard", ExpenseTrackerDashboard);
