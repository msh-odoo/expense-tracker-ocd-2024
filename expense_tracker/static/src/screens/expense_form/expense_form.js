import { Component, useState, onWillStart, onWillUpdateProps, onMounted, onPatched, useEffect, useRef } from '@odoo/owl';
import { registry } from "@web/core/registry";
import { useModel } from "../../model/model";
import { ExpenseTrackerModel } from "../../model/expense_tracker_model";
import { FormViewStatic } from '../../components/formview_static/formview_static';

class ExpenseForm extends Component {
    static template = "expense_tracker.ExpenseForm";
    static components = { FormViewStatic }
    setup() {
        this.model = useModel(ExpenseTrackerModel, this.modelParams);
        this.state = useState({ data: {}, isValidForm: true });
        this.title = "Expense";
        this.modelName = "personal.expense";
        this.footer = useRef("footer");
        this.form = useRef("form");
        const options = {
            model: this.modelName,
            id: this.props.id,
            fields: ["id", "name", "user_id", "date", "amount", "category_id", "payment_method_id"],
        };
        onWillStart(async () => {
            let res = {};
                res = await this.model.load_expense_form_data(options);
            this.state.data = res;
        });
        onWillUpdateProps((nextProps) => {
            if (nextProps.id) {
                this.state.data = this.model.load_expense_form_data(options);
            }
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

    /**
     * Checks form valid or not based on given value.
     */
    checkFormValid() {
        let isValid = true;
        this.form.el.querySelectorAll(".form-control").forEach((elem) => {
            if (elem.required && !elem.value) {
                isValid = false;
            }
        });
        this.state.isValidForm = isValid;
    }

    markFormInvalid() {
        this.form.el.classList.toggle('o_invalid', !this.state.isValidForm);
    }

    _onBounceEffect() {
        const buttonEl = this.footer.el.querySelector("button");
        buttonEl.classList.add("bounce");
        setTimeout(() => {
            buttonEl.classList.remove("bounce");
        }, 500);
    }

    async _onClickSubmitForm(ev) {
        ev.preventDefault();
        this.checkFormValid();
        const newExpense = {
            name: this.form.el.querySelector(".o_expense_description").value,
            date: this.form.el.querySelector(".o_expense_date").value,
            amount: this.form.el.querySelector(".o_expense_amount").value,
            category_id: parseInt(this.form.el.querySelector("o_expense_category").value),
        };
        if (this.state.data.record) {
            this._updateExpense(newExpense).then(() => {
                this.env.bus.trigger('change_screen', { 'screen_name': 'ExpenseList' });
            });
        } else {
            if (this.state.isValidForm) {
                this._createExpense(newExpense).then(() => {
                    this.env.bus.trigger('change_screen', { 'screen_name': 'ExpenseList' });
                });
            }
        }
    }
    async _createExpense(expense){
        return await this.model.orm.create("personal.expense", [expense]);
    }
    async _updateExpense(expense){
        return await this.model.orm.write("personal.expense", [parseInt(this.props.id)], expense)
    }
}

registry.category("screens").add("ExpenseForm", ExpenseForm);
