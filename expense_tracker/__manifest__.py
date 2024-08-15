{
    'name': 'Personal Expense Tracker',
    'version': '1.0',
    'summary': 'Track personal expenses',
    'category': 'Tools',
    'author': 'Mohammed Shekha',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'data/expense_payment_method_data.xml',
        'views/expense_views.xml',
        'views/expense_tracker_templates.xml',
    ],
    'demo': [
        'data/expense_icon_demo.xml',
        'data/expense_category_demo.xml',
        'data/expense_demo.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'expense_tracker/static/src/backend/**/*',
        ],
        'expense_tracker.assets_expense': [
            ('include', 'web.assets_backend'),
            'expense_tracker/static/src/**/*',
        ],
    },
    'installable': True,
    'application': True,
}
