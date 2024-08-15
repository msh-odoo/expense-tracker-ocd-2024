import { registry } from "@web/core/registry";
import { CheckBox } from "@web/core/checkbox/checkbox";
import { localization } from "@web/core/l10n/localization";
import { _t } from "@web/core/l10n/translation";
import { Component, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";


export class IconSelector extends Component {
    static template = "expense_tracker.ImageSelector";
    static props = {
        record: Object,
        readonly: Boolean,
    };

    setup() {
        const rec = this.props.record ? this.props.record.data : false;
        const orm = useService("orm");
        const iconFieldInfo = this.props.record.fields.icon_id;
        if (rec) {
            this.icon_id = rec.icon_id && rec.icon_id[0] || false;
        }
        this.state = useState({ icon_id: this.icon_id });
        onWillStart(async () => {
            this.icons = await orm.searchRead(
                iconFieldInfo.relation,
                [],
                [],
                {
                    limit: 20,
                }
            );
        });
    }
    onChangeIcon(ev) {
        const id = ev.currentTarget.getAttribute('data-id');
        const name = ev.currentTarget.getAttribute('data-value');
        this.state.icon_id = parseInt(id);
        this.props.record.update({ icon_id: [this.state.icon_id, name] });
    }
}

export const iconSelector = {
    component: IconSelector,
    fieldDependencies: [
        { name: "icon_id", type: "many2one", string: _t("Icons"), readonly: false },
    ],
};

registry.category("view_widgets").add("icon_selector", iconSelector);
