from odoo import http
from odoo.http import request, route

class ExpenseTracker(http.Controller):

    @http.route(['/expense_tracker'], type='http', auth='user')
    def expense_tracker(self):
        """
        Renders the owl ecommerce page
        """
        return request.render('expense_tracker.root')

    @http.route('/expense/get_form_data/<string:model>/<int:id>', type='json', auth='user')
    def get_form_data(self, model=None, id=False, **kw):
        data = {}
        if id:
            domain = [("id", "=", id)]
            record = request.env[model].sudo().search_read(
                domain,
                kw.get("fields") or ["id", "name"]
            )
        else:
            record = request.env[model].default_get([])
        data["record"] = record[0]
        data["record_fields"] = request.env[model].sudo().fields_get()

        return data
