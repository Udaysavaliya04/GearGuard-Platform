# -*- coding: utf-8 -*-

from odoo import models, fields, api
from datetime import datetime, timedelta


class MaintenanceRequest(models.Model):
    _name = 'maintenance.request'
    _description = 'Maintenance Request'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'scheduled_date desc, id desc'

    name = fields.Char(
        string='Subject',
        required=True,
        tracking=True,
        help='Brief description of the maintenance issue'
    )
    
    description = fields.Text(
        string='Description',
        help='Detailed description of the maintenance work needed'
    )
    
    # Request Type
    request_type = fields.Selection([
        ('corrective', 'Corrective'),
        ('preventive', 'Preventive')
    ], string='Maintenance Type',
        required=True,
        default='corrective',
        tracking=True,
        help='Corrective: Unplanned repair (Breakdown) | Preventive: Planned maintenance (Routine Checkup)'
    )
    
    # Equipment & Team
    equipment_id = fields.Many2one(
        'maintenance.equipment',
        string='Equipment',
        required=True,
        tracking=True,
        ondelete='restrict',
        help='Equipment that requires maintenance'
    )
    
    category_id = fields.Many2one(
        'maintenance.equipment.category',
        string='Equipment Category',
        related='equipment_id.category_id',
        store=True,
        readonly=True,
        help='Automatically filled from equipment'
    )
    
    maintenance_team_id = fields.Many2one(
        'maintenance.team',
        string='Maintenance Team',
        required=True,
        tracking=True,
        help='Team responsible for this maintenance request'
    )
    
    technician_id = fields.Many2one(
        'res.users',
        string='Assigned Technician',
        tracking=True,
        domain="[('id', 'in', technician_user_ids)]",
        help='Technician assigned to handle this request'
    )
    
    technician_user_ids = fields.Many2many(
        'res.users',
        string='Available Technicians',
        compute='_compute_technician_user_ids',
        help='Technicians from the maintenance team'
    )
    
    # Scheduling
    scheduled_date = fields.Datetime(
        string='Scheduled Date',
        tracking=True,
        help='When the maintenance work should be performed'
    )
    
    duration = fields.Float(
        string='Duration (Hours)',
        tracking=True,
        help='Time spent on the repair work'
    )
    
    # Stage & Status
    stage_id = fields.Many2one(
        'maintenance.stage',
        string='Stage',
        required=True,
        tracking=True,
        group_expand='_read_group_stage_ids',
        default=lambda self: self._default_stage_id(),
        help='Current stage of the maintenance request'
    )
    
    priority = fields.Selection([
        ('0', 'Low'),
        ('1', 'Normal'),
        ('2', 'High'),
        ('3', 'Urgent')
    ], string='Priority',
        default='1',
        tracking=True
    )
    
    # Dates & Tracking
    request_date = fields.Datetime(
        string='Request Date',
        default=fields.Datetime.now,
        tracking=True,
        help='When the request was created'
    )
    
    close_date = fields.Datetime(
        string='Close Date',
        tracking=True,
        help='When the request was completed'
    )
    
    is_overdue = fields.Boolean(
        string='Is Overdue',
        compute='_compute_is_overdue',
        store=True,
        help='Whether the scheduled date has passed'
    )
    
    # Additional Info
    notes = fields.Text(
        string='Internal Notes'
    )
    
    color = fields.Integer(
        string='Color Index'
    )
    
    active = fields.Boolean(
        string='Active',
        default=True
    )
    
    @api.model
    def _default_stage_id(self):
        """Set default stage to 'New'"""
        return self.env['maintenance.stage'].search([('sequence', '=', 1)], limit=1)
    
    @api.depends('maintenance_team_id')
    def _compute_technician_user_ids(self):
        """Get available technicians from the maintenance team"""
        for request in self:
            if request.maintenance_team_id:
                request.technician_user_ids = request.maintenance_team_id.member_ids
            else:
                request.technician_user_ids = False
    
    @api.depends('scheduled_date', 'stage_id')
    def _compute_is_overdue(self):
        """Check if request is overdue"""
        for request in self:
            if request.scheduled_date and not request.stage_id.done:
                request.is_overdue = request.scheduled_date < fields.Datetime.now()
            else:
                request.is_overdue = False
    
    @api.onchange('equipment_id')
    def _onchange_equipment_id(self):
        """
        AUTO-FILL LOGIC:
        When equipment is selected, automatically fill maintenance team and category
        """
        if self.equipment_id:
            self.maintenance_team_id = self.equipment_id.maintenance_team_id
            if self.equipment_id.technician_id:
                self.technician_id = self.equipment_id.technician_id
            # Category is automatically filled via related field
    
    @api.model
    def _read_group_stage_ids(self, stages, domain, order):
        """Make all stages visible in Kanban view"""
        return self.env['maintenance.stage'].search([])
    
    def write(self, vals):
        """Override write to handle stage changes and scrap logic"""
        # Handle scrap logic
        if 'stage_id' in vals:
            stage = self.env['maintenance.stage'].browse(vals['stage_id'])
            if stage.is_scrap:
                # Mark equipment as scrapped
                for request in self:
                    if request.equipment_id:
                        request.equipment_id.write({
                            'is_scrapped': True,
                            'scrap_date': fields.Date.today(),
                            'active': False
                        })
                        # Log a note on the equipment
                        request.equipment_id.message_post(
                            body=f"Equipment scrapped via maintenance request: {request.name}",
                            subject="Equipment Scrapped"
                        )
            
            # Set close date when moving to done stage
            if stage.done and 'close_date' not in vals:
                vals['close_date'] = fields.Datetime.now()
        
        return super(MaintenanceRequest, self).write(vals)
    
    def action_assign_to_me(self):
        """Assign the request to current user"""
        self.write({'technician_id': self.env.user.id})
    
    def action_set_in_progress(self):
        """Move request to In Progress stage"""
        in_progress_stage = self.env['maintenance.stage'].search([('sequence', '=', 2)], limit=1)
        if in_progress_stage:
            self.write({'stage_id': in_progress_stage.id})
    
    def action_set_repaired(self):
        """Move request to Repaired stage"""
        repaired_stage = self.env['maintenance.stage'].search([('sequence', '=', 3)], limit=1)
        if repaired_stage:
            self.write({
                'stage_id': repaired_stage.id,
                'close_date': fields.Datetime.now()
            })


class MaintenanceStage(models.Model):
    _name = 'maintenance.stage'
    _description = 'Maintenance Stage'
    _order = 'sequence, id'

    name = fields.Char(
        string='Stage Name',
        required=True,
        translate=True
    )
    
    sequence = fields.Integer(
        string='Sequence',
        default=10
    )
    
    done = fields.Boolean(
        string='Request Done',
        help='Requests in this stage are considered as completed'
    )
    
    is_scrap = fields.Boolean(
        string='Scrap Stage',
        help='Moving request to this stage will mark equipment as scrapped'
    )
    
    fold = fields.Boolean(
        string='Folded in Kanban',
        help='This stage is folded in the kanban view'
    )
    
    description = fields.Text(
        string='Description'
    )
