import datetime

from odoo import _, api, fields, models


class CrmLead(models.Model):
    _inherit = "crm.lead"

    duration = fields.Float(string="Duration", compute="_compute_duration", help="Duration in Seconds")
    @api.depends("create_date", "date_deadline")
    def _compute_duration(self):
        for record in self:
            # diff = record.date_deadline - record.create_date
            # seconds = diff.total_seconds() / 60 / 60
            # record.duration = seconds
            record.duration = 100
