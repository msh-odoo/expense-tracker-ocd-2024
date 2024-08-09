import { rpc } from "@web/core/network/rpc";
import { App, EventBus } from "@odoo/owl";
import { getTemplate } from "@web/core/templates";
import { ExpenseTracker } from "./expense_tracker";

owl.whenReady(async () => {
    const bus = new EventBus();
    const datetime = new Date();
    const env = { bus, rpc, datetime };

    const translations = {};
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');
    let translationBundle;
    if (lang) {
        const terms = {
            fr_FR: {
                "Home": "Maison",
                "Description": "Description",
                "Date:": "Date",
                "Amount": "Montante",
                "Category": "Catégorie",
                "Categories": "Catégories",
                "Tags": "Balises",
                "Dashboard": "Tableau de bord",
                "Quick Access": "Accès rapide",
                "New Expense": "Nouvelle dépense",
                "New Category": "Nouvelle catégorie",
                "Expenses": "Dépenses",
                "Total Amount:": "Montant total:",
            }
        };
        Object.assign(translations, terms);
        translationBundle = translations[lang];
    }

    const getTranslation = (str) => {
        if (!translationBundle) {
            return str;
        }
        return translationBundle[str] || str;
    }

    const app = new App(ExpenseTracker, {
        env,
        getTemplate,
        warnIfNoStaticProps: true, // !session.test_mode,
        name: ExpenseTracker.constructor.name,
        translateFn: getTranslation,
    });
    const root = await app.mount(document.body);
});
