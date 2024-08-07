from datetime import datetime

from odoo import _, api, fields, models


class CrmLead(models.Model):
    _inherit = "crm.lead"

    duration = fields.Float(string="Duration", compute="_compute_duration", help="Duration in Seconds")
    @api.depends("create_date", "date_deadline")
    def _compute_duration(self):
        for record in self:
            if record.date_deadline:
                datetime_deadline = datetime(year=record.date_deadline.year, month=record.date_deadline.month, day=record.date_deadline.day)
                diff = datetime_deadline - record.create_date
                seconds = diff.total_seconds()
                record.duration = seconds
            else:
                record.duration = 0
