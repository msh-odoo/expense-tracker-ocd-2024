from odoo import http
from odoo.http import request, route

class ExpenseTracker(http.Controller):

    @http.route(['/expense_tracker'], type='http', auth='user')
    def expense_tracker(self):
        """
        Renders the owl ecommerce page
        """
        return request.render('expense_tracker.root')

    @http.route(['/expense/get_expense_form_data/<string:model>/<int:id>',
    '/expense/get_expense_form_data/<string:model>/'], type='json', auth='user')
    def get_expense_form_data(self, model=None, id=False, **kw):
        data = {}
        if id:
            domain = [("id", "=", id)]
            record = request.env[model].sudo().search_read(
                domain,
                kw.get("fields") or ["id", "name"]
            )
            data["record"] = record[0]
            data["record_fields"] = request.env[model].sudo().fields_get()

        categories = request.env['expense.category'].sudo().search_read([], [])
        data["categories"] = categories
        return data

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

    @http.route('/expense/get_related_model_data/<string:model>/', type='json', auth='user')
    def get_related_model_data(self, model=None, id=False, **kw):
        domain = kw.get("domain") or []
        data = request.env[model].sudo().search_read(
            domain,
            kw.get("fields") or ["id", "name"]
        )
        return data

    @http.route('/expense/get_expense_category_data', type='json', auth='user')
    def get_ecommerce_data(self, **kw):
        data = {}
        if kw.get("id"):
            category = request.env["expense.category"].sudo().search_read(
                [("id", "=", kw.get("id"))],
                ["name", "icon", "description"]
            )
        else:
            category = request.env["expense.category"].default_get([])
        data["category"] = category
        data["category_fields"] = request.env["expense.category"].sudo().fields_get()
        return data

    @http.route('/expense/tests', type='http', auth='user', readonly=True)
    def unit_tests_suite(self, mod=None, **kwargs):
        return request.render('expense_tracker.unit_tests_suite', {'session_info': {'view_info': request.env['ir.ui.view'].get_view_info()}})
