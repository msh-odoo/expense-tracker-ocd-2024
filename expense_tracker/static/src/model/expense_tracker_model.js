/* @odoo-module */

import { Model } from "../model/model";

export class ExpenseTrackerModel extends Model {
    /**
     * @override
     */
    setup(params) {
        super.setup(params);
    }

    /**
     * @param {SearchParams} searchParams
     */
    load(searchParams) {
        debugger;
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
