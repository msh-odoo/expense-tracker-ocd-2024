from odoo import http
from odoo.http import request, route

class ExpenseTracker(http.Controller):

    @http.route(['/expense_tracker'], type='http', auth='public')
    def expense_tracker(self):
        """
        Renders the owl ecommerce page
        """
        return request.render('expense_tracker.root')

    @http.route(['/get_expense_tracker_data'], type='json', auth='public')
    def get_ecommerce_data(self, **kw):
        data = {}
        products = request.env['product.template'].sudo().search_read([('is_published', '=', True)], ['name', 'list_price', 'categ_id', 'image_1920'], limit=20)
        product_tmpl_ids = [p.get('id') for p in products]
        product_images = request.env['product.image'].sudo().search_read([('product_tmpl_id', 'in', product_tmpl_ids)], ['name', 'product_tmpl_id', 'image_1920'])
        for product in products:
            product_images_filtered = [img for img in product_images if img.get('product_tmpl_id') == product.get('id')]
            product_images_filtered.append({'name': product.get('name'), 'image_1920': product.get('image_1920')})
            product.update({'images': product_images_filtered})
        categories = request.env['product.public.category'].sudo().search_read([('product_tmpl_ids', 'in', product_tmpl_ids)], ['name', 'parent_id'], limit=20)
        data['products'] = products
        # data['product_images'] = product_images
        data['categories'] = categories

        # AuctionImages = request.env['auction.auction.images']
        # auctionItems = request.env['auction.auction'].search_read([])
        # categories = request.env['auction.category'].search_read([])
        # for auctionItem in auctionItems:
        #     # TODO: MSH: Can optimized, instead of adding search in loop, we can collect all IDS and search one time and do some logical operations
        #     image_ids = auctionItem.get('image_ids')
        #     images = AuctionImages.search_read([('id', 'in', image_ids)])
        #     auctionItem['images'] = images
        # data['auctionItems'] = auctionItems
        # data['categories'] = categories
        return data
