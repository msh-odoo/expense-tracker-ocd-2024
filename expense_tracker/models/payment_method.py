from odoo import models, fields

class PaymentMethod(models.Model):
    _name = 'payment.method'
    _description = 'Payment Method'

    name = fields.Char(string='Payment Method', required=True)
    icon = fields.Char()
    description = fields.Text(string='Description')
