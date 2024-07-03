from odoo import models, fields

class ExpenseTag(models.Model):
    _name = 'expense.tag'
    _description = 'Expense Tags'

    name = fields.Char(string='Tag Name', required=True)
    color = fields.Integer(string='Color Index')
