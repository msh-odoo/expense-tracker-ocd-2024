import { rpc } from "@web/core/network/rpc";
import { App, EventBus } from "@odoo/owl";
import { getTemplate } from "@web/core/templates";
import { ExpenseTracker } from "./expense_tracker";

owl.whenReady(async () => {
    const bus = new EventBus();
    const datetime = new Date();
    const env = { bus, rpc, datetime };

    const app = new App(ExpenseTracker, {
        env,
        getTemplate,
        warnIfNoStaticProps: true, // !session.test_mode,
        name: ExpenseTracker.constructor.name,
    });
    const root = await app.mount(document.body);
});
