import { Component, useState, onWillStart, onWillUpdateProps } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { useModel } from "../../model/model";
import { ExpenseTrackerModel } from "../../model/expense_tracker_model";

export class TagsList extends Component {
    static template = 'expense_tracker.TagsList';

    setup() {
        this.model = useModel(ExpenseTrackerModel, this.modelParams);
        this.state = useState({ tags: [] });
        this.modelName = "expense.tag";

        onWillStart(async () => {
            const res = await this.model.load_tags(this.props);
            this.state.tags = res;
        });
        onWillUpdateProps((nextProps) => this.state.tags = this.model.load_tags(nextProps));
    }

}

registry.category("screens").add("TagsList", TagsList);
