from odoo import http
from odoo.http import request, route

class ExpenseTracker(http.Controller):

    @http.route(['/expense_tracker'], type='http', auth='user')
    def expense_tracker(self):
        """
        Renders the owl ecommerce page
        """
        return request.render('expense_tracker.root')
