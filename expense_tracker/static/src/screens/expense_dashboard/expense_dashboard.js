
import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class Dashboard extends Component {
    static template = "expense_tracker.Dashboard";

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

registry.category("screens").add("Dashboard", Dashboard);
