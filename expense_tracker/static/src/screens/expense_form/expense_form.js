import { Component, useEffect, useState, onWillStart, onMounted, onPatched, useRef } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { FormView } from '../../components/formview/formview';

class ExpenseForm extends Component {
    static template = "expense_tracker.ExpenseForm";
    static components = { FormView }
    setup() {
        this.title = "Expense";
        this.state = useState({ data: {}, isValidForm: true });
        this.footer = useRef("footer");
        this.form = useRef("form");

        onWillStart(async () => {
            const res = {
                record: {
                    id: 1,
                    name: "Brunch at Hotel Leela",
                    date: "2024-08-21",
                    amount: 2000.00,
                    category_id: [1, "Food"]
                },
                categories: [
                    {id: 1, name: "Food"},
                    {id: 2, name: "Travel"},
                    {id: 3, name: "Entertaintment"},
                ],
            };
            this.state.data = res;
        });

        onMounted(() => {
            this.form.el.querySelector("input.form-control").focus();
        });

        onPatched(() => {
            this.form.el.querySelector("input.form-control").focus();
        });

        useEffect(
            (formEl) => {
                const boundedBounceEffect = this._onBounceEffect.bind(this);
                formEl.addEventListener("click", boundedBounceEffect);
                return () => formEl.removeEventListener("click", boundedBounceEffect);
            },
            () => [this.form.el]
        );
    }

    async _onClickSubmitForm(ev) {
        // Form submit logic here
    }

    _onBounceEffect() {
        const buttonEl = this.footer.el.querySelector("button");
        buttonEl.classList.add("bounce");
        setTimeout(() => {
            buttonEl.classList.remove("bounce");
        }, 500);
    }
}

registry.category("screens").add("ExpenseForm", ExpenseForm);
