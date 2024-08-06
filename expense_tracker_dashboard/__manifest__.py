# -*- coding: utf-8 -*-
{
    'name': "Awesome Dashboard",

    'summary': """
        Starting module for "Discover the JS framework, chapter 2: Build a dashboard"
    """,

    'description': """
        Starting module for "Discover the JS framework, chapter 2: Build a dashboard"
    """,

    'author': "Odoo",
    'website': "https://www.odoo.com/",
    'category': 'Tutorials/AwesomeDashboard',
    'version': '0.1',
    'application': True,
    'installable': True,
    'depends': ['base', 'web', 'expense_tracker'],

    'data': [
        'views/views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'expense_tracker_dashboard/static/src/**/*',
            ('remove', 'expense_tracker_dashboard/static/src/dashboard/**/*'),
        ],
        'expense_tracker_dashboard.dashboard': [
            'expense_tracker_dashboard/static/src/dashboard/**/*'
        ]
    },
    'license': 'AGPL-3'
}
