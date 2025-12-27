# -*- coding: utf-8 -*-
{
    'name': 'GearGuard - Maintenance Tracker',
    'version': '1.0.0',
    'category': 'Operations/Maintenance',
    'summary': 'Ultimate Maintenance Management System for Equipment Tracking and Maintenance Requests',
    'description': """
        GearGuard - Maintenance Management System
        ==========================================
        
        Comprehensive maintenance tracker that allows companies to:
        * Track assets (machines, vehicles, computers)
        * Manage maintenance requests (Corrective & Preventive)
        * Organize maintenance teams
        * Schedule routine checkups
        * Monitor equipment lifecycle
        
        Key Features:
        -------------
        - Equipment database with department/employee tracking
        - Maintenance team management
        - Request workflow (New → In Progress → Repaired → Scrap)
        - Kanban board for visual management
        - Calendar view for preventive maintenance
        - Smart buttons and automation
        - Reports and analytics
    """,
    'author': 'GearGuard Development Team',
    'website': 'https://www.gearguard.com',
    'license': 'LGPL-3',
    'depends': ['base', 'mail'],
    'data': [
        'security/ir.model.access.csv',
        'views/maintenance_team_views.xml',
        'views/equipment_views.xml',
        'views/maintenance_request_views.xml',
        'views/menu_views.xml',
        'data/maintenance_stages.xml',
    ],
    'demo': [],
    'installable': True,
    'application': True,
    'auto_install': False,
}
