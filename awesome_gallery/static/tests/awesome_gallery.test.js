import { describe, expect, test } from "@odoo/hoot";
import {
    defineModels,
    fields,
    mountView,
    models,
} from "@web/../tests/web_test_helpers";
import { Deferred, animationFrame, runAllTimers } from "@odoo/hoot-mock";

import {
    defineMailModels,
} from "@mail/../tests/mail_test_helpers";

defineMailModels();

describe.current.tags("desktop");

class Event extends models.Model {
    _name = "event";

    name = fields.Char();

    _records = [
        { id: 1, name: "partner 1" },
        { id: 2, name: "partner 2" },
        { id: 3, name: "partner 3" },
        { id: 4, name: "partner 4" },
    ];
}

defineModels([Event]);

test(`simple gallery view`, async () => {

    Event._fields.image_1920 = fields.Binary();
    Event._records[0].image_1920 = "R0lGODlhAQABAAD/ACwAAAAAAQABAAACAA==";
    Event._records[1].image_1920 = "R0lGODlhAQABAAD/ACwAAAAAAQABAAACAA==";
    Event._records[2].image_1920 = "R0lGODlhAQABAAD/ACwAAAAAAQABAAACAA==";
    Event._records[3].image_1920 = "R0lGODlhAQABAAD/ACwAAAAAAQABAAACAA==";

    await mountView({
        resModel: "event",
        type: "gallery",
        arch: `
            <gallery image_field="image_1920">
                <field name="name"/>
                <tooltip-template>
                    <p class="m-0">name: <field name="name"/></p>
                </tooltip-template>
            </gallery>`,
    });

    await animationFrame();
    expect(`.card`).toHaveCount(4, { message: "should have 3 columns" });
});
