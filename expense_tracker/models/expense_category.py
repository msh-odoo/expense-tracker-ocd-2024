from odoo import models, fields


class ExpenseCategory(models.Model):
    _name = 'expense.category'
    _description = 'Expense Category'

    name = fields.Char(string='Category Name', required=True)
    icon = fields.Char(
        string='Category Icon',
        store=True,
        readonly=True,
        help='This field holds the image class from font-awesome.')
    description = fields.Text(string='Description')
