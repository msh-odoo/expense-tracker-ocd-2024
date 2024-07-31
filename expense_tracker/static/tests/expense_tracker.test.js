import { expect, test, describe, mountOnFixture } from "@odoo/hoot";
import { MainComponentsContainer } from "@web/core/main_components_container";
import { animationFrame } from "@odoo/hoot-mock";
import { Component, xml, useSubEnv } from "@odoo/owl";
import {
    contains,
    defineModels,
    fields,
    findComponent,
    makeServerError,
    models,
    onRpc,
    makeMockEnv,
    patchWithCleanup,
} from "@web/../tests/web_test_helpers";

// import {
//     contains,
//     patchWithCleanup,
// } from "@web/../tests/web_test_helpers";
import { registry } from "@web/core/registry";
import { rpc } from "./../src/core/rpc.js";
import { DB } from "./../src/core/db.js";
import { EventBus } from "@odoo/owl";
import { getTemplate } from "@web/core/templates";
import { ORM } from "@web/core/orm_service";

import { Dashboard } from "./../src/screens/expense_dashboard/expense_dashboard";
import { ExpenseTracker  } from "../src/expense_tracker.js";


async function makeMockedEnv() {
    const bus = new EventBus();
    const db = new DB();
    const datetime = new Date();
    const options = { bus, db, rpc, datetime };
    const env = await makeMockEnv(options);
    return env;
}

async function mountWithCleanup(ComponentClass, options) {
    const config = {
        env: options?.env || (await makeMockedEnv()),
        getTemplate,
        props: options?.props || {},
        warnIfNoStaticProps: false,
        translateFn: () => {},
    };

    // getFixture().classList.add("o_web_client");

    /** @type {InstanceType<C>} */
    const component = await mountOnFixture(ComponentClass, config, options?.target);
    if (!options?.noMainContainer && !hasMainComponent) {
        await mountOnFixture(MainComponentsContainer, { ...config, props: {} });
    }

    return component;
}

class PersonalExpense extends models.Model {
    _name = "personal.expense";

    name = fields.Char();
    user_id = fields.Many2one({relation: "res.users"});
    date = fields.Date()
    amount = fields.Float()
    category_id = fields.Many2one({relation: "expense.category"})
    icon = fields.Char()
    payment_method_id = fields.Many2one({relation: "payment.method"})
    tag_ids = fields.Many2many({ string: "Companies", relation: "expense.tag" });

    // _records = [
    //     { id: 1, foo: "yop" },
    //     { id: 2, foo: "blip" },
    //     { id: 3, foo: "gnap" },
    //     { id: 4, foo: "abc" },
    //     { id: 5, foo: "blop" },
    // ];
}

defineModels([PersonalExpense]);


describe.current.tags("expense");

test("can be rendered", async () => {
    onRpc("personal.expense", "search_read", ({ args, kwargs }) => {
        // expect(args).toEqual([[["model", "=", "partner"]]]);
        // expect(kwargs.limit).toBe(1);
        debugger;
        return [{}, {}];
    });
    class MyComponent extends Component {
        static props = {};
        static template = xml`<Dashboard />`;
        static components = { Dashboard };
        setup() {
            super.setup();
            const orm = new ORM();
            useSubEnv({ orm, rpc });
        }
    }
    await mountWithCleanup(MyComponent, {});

    debugger;
    expect(`header > nav.o_main_navbar`).toHaveCount(1);
});

// test("can render a main component", async () => {
//     class MyComponent extends Component {
//         static props = {};
//         static template = xml`<span class="chocolate">MyComponent</span>`;
//     }

//     const env = await makeMockEnv();
//     registry.category("main_components").add("mycomponent", { Component: MyComponent });

//     await mountWithCleanup(WebClient, { env });

//     expect(`.chocolate`).toHaveCount(1);
// });
