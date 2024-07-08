import { Component, useState } from '@odoo/owl';
import { registry } from "@web/core/registry";


export class TagsList extends Component {
    static template = 'expense_tracker.TagsList';

    setup() {
        this.props.expenses = useState([]);
        this.state = useState({
            tags: [
                { id: 1, name: 'Lunch', color: 1 },
                { id: 2, name: 'Taxi', color: 2 },
            ],
        });
    }

}

registry.category("screens").add("TagsList", TagsList);
