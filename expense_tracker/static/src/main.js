import { browser } from "@web/core/browser/browser";
import { rpc } from "./core/rpc.js";
import { DB } from "./core/db.js";
import { App, EventBus } from "@odoo/owl";
// import { templates } from "@web/core/assets";
import { getTemplate } from "@web/core/templates";
import { ExpenseTracker } from "./expense_tracker";


// The following code ensures that owl mount the component when ready.
// `templates` contains templates contained in the bundles.
//
// In the mount options, it's also possible to add other interresting
// configuration: https://github.com/odoo/owl/blob/master/doc/reference/app.md#configuration

owl.whenReady(async () => {
    const bus = new EventBus();
    const db = new DB();
    const env = { bus, db, rpc };
    // await startServices(env);
    const app = new App(ExpenseTracker, {
        env,
        getTemplate,
        // dev: env.debug || session.test_mode,
        // warnIfNoStaticProps: !session.test_mode,
        name: ExpenseTracker.constructor.name,
        // translatableAttributes: ["data-tooltip"],
        // translateFn: _t,
    });
    const root = await app.mount(document.body);
    // mount(Ecommerce, document.body, { dev: true, env });
});

/**
 * This code is iterating over the cause property of an error object to console.error a string
 * containing the stack trace of the error and any errors that caused it.
 * @param {Event} ev
 */
function logError(ev) {
    ev.preventDefault();
    let error = ev ?.error || ev.reason;

    if (error.seen) {
        // If an error causes the mount to crash, Owl will reject the mount promise and throw the
        // error. Therefore, this if statement prevents the same error from appearing twice.
        return;
    }
    error.seen = true;

    let errorMessage = error.stack;
    while (error.cause) {
        errorMessage += "\nCaused by: "
        errorMessage += error.cause.stack;
        error = error.cause;
    }
    console.error(errorMessage);
}

browser.addEventListener("error", (ev) => {logError(ev)});
browser.addEventListener("unhandledrejection", (ev) => {logError(ev)});
