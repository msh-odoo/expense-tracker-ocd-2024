import { registry } from "@web/core/registry";
import { Component } from "@odoo/owl";
import { _t } from "@web/core/l10n/translation";
import { standardFieldProps } from "@web/views/fields/standard_field_props";


export class TimerField extends Component {
    static template = "web.TimerField";
    static props = {
        ...standardFieldProps,
    };
}

export const timerField = {
    component: TimerField,
    displayName: _t("Timer"),
    supportedTypes: ["datetime"],
}

registry.category("fields").add("timer", timerField);
