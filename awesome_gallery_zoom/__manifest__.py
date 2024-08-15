# -*- coding: utf-8 -*-
{
    'name': "Gallery View Zoom",
    'summary': """
        Starting module for "Master the Odoo web framework, chapter 5: Create a Zoom of Gallery View"
    """,

    'description': """
        Starting module for "Master the Odoo web framework, chapter 5: Create a Zoom Gallery View"
    """,

    'version': '0.1',
    'application': True,
    'category': 'Tutorials/AwesomeGallery',
    'installable': True,
    'depends': ['web', 'contacts', 'awesome_gallery'],
    'data': [
        'views/views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'awesome_gallery_zoom/static/src/**/*',
        ],
    },
    'license': 'AGPL-3'
}
