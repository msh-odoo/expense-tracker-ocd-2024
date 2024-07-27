import { Component, useState, onWillStart, onWillUpdateProps, useEffect, useRef } from '@odoo/owl';
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
        const options = {
            model: this.modelName,
            id: this.props.id,
            fields: ["id", "name", "user_id", "date", "amount", "category_id", "payment_method_id"],
        };

        onWillStart(async () => {
            let res = {};
            if (this.props.id) {
                res = await this.model.load_expense_form_data(options);
            }
            this.state.data = res;
        });
        onWillUpdateProps((nextProps) => {
            if (nextProps.id) {
                this.state.data = ifthis.model.load_expense_form_data(options);
            }
        });

        this.form = useRef("form");
        useEffect(
            () => {
                debugger;
                this.markFormInvalid();
            },
            () => [this.state.isValidForm]);
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
        debugger;
        this.state.isValidForm = isValid;
    }

    markFormInvalid() {
        debugger;
        this.form.el.classList.toggle('o_invalid', !this.state.isValidForm);
    }

    _onClickSubmitForm(ev) {
        ev.preventDefault();
        this.checkFormValid();
        // this.trigger('expense-added', { ...this.state.newExpense });
        // this.state.newExpense = {
        //     name: '',
        //     date: '',
        //     amount: 0,
        //     category: 'food'
        // };
    }
}

registry.category("screens").add("ExpenseForm", ExpenseForm);
