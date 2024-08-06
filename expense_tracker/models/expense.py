from odoo import models, fields, api, Command

class PersonalExpense(models.Model):
    _name = 'personal.expense'
    _description = 'Personal Expense Tracker'

    name = fields.Char(string='Description', required=True)
    active = fields.Boolean(default=True)
    user_id = fields.Many2one("res.users", default=lambda self: self.env.user, required=True)
    date = fields.Date(string='Date', required=True, default=fields.Date.today)
    amount = fields.Float(string='Amount', required=True)
    category_id = fields.Many2one('expense.category', string='Category', required=True)
    icon = fields.Char(related="category_id.icon", string="Icon")
    payment_method_id = fields.Many2one('payment.method', string='Payment Method')
    tag_ids = fields.Many2many('expense.tag', string='Tags')
