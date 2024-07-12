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
    async load_categories(searchParams) {
        return await this.orm.searchRead("expense.category",
            [],
            ["name", "icon", "description"],
            {},
        );
    }

    /**
     * @param {SearchParams} searchParams
     */
    async load_tags(searchParams) {
        return await this.orm.searchRead("expense.tag",
            [],
            ["name", "color"],
            {},
        );
    }

    /**
     * @param {Object} params
     */
    async load_data(params) {
        return await this.rpc(`/expense/get_form_data/${params.model}/${params.id || ""}`, {
            isNew: params.isNew,
        });
    }

    /**
     * @param {Object} params
     */
    // async get_expense_category_data(params) {
    //     return await this.rpc("/expense/get_expense_category_data", {
    //         id: params.id,
    //         isNew: params.isNew,
    //     });
    // }

    /**
     * @param {SearchParams} searchParams
     */
    async load_expenses(searchParams) {
        return await this.orm.searchRead("personal.expense",
            [["active", "=", true]],
            ["name", "user_id", "date", "amount", "category_id", "icon", "payment_method_id", "tag_ids"],
            { limit: 20 },
        );
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
