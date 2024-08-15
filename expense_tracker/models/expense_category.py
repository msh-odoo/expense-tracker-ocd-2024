from odoo import models, fields

class ExpenseIcon(models.Model):
    _name = 'expense.icon'
    _description = 'Expense Icon'

    name = fields.Char()


class ExpenseCategory(models.Model):
    _name = 'expense.category'
    _description = 'Expense Category'

    name = fields.Char(string='Category Name', required=True)
    icon_id = fields.Many2one(
        "expense.icon",
        string='Category Icon',
        readonly=False,
        help='This field holds the image class from font-awesome.')
    description = fields.Text(string='Description')
