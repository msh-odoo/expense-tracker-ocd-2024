/* @odoo-module */

import { Model } from "../model/model";

export class ExpenseTrackerModel extends Model {
    /**
     * @override
     */
    setup(params) {
        super.setup(params);
        this.expenses = [];
    }

    /**
     * @param {SearchParams} searchParams
     */
    async load(searchParams) {
        const res = await this.orm.searchRead("personal.expense",
            [["active", "=", true]],
            ["name", "user_id", "date", "amount", "category_id", "icon", "payment_method_id", "tag_ids"],
            { limit: 20 },
        );
        this.expenses = res;
    }

    /**
     * @override
     */
    hasData() {
        return this.data.some((data) => data.rows.length > 0);
    }

    //--------------------------------------------------------------------------
    // Protected
    //--------------------------------------------------------------------------

}
