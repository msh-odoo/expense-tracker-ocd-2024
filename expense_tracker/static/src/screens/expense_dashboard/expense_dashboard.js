
import { Component, onWillStart, onWillUpdateProps, useState, useComponent } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { PersonalExpenseList } from "../expense_list/expense_list";
import { useModel } from "../../model/model";
import { ExpenseTrackerModel } from "../../model/expense_tracker_model";

export class Dashboard extends Component {
    static template = "expense_tracker.Dashboard";

    setup() {
        super.setup();
        // this.model = useState(useModel(ExpenseTrackerModel, this.modelParams));
        const component = useComponent();
        this.model = useModel(ExpenseTrackerModel, this.modelParams);
        this.state = useState({ expenses: [] });
        onWillStart(async () => {
            const res = this.model.load(component.props);
            this.state.expenses = res;
        });
        onWillUpdateProps((nextProps) => this.state.expenses = this.model.load(nextProps));
    }

    // get modelParams() {
    //     return {};
    // }

    // async willStart() {
    //     this.datas = await this.fetchData();
    //     this.state.products = this.datas.products;
    //     this.env.db.save('datas', this.datas);
    // }

}

Dashboard.components = { PersonalExpenseList }

registry.category("screens").add("Dashboard", Dashboard);
