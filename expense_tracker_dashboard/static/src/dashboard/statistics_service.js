/** @odoo-module */

import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";
import { rpc } from "@web/core/network/rpc";


const statisticsService = {
    dependencies: [],
    start(env, { }) {
        const statistics = reactive({ isReady: false });

        async function loadData() {
            const updates = await rpc("/expense_tracker_dashboard/statistics");
            Object.assign(statistics, updates, { isReady: true });
        }

        setInterval(loadData, 10*60*1000);
        loadData();

        return statistics;
    },
};

registry.category("services").add("expense_tracker_dashboard.statistics", statisticsService);
