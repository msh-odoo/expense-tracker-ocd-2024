{
    'name': 'Personal Expense Tracker',
    'version': '1.0',
    'summary': 'Track personal expenses',
    'category': 'Tools',
    'author': 'Mohammed Shekha',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'views/expense_views.xml',
        'views/expense_tracker_templates.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'expense_tracker/static/src/backend/**/*',
        ],
        'expense_tracker.assets_expense': [
            ('include', 'web._assets_core'),
            ('include', 'web._assets_helpers'),
            ('include', 'web._assets_frontend_helpers'),

            'web/static/src/scss/pre_variables.scss',
            'web/static/lib/bootstrap/scss/_variables.scss',
            'web/static/lib/bootstrap/scss/_variables-dark.scss',
            'web/static/lib/bootstrap/scss/_maps.scss',

            ('include', 'web._assets_bootstrap_frontend'),
            ('include', 'web.assets_frontend_minimal'),
            # bootstrap
            'web/static/lib/bootstrap/js/dist/util/index.js',
            'web/static/lib/bootstrap/js/dist/dom/data.js',
            'web/static/lib/bootstrap/js/dist/dom/event-handler.js',
            'web/static/lib/bootstrap/js/dist/dom/manipulator.js',
            'web/static/lib/bootstrap/js/dist/dom/selector-engine.js',
            'web/static/lib/bootstrap/js/dist/util/config.js',
            'web/static/lib/bootstrap/js/dist/util/component-functions.js',
            'web/static/lib/bootstrap/js/dist/util/backdrop.js',
            'web/static/lib/bootstrap/js/dist/util/focustrap.js',
            'web/static/lib/bootstrap/js/dist/util/sanitizer.js',
            'web/static/lib/bootstrap/js/dist/util/scrollbar.js',
            'web/static/lib/bootstrap/js/dist/util/swipe.js',
            'web/static/lib/bootstrap/js/dist/util/template-factory.js',
            'web/static/lib/bootstrap/js/dist/base-component.js',
            'web/static/lib/bootstrap/js/dist/alert.js',
            'web/static/lib/bootstrap/js/dist/button.js',
            'web/static/lib/bootstrap/js/dist/carousel.js',
            'web/static/lib/bootstrap/js/dist/collapse.js',
            'web/static/lib/bootstrap/js/dist/dropdown.js',
            'web/static/lib/bootstrap/js/dist/modal.js',
            'web/static/lib/bootstrap/js/dist/offcanvas.js',
            'web/static/lib/bootstrap/js/dist/tooltip.js',
            'web/static/lib/bootstrap/js/dist/popover.js',
            'web/static/lib/bootstrap/js/dist/scrollspy.js',
            'web/static/lib/bootstrap/js/dist/tab.js',
            'web/static/lib/bootstrap/js/dist/toast.js',

            # 'web/static/lib/moment/moment.js', # required for date/datetime operations
            'web/static/src/libs/fontawesome/css/font-awesome.css', # required for fa icons
            'web/static/src/libs/fontawesome/fonts/fontawesome-webfont.ttf',
            'web/static/src/libs/fontawesome/fonts/fontawesome-webfont.woff',
            'web/static/src/libs/fontawesome/fonts/fontawesome-webfont.woff2',
            # 'web/static/src/legacy/js/promise_extension.js', # required by boot.js
            # 'web/static/src/boot.js', # odoo module system
            # 'web/static/src/session.js', # expose __session_info__ containing server information
            'web/static/lib/owl/owl.js',
            'web/static/lib/owl/odoo_module.js', # to be able to import "@odoo/owl"
            'web/static/src/core/template_inheritance.js',
            'web/static/src/core/templates.js',
            'web/static/src/core/utils/functions.js',
            'web/static/src/core/utils/components.js',
            'web/static/src/core/browser/browser.js',
            'web/static/src/core/registry.js',
            'web/static/src/core/assets.js',

            'expense_tracker/static/src/**/*',
        ],
    },
    'installable': True,
    'application': True,
}
