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
  - Equipment page shows open maintenance count
  - Click to view all requests for specific equipment
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

2. **View Default Data**: The app comes with:
   - 3 sample teams (Mechanics, IT Support, Electricians)
   - 2 sample equipment items (CNC Machine, Laptop)

3. **Create a Maintenance Request**:
   - Click "New Request"
   - Enter subject: "Leaking Oil"
   - Select type: "Corrective"
   - Select equipment: "CNC Machine"
   - **Watch the magic**: Team and technician auto-fill!
   - Click Save

4. **Use the Kanban Board**:
   - **Drag the card** from "New" to "In Progress"
   - Add duration (e.g., 2.5 hours)
   - **Drag to "Repaired"** when done

5. **Schedule Preventive Maintenance**:
   - Go to Calendar view
   - Click on next Monday
   - Type: "Preventive"
   - Schedule the date
   - It appears on the calendar!

6. **Test Scrap Logic**:
   - Create a request for old equipment
   - Drag it to "Scrap" stage
   - Alert shows equipment is scrapped

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

## 🎬 Video Demo Script

1. **Show Equipment** (0:00-0:30)
   - View equipment list
   - Show CNC Machine with team assignment

2. **Create Breakdown Request** (0:30-1:30)
   - Click "New Request"
   - Select "CNC Machine"
   - **Highlight**: Team auto-fills!
   - Save and show on Kanban board

3. **Drag & Drop Workflow** (1:30-2:00)
   - Drag card from "New" to "In Progress"
   - Add duration
   - Drag to "Repaired"

4. **Preventive Maintenance** (2:00-2:45)
   - Switch to Calendar view
   - Click next week
   - Create preventive request
   - Show it on calendar

5. **Scrap Demo** (2:45-3:15)
   - Create request
   - Drag to "Scrap"
   - Show alert and scrapped equipment

6. **Reports** (3:15-4:00)
   - Show charts
   - Demonstrate real-time data

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
