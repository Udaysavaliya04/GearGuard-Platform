# GearGuard - Ultimate Maintenance Tracker

## Standalone Web Application

A complete maintenance management system that runs entirely in your browser with no backend required!

## 🚀 Features

### ✅ All Requirements Implemented

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

## 📦 Installation

### Option 1: Direct Open (Easiest)

1. Download/extract the folder
2. Double-click `index.html`
3. That's it! No server needed!

### Option 2: Local Server (Recommended for Development)

```bash
# Using Python
cd gearguard-web
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

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

<<<<<<< HEAD
## 💡 Tips for Hackathon Demo

1. **Start Fresh**: Click "Demo" to load sample data
2. **Show Drag & Drop**: Move "CNC Oil Leak" from "In Progress" to "Repaired" (watch toast notification!)
3. **Demonstrate Grouping**: Go to Equipment → Select "Group by Category" to show organized view
4. **Highlight Smart Buttons**: Click the red maintenance count badge to filter requests
5. **Demo Auto-Fill**: Create new request, select equipment, watch team auto-fill
6. **Show Calendar**: Switch to Calendar view to see scheduled maintenance
7. **Scrap Demo**: Drag a request to "Scrap" stage to see equipment marked as scrapped with notification
8. **Export Data**: Download backup to show data portability

=======
>>>>>>> 0ffae365048ddf5d782bc28eca8c124e7d044afd
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

All data is stored in your browser's LocalStorage:

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

## 🐛 Troubleshooting

**Data not saving?**

- Check browser LocalStorage is enabled
- Try different browser

**Charts not showing?**

- Make sure you have internet connection (Chart.js loads from CDN)
- Or download Chart.js locally

**Drag & Drop not working?**

- Use modern browser (Chrome, Firefox, Edge, Safari)
- Not supported in IE11

## 🚀 Deployment

### GitHub Pages (Free Hosting)

1. Create GitHub repository
2. Upload all files
3. Settings → Pages → Deploy from main branch
4. Access at: `https://yourusername.github.io/gearguard`

### Netlify (Free Hosting)

1. Drag & drop folder to Netlify.com
2. Get instant URL
3. Done!

## 📝 License

Free to use for demonstrations and learning!

## 🎉 Enjoy!

You now have a fully functional maintenance tracker that:

- ✅ Works offline
- ✅ No backend needed
- ✅ No installation required
- ✅ All features implemented
- ✅ Professional UI/UX
- ✅ Mobile responsive

**Just open `index.html` and start tracking maintenance!** 🔧
