import { expect, test, describe } from "@odoo/hoot";
import { animationFrame } from "@odoo/hoot-mock";
import { Component, xml } from "@odoo/owl";

import {
    contains,
    makeMockEnv,
    mountWithCleanup,
    patchWithCleanup,
} from "@web/../tests/web_test_helpers";
import { registry } from "@web/core/registry";
import { Dashboard } from "./../src/screens/expense_dashboard/expense_dashboard";

describe.current.tags("expense");

test("can be rendered", async () => {
    debugger;
    await mountWithCleanup(Dashboard, {});

    expect(`header > nav.o_main_navbar`).toHaveCount(1);
});

test("can render a main component", async () => {
    class MyComponent extends Component {
        static props = {};
        static template = xml`<span class="chocolate">MyComponent</span>`;
    }

    const env = await makeMockEnv();
    registry.category("main_components").add("mycomponent", { Component: MyComponent });

    await mountWithCleanup(WebClient, { env });

    expect(`.chocolate`).toHaveCount(1);
});
