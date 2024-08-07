# -*- coding: utf-8 -*-
{
    'name': "Awesome Field",
    'summary': """
        Starting module for "Add new field"
    """,

    'description': """
        Starting module for Add new field.
    """,

    'version': '0.1',
    'application': True,
    'category': 'Tutorials/AwesomeField',
    'installable': True,
    'depends': ['web', 'crm'],
    'data': [
        'views/views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'awesome_field/static/src/**/*',
        ],
    },
    'license': 'AGPL-3'
}
