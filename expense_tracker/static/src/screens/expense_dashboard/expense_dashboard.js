
import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { PersonalExpenseList } from "../expense_list/expense_list";

export class Dashboard extends Component {
    static template = "expense_tracker.Dashboard";

    setup() {
        super.setup();
        this.state = useState({
            expenses: [
                { id: 1, name: 'Lunch', date: '2024-07-01', amount: 15.00, category: 'food' },
                { id: 2, name: 'Taxi', date: '2024-07-02', amount: 30.00, category: 'transport' },
            ],
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

Dashboard.components = { PersonalExpenseList }

registry.category("screens").add("Dashboard", Dashboard);
