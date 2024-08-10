import { registry } from "@web/core/registry";
import { PersonalExpenseList } from "@expense_tracker/screens/expense_list/expense_list";
import { ExpenseCategoriesList } from "@expense_tracker/screens/expense_categories_list/expense_categories_list";

export const items = [
    {
        id: "recent_expenses",
        description: "Recent Expenses",
        Component: PersonalExpenseList,
        size: 3,
        props: (data) => ({
            title: "Recent Expenses",
        }),
    },
    {
        id: "top_categories",
        description: "Top Categories",
        Component: ExpenseCategoriesList,
        size: 3,
        props: (data) => ({
            title: "Top Categories",
        }),
    },
]
