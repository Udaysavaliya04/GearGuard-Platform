# GearGuard - Ultimate Maintenance Tracker

A complete maintenance management system that runs entirely in your browser with no backend required!

## 🚀 Features

- **Equipment Management**

  - Track equipment by department or employee
  - Serial numbers, purchase dates, warranty information
  - Physical location tracking
  - Assigned maintenance teams and technicians
  - Scrap logic (equipment marked as scrapped when request moved to Scrap stage)

- **Maintenance Teams**

  - Multiple specialized teams (Mechanics, Electricians, IT Support, etc.)
  - Team member management
  - Workflow logic (only team members can be assigned to team requests)

- **Maintenance Requests**

  - Corrective (Breakdown) and Preventive (Routine) requests
  - **AUTO-FILL LOGIC**: Select equipment → Team and technician auto-filled!
  - Request lifecycle: New → In Progress → Repaired → Scrap
  - Priority levels (Low, Normal, High, Urgent)
  - Scheduled dates and duration tracking
  - Overdue detection with visual indicators

- **Kanban Board** (Primary Workspace)

  - **Drag & Drop** cards between stages
  - Visual indicators:
    - Technician avatars
    - Priority stars
    - Red "OVERDUE" badges
    - Request type badges (Corrective/Preventive)
  - Group by stages

- **Calendar View**

  - Display all preventive maintenance requests
  - Click any date to schedule new maintenance
  - Color-coded by team
  - Monthly navigation

- **Reports & Analytics**

  - Requests by Team (Bar Chart)
  - Requests by Type (Pie Chart)
  - Requests by Status (Doughnut Chart)
  - Real-time data

- **Smart Features**
  - **Equipment Group By** - Organize equipment by Category, Team, or Location for easier tracking
  - **Toast Notifications** - Visual feedback for stage changes and scrap actions
  - **Clickable Maintenance Badges** - Click equipment maintenance count to view those requests
  - **Equipment Category in Cards** - Request cards show equipment name and category
  - Equipment page shows open maintenance count
  - Click to view all requests for specific equipment
  - **Data Export/Import** - Backup and restore your data as JSON
  - **Quick Stats Dashboard** - See total, overdue, and active requests at a glance
  - **Keyboard Shortcuts** - Press ESC to close modals
  - **Equipment Search** - Real-time search filtering
  - **Sample Data Generator** - Load demo data with one click
  - **Delete Confirmations** - Smart warnings before deleting items with dependencies
  - Local storage persistence (data saved automatically)
  - Responsive design (works on mobile/tablet/desktop)

## 🎯 Quick Start Demo

1. **Open the application** (double-click index.html)

2. **Load Sample Data**:

   - Click the "Demo" button in the header
   - Or accept the welcome prompt on first visit
   - Instantly see 4 realistic maintenance requests

3. **Explore Features**:

   - **Kanban Board**: Drag & drop cards between stages (watch for toast notifications!)
   - **Quick Stats**: View total, overdue, and active requests at the top
   - **Equipment Page**:
     - Use "Group By" dropdown to organize by Category, Team, or Location
     - Search equipment with real-time filtering
     - Click maintenance count badges to view open requests
   - **Calendar**: Click dates to schedule preventive maintenance
   - **Reports**: Real-time charts and analytics

4. **Keyboard Shortcuts**:

   - Press `ESC` to close any modal
   - Use `Tab` to navigate forms

5. **Data Management**:
   - **Export**: Download button (📥) - backup your data as JSON
   - **Import**: Upload button (📤) - restore from backup
   - **Reset**: Trash button (🗑️) - clear all data

## 📁 File Structure

```
gearguard-web/
├── index.html       # Main HTML structure
├── styles.css       # All styling
├── app.js           # Application logic
└── README.md        # This file
```

## 🎨 Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling (Flexbox, Grid, animations)
- **Vanilla JavaScript** - All functionality
- **Chart.js** - Reports and analytics
- **Font Awesome** - Icons
- **Local Storage API** - Data persistence

## 💾 Data Storage

- Automatic saving on every change
- Persists across browser sessions
- No database required
- Clear data: Developer Tools → Application → Local Storage → Clear

## 🔥 Key Features Demonstrated

### 1. Auto-Fill Logic (Flow 1: The Breakdown)

```javascript
Select Equipment → Team Auto-Fills → Technician Auto-Fills
```

### 2. Drag & Drop Workflow

```
New → In Progress → Repaired → Scrap
(Just drag the cards!)
```

### 3. Scrap Logic

```javascript
Move request to "Scrap" stage
  ↓
Equipment automatically marked as scrapped
  ↓
Alert notification shown
```

### 4. Overdue Detection

```javascript
Scheduled Date < Today + Stage ≠ Done
  ↓
Red "OVERDUE" badge appears
```

### 5. Calendar Integration

```javascript
Preventive requests → Show on calendar
Click date → Create new request for that date
```

