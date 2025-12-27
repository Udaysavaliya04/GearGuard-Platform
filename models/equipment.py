# -*- coding: utf-8 -*-

from odoo import models, fields, api


class MaintenanceEquipment(models.Model):
    _name = 'maintenance.equipment'
    _description = 'Maintenance Equipment'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(
        string='Equipment Name',
        required=True,
        tracking=True,
        help='Name of the equipment (e.g., CNC Machine, Laptop)'
    )
    
    serial_number = fields.Char(
        string='Serial Number',
        tracking=True,
        copy=False,
        help='Unique serial number of the equipment'
    )
    
    category_id = fields.Many2one(
        'maintenance.equipment.category',
        string='Equipment Category',
        tracking=True,
        ondelete='restrict',
        help='Category of equipment (e.g., Vehicles, Computers, Machinery)'
    )
    
    # Ownership & Assignment
    department_id = fields.Many2one(
        'hr.department',
        string='Department',
        tracking=True,
        help='Department that owns this equipment (e.g., Production, IT)'
    )
    
    employee_id = fields.Many2one(
        'res.users',
        string='Assigned to Employee',
        tracking=True,
        help='Employee who is responsible for or uses this equipment'
    )
    
    # Maintenance Team Assignment
    maintenance_team_id = fields.Many2one(
        'maintenance.team',
        string='Maintenance Team',
        required=True,
        tracking=True,
        help='Team responsible for maintaining this equipment'
    )
    
    technician_id = fields.Many2one(
        'res.users',
        string='Default Technician',
        tracking=True,
        help='Default technician assigned to maintain this equipment'
    )
    
    # Purchase & Warranty Information
    purchase_date = fields.Date(
        string='Purchase Date',
        tracking=True,
        help='Date when the equipment was purchased'
    )
    
    warranty_start_date = fields.Date(
        string='Warranty Start Date',
        tracking=True
    )
    
    warranty_end_date = fields.Date(
        string='Warranty End Date',
        tracking=True
    )
    
    warranty_info = fields.Text(
        string='Warranty Information',
        help='Additional warranty details'
    )
    
    # Location
    location = fields.Char(
        string='Location',
        tracking=True,
        help='Physical location of the equipment (e.g., Building A, Floor 2, Room 205)'
    )
    
    # Status & Lifecycle
    active = fields.Boolean(
        string='Active',
        default=True,
        tracking=True,
        help='Uncheck to archive equipment'
    )
    
    is_scrapped = fields.Boolean(
        string='Scrapped',
        default=False,
        tracking=True,
        help='Equipment is no longer usable and has been scrapped'
    )
    
    scrap_date = fields.Date(
        string='Scrap Date',
        tracking=True
    )
    
    # Maintenance Information
    maintenance_count = fields.Integer(
        string='Maintenance Count',
        compute='_compute_maintenance_count',
        help='Total number of maintenance requests for this equipment'
    )
    
    maintenance_open_count = fields.Integer(
        string='Open Maintenance',
        compute='_compute_maintenance_count',
        help='Number of open maintenance requests'
    )
    
    notes = fields.Text(
        string='Notes',
        help='Additional information about this equipment'
    )
    
    color = fields.Integer(
        string='Color Index'
    )
    
    @api.depends('name')
    def _compute_maintenance_count(self):
        """Compute the number of maintenance requests for this equipment"""
        for equipment in self:
            all_requests = self.env['maintenance.request'].search_count([
                ('equipment_id', '=', equipment.id)
            ])
            open_requests = self.env['maintenance.request'].search_count([
                ('equipment_id', '=', equipment.id),
                ('stage_id.done', '!=', True)
            ])
            equipment.maintenance_count = all_requests
            equipment.maintenance_open_count = open_requests
    
    def action_view_maintenance_requests(self):
        """Smart button action to view all maintenance requests for this equipment"""
        self.ensure_one()
        return {
            'name': 'Maintenance Requests',
            'type': 'ir.actions.act_window',
            'res_model': 'maintenance.request',
            'view_mode': 'kanban,tree,form,calendar',
            'domain': [('equipment_id', '=', self.id)],
            'context': {
                'default_equipment_id': self.id,
                'default_maintenance_team_id': self.maintenance_team_id.id,
                'default_technician_id': self.technician_id.id,
            }
        }
    
    @api.onchange('maintenance_team_id')
    def _onchange_maintenance_team_id(self):
        """When team changes, suggest a technician from that team"""
        if self.maintenance_team_id and self.maintenance_team_id.member_ids:
            # Optionally set first team member as default technician
            if not self.technician_id or self.technician_id not in self.maintenance_team_id.member_ids:
                self.technician_id = self.maintenance_team_id.member_ids[0] if self.maintenance_team_id.member_ids else False


class MaintenanceEquipmentCategory(models.Model):
    _name = 'maintenance.equipment.category'
    _description = 'Equipment Category'
    
    name = fields.Char(
        string='Category Name',
        required=True,
        help='Name of the equipment category (e.g., Vehicles, Computers, Machinery)'
    )
    
    equipment_count = fields.Integer(
        string='Equipment Count',
        compute='_compute_equipment_count'
    )
    
    notes = fields.Text(
        string='Notes'
    )
    
    @api.depends('name')
    def _compute_equipment_count(self):
        for category in self:
            category.equipment_count = self.env['maintenance.equipment'].search_count([
                ('category_id', '=', category.id)
            ])
