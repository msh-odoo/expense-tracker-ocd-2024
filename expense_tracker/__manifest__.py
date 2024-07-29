{
    'name': 'Personal Expense Tracker',
    'version': '1.0',
    'summary': 'Track personal expenses',
    'category': 'Tools',
    'author': 'Mohammed Shekha',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'data/expense_payment_method_data.xml',
        'views/expense_views.xml',
        'views/expense_tracker_templates.xml',
    ],
    'demo': [
        'data/expense_category_demo.xml',
        'data/expense_demo.xml',
    ],
    'assets': {
        # 'web.assets_backend': [
        #     'expense_tracker/static/src/backend/**/*',
        # ],
        'expense_tracker.assets_expense': [
            ('include', 'web.assets_backend'),
            'expense_tracker/static/src/**/*',
        ],
        # Assets for test framework and setup
        'expense_tracker.assets_unit_tests_setup': [
            'web/static/src/module_loader.js',

            'web/static/lib/owl/owl.js',
            'web/static/lib/owl/odoo_module.js',

            'web/static/lib/hoot/**/*',
            'web/static/lib/hoot-dom/**/*',
            ('remove', 'web/static/lib/hoot/tests/**/*'),

            # Odoo mocks
            # ! must be loaded before other @web assets
            'web/static/tests/_framework/mock_module_loader.js',

            # Assets for features to test (views, services, fields, ...)
            # Typically includes most files in 'web.web.assets_backend'
            ('include', 'web.assets_backend'),
            ('include', 'web.assets_backend_lazy'),
            'expense_tracker/static/src/**/*',

            'web/static/src/public/public_component_service.js',
            'web/static/src/webclient/clickbot/clickbot.js',
        ],
        # Unit test files
        'expense_tracker.assets_unit_tests': [
            # 'web/static/tests/**/*',
            'web/static/tests/_framework/**/*',
            'web/static/tests/web_test_helpers.js',
            'expense_tracker/static/tests/**/*',

            ('remove', 'web/static/tests/_framework/mock_module_loader.js'),
            # ('remove', 'web/static/tests/legacy/**/*'), # to remove when all legacy tests are ported
        ],
    },
    'installable': True,
    'application': True,
}
