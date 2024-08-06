import { registry } from "@web/core/registry";
import { Component, useState } from "@odoo/owl";
import { _t } from "@web/core/l10n/translation";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { useRecordObserver } from "@web/model/relational_model/utils";


/**
 * TimerField is ususally used when we want to display remaining time
 * in number of hours, minutes and seconds from Today
 */
export class TimerField extends Component {
    static template = "web.TimerField";
    static props = {
        ...standardFieldProps,
        noSeconds: { type: Boolean, optional: true },
        displayDays: { type: Boolean, optional: true },
        interval: { type: Number, optional: true },
    };
    static defaultProps = {
        noSeconds: false,
        displayDays: false,
        interval: 1,
    };

    setup() {
        super.setup();
        this.state = useState({ value: null });
        useRecordObserver((record) => {
            this.state.value = this.props.record.data[this.props.name];
        });
    }

    get getTimeValue() {
        let delta = this.state.value;

        let days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // calculate (and subtract) whole hours
        const hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        const minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        // what's left is seconds
        const seconds = Math.floor(delta) % 60;
        return { days: days, hours: hours, minutes: minutes, seconds: seconds };
    }
}

export const timerField = {
    component: TimerField,
    displayName: _t("Timer"),
    supportedOptions: [
        {
            label: _t("Hide Seconds"),
            name: "no_seconds",
            type: "boolean",
        },
        {
            label: _t("Display Days"),
            name: "display_days",
            type: "boolean",
        },
        {
            label: _t("Time interval"),
            name: "interval",
            type: "number",
            default: 5,
            help: _t(
                `Control the number of seconds in the time selection. E.g. set it to 15 to work in quarters.`
            ),
        },
    ],
    supportedTypes: ["datetime"],
    extractProps: ({ attrs, options }) => ({
        noSeconds: options.no_seconds,
        displayDays: options.display_days,
        interval: options.interval,
    }),
}

registry.category("fields").add("timer", timerField);
