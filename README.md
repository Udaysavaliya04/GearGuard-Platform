# GearGuard: The Ultimate Maintenance Tracker

A comprehensive Odoo module for managing equipment maintenance, tracking assets, and organizing maintenance teams.

## 📋 Overview

GearGuard is a powerful maintenance management system designed to help companies track their assets (machines, vehicles, computers) and efficiently manage maintenance requests. The module seamlessly connects Equipment (what needs fixing), Teams (who fixes it), and Requests (the work to be done).

## ✨ Key Features

### 🔧 Equipment Management

- **Comprehensive Asset Database**: Track all company equipment with detailed information
- **Equipment Tracking**:
  - By Department (e.g., CNC Machine → Production)
  - By Employee (e.g., Laptop → John Doe)
- **Key Information**:
  - Equipment Name & Serial Number
  - Purchase Date & Warranty Details
  - Physical Location
  - Assigned Maintenance Team & Default Technician
- **Smart Buttons**: View all maintenance requests related to specific equipment
- **Lifecycle Management**: Track equipment from purchase to potential scrap

### 👥 Maintenance Team Management

- **Specialized Teams**: Create teams like Mechanics, Electricians, IT Support
- **Team Members**: Assign technicians to specific teams
- **Workflow Logic**: Requests assigned to teams can only be picked up by team members
- **Team Dashboard**: View equipment and requests assigned to each team

### 🎫 Maintenance Request Management

#### Request Types:

1. **Corrective**: Unplanned repairs (Breakdowns)
2. **Preventive**: Planned maintenance (Routine Checkups)

#### Request Lifecycle:

```
New → In Progress → Repaired → (Scrap)
```

#### Key Fields:

- Subject: Description of the issue
- Equipment: Which asset is affected
- Maintenance Team: Auto-filled from equipment
- Assigned Technician: From the maintenance team
- Scheduled Date: When work should be performed
- Duration: Hours spent on repair
- Priority: Low, Normal, High, Urgent

## 🔄 Functional Workflows

### Flow 1: The Breakdown (Corrective Maintenance)

1. **Request Creation**: Any user creates a maintenance request
2. **Auto-Fill Logic**:
   - Select equipment (e.g., "Printer 01")
   - System automatically fills:
     - Equipment Category
     - Maintenance Team
     - Default Technician
3. **Request State**: Starts in "New" stage
4. **Assignment**: Manager or technician assigns themselves
5. **Execution**: Stage moves to "In Progress"
6. **Completion**:
   - Technician records hours spent (Duration)
   - Stage moves to "Repaired"

### Flow 2: The Routine Checkup (Preventive Maintenance)

1. **Scheduling**: Manager creates a "Preventive" request
2. **Date Setting**: Sets scheduled date (e.g., Next Monday)
3. **Visibility**: Request appears in Calendar View on the scheduled date
4. **Execution**: Technician performs routine maintenance
5. **Completion**: Records work and marks as complete

## 🎨 User Interface & Views

### 1. Kanban Board (Primary Workspace)

- **Drag & Drop**: Move cards between stages (New → In Progress → Repaired → Scrap)
- **Visual Indicators**:
  - Technician avatars on each card
  - Red "OVERDUE" ribbon for late requests
  - Priority stars
  - Request type badges (Corrective/Preventive)
  - Team and equipment information
- **Group By**: Stages, Teams, Equipment, Technician

### 2. Calendar View

- **Preventive Maintenance Focus**: View all scheduled maintenance
- **Color-Coded**: By maintenance team
- **Quick Create**: Click a date to schedule new maintenance
- **Filters**: By team, technician, equipment

### 3. Tree/List View

- **Quick Overview**: All requests in a table format
- **Sorting & Filtering**: By any field
- **Visual Decorations**:
  - Red text for overdue requests
  - Muted text for completed requests

### 4. Pivot & Graph Reports

- **Analytics Dashboard**:
  - Number of requests per team
  - Requests per equipment category
  - Duration analysis
  - Request type distribution
- **Customizable**: Group by any dimension

## 🤖 Smart Features & Automation

### Auto-Fill Logic

When selecting equipment in a maintenance request:

- **Automatic Population**:
  - Equipment Category → Filled from equipment record
  - Maintenance Team → Filled from equipment record
  - Default Technician → Suggested from equipment record

### Smart Buttons

**On Equipment Form**:

- **"Maintenance" Button**:
  - Shows count of all maintenance requests
  - Shows count of open requests
  - Click to view filtered list of requests for that equipment
  - Badge displays open request count

**On Maintenance Team Form**:

- **"Equipment" Button**: View all equipment assigned to team
- **"Requests" Button**: View all requests for the team

### Scrap Logic

When a request is moved to the "Scrap" stage:

- Equipment is automatically marked as scrapped
- Scrap date is recorded
- Equipment is archived
- Notification is logged on equipment record

### Overdue Detection

- Automatically calculates if scheduled date has passed
- Visual indicators (red ribbon) on Kanban cards
- Filterable in search views

## 📊 Reporting & Analytics

### Available Reports:

1. **Maintenance Analysis** (Pivot View):

   - Requests by Team and Category
   - Total duration by team
   - Request distribution

2. **Graph Views**:
   - Bar charts of requests by team
   - Request type distribution
   - Trend analysis by scheduled date

### Search & Filters:

- My Requests
- Unassigned Requests
- Corrective vs Preventive
- Overdue Requests
- Open vs Done Requests
- Scheduled This Week

### Group By Options:

- Equipment
- Equipment Category
- Maintenance Team
- Technician
- Stage
- Request Type
- Scheduled Date (by month)

## 🔒 Security & Access Control

### User Roles:

- **Standard Users**:

  - View all records
  - Create and edit equipment and requests
  - Cannot delete

- **System Administrators**:
  - Full access to all records
  - Can configure teams, stages, and categories
  - Can delete records

## 📥 Installation

1. **Copy Module**: Place the `GearGuard Platform` folder in your Odoo addons directory

2. **Update App List**:

   ```bash
   # In Odoo, go to Apps → Update Apps List
   ```

3. **Install Module**:

   - Search for "GearGuard"
   - Click "Install"

4. **Dependencies**:
   - `base` (Odoo core)
   - `mail` (for activity tracking and chatter)

## 🚀 Quick Start Guide

### Step 1: Create Maintenance Teams

1. Go to **GearGuard → Configuration → Maintenance Teams**
2. Create teams:
   - Mechanics
   - Electricians
   - IT Support
3. Add team members (users) to each team

### Step 2: Create Equipment Categories

1. Go to **GearGuard → Configuration → Equipment Categories**
2. Create categories:
   - Vehicles
   - Computers
   - Machinery
   - Office Equipment

### Step 3: Add Equipment

1. Go to **GearGuard → Operations → Equipment**
2. For each asset, enter:
   - Name and Serial Number
   - Category
   - Department or Assigned Employee
   - Maintenance Team
   - Default Technician
   - Location
   - Purchase Date and Warranty

### Step 4: Create Maintenance Requests

1. Go to **GearGuard → Operations → Maintenance Requests**
2. Create a request:
   - Select Equipment (team auto-fills)
   - Choose Request Type (Corrective/Preventive)
   - Set Scheduled Date (for preventive)
   - Assign to Technician
3. Track progress through Kanban board

## 📱 Usage Tips

### For Managers:

- Use Calendar View to plan preventive maintenance
- Monitor Overdue requests using filters
- Use Pivot reports to analyze team performance
- Group requests by Department to track equipment health

### For Technicians:

- Use "My Requests" filter to see assigned work
- Use Kanban board to drag requests through workflow
- Use "Assign to Me" button on unassigned requests
- Record actual time spent in Duration field

### For Equipment Owners:

- Click Smart Button on equipment to see maintenance history
- Check warranty dates before creating requests
- Use Notes field for special instructions

## 🎯 Best Practices

1. **Equipment Setup**:

   - Always assign a maintenance team to equipment
   - Keep serial numbers and locations up to date
   - Set warranty dates for warranty tracking

2. **Preventive Maintenance**:

   - Schedule regular checkups using Calendar view
   - Create recurring patterns for routine maintenance
   - Use consistent naming (e.g., "Q1 2024 - Machine Checkup")

3. **Request Management**:

   - Be specific in Subject field
   - Use Priority field appropriately
   - Record actual hours in Duration for analytics
   - Add photos or documents via chatter

4. **Team Organization**:
   - Balance workload across team members
   - Assign default technicians based on expertise
   - Use activity reminders for urgent requests

## 📂 Module Structure

```
GearGuard Platform/
├── __init__.py
├── __manifest__.py
├── models/
│   ├── __init__.py
│   ├── maintenance_team.py
│   ├── equipment.py
│   └── maintenance_request.py
├── views/
│   ├── maintenance_team_views.xml
│   ├── equipment_views.xml
│   ├── maintenance_request_views.xml
│   └── menu_views.xml
├── data/
│   └── maintenance_stages.xml
├── security/
│   └── ir.model.access.csv
└── README.md
```

## 🔧 Technical Details

### Models:

- `maintenance.team`: Maintenance teams and members
- `maintenance.equipment`: Equipment/asset database
- `maintenance.equipment.category`: Equipment categories
- `maintenance.request`: Maintenance work orders
- `maintenance.stage`: Request workflow stages

### Key Methods:

- `_onchange_equipment_id()`: Auto-fill logic for requests
- `write()`: Handles scrap logic and stage transitions
- `_compute_maintenance_count()`: Smart button counters
- `action_view_maintenance_requests()`: Smart button actions

## 📞 Support & Customization

This module is fully customizable and can be extended with:

- Additional fields on equipment or requests
- Custom stages for different workflows
- Integration with inventory or HR modules
- Custom reports and dashboards
- Mobile app support

## 📄 License

LGPL-3

## 👨‍💻 Author

GearGuard Development Team

## 🎉 Version

**1.0.0** - Initial Release

---

**Note**: This module requires Odoo 14.0+ and depends on the `mail` module for activity tracking and messaging features.
