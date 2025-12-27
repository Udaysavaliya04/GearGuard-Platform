# -*- coding: utf-8 -*-

from odoo import models, fields, api


class MaintenanceTeam(models.Model):
    _name = 'maintenance.team'
    _description = 'Maintenance Team'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(
        string='Team Name',
        required=True,
        tracking=True,
        help='Name of the maintenance team (e.g., Mechanics, Electricians, IT Support)'
    )
    
    member_ids = fields.Many2many(
        'res.users',
        'maintenance_team_members_rel',
        'team_id',
        'user_id',
        string='Team Members',
        tracking=True,
        help='Technicians who are part of this maintenance team'
    )
    
    equipment_count = fields.Integer(
        string='Equipment Count',
        compute='_compute_equipment_count',
        help='Number of equipment assigned to this team'
    )
    
    request_count = fields.Integer(
        string='Request Count',
        compute='_compute_request_count',
        help='Number of maintenance requests for this team'
    )
    
    active = fields.Boolean(
        string='Active',
        default=True,
        tracking=True
    )
    
    color = fields.Integer(
        string='Color Index',
        help='Color for Kanban view'
    )
    
    notes = fields.Text(
        string='Notes',
        help='Additional information about this team'
    )
    
    @api.depends('name')
    def _compute_equipment_count(self):
        for team in self:
            team.equipment_count = self.env['maintenance.equipment'].search_count([
                ('maintenance_team_id', '=', team.id)
            ])
    
    @api.depends('name')
    def _compute_request_count(self):
        for team in self:
            team.request_count = self.env['maintenance.request'].search_count([
                ('maintenance_team_id', '=', team.id)
            ])
    
    def action_view_equipment(self):
        """Smart button action to view equipment assigned to this team"""
        self.ensure_one()
        return {
            'name': 'Equipment',
            'type': 'ir.actions.act_window',
            'res_model': 'maintenance.equipment',
            'view_mode': 'tree,form',
            'domain': [('maintenance_team_id', '=', self.id)],
            'context': {'default_maintenance_team_id': self.id}
        }
    
    def action_view_requests(self):
        """Smart button action to view requests for this team"""
        self.ensure_one()
        return {
            'name': 'Maintenance Requests',
            'type': 'ir.actions.act_window',
            'res_model': 'maintenance.request',
            'view_mode': 'kanban,tree,form,calendar',
            'domain': [('maintenance_team_id', '=', self.id)],
            'context': {'default_maintenance_team_id': self.id}
        }
