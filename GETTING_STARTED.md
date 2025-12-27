# GearGuard - Getting Started Guide

## 🚀 Quick Setup (5 Minutes)

Follow these steps to get your GearGuard system up and running:

### Step 1: Install the Module (1 min)

1. Copy the `GearGuard Platform` folder to your Odoo addons directory
2. Restart Odoo server or update the apps list
3. Go to **Apps** → Search for "GearGuard"
4. Click **Install**

### Step 2: Create Your First Maintenance Team (1 min)

1. Navigate to: **GearGuard → Configuration → Maintenance Teams**
2. Click **Create**
3. Enter team details:
   - **Team Name**: `IT Support`
   - **Team Members**: Select users who are technicians
4. Click **Save**

**Tip**: Create at least 2-3 teams based on your company structure:

- IT Support
- Mechanics
- Electricians

### Step 3: Add Equipment Categories (30 sec)

1. Navigate to: **GearGuard → Configuration → Equipment Categories**
2. Create categories like:
   - Computers
   - Vehicles
   - Machinery
   - Office Equipment

### Step 4: Register Your First Equipment (2 min)

1. Navigate to: **GearGuard → Operations → Equipment**
2. Click **Create**
3. Fill in the form:
   ```
   Equipment Name: Dell Laptop XPS 15
   Serial Number: SN-12345678
   Category: Computers
   Department: IT Department
   Assigned to Employee: John Doe
   Maintenance Team: IT Support
   Default Technician: [Select from team members]
   Location: Office Building A, Floor 3, Desk 42
   Purchase Date: 01/01/2023
   ```
4. Click **Save**

### Step 5: Create Your First Maintenance Request (1 min)

1. Navigate to: **GearGuard → Operations → Maintenance Requests**
2. Switch to **Kanban View** (recommended)
3. Click **Create**
4. Fill in the request:

   ```
   Subject: Laptop screen flickering
   Maintenance Type: Corrective
   Equipment: [Select the laptop you just created]
   ```

   Notice how the **Maintenance Team** and **Technician** are automatically filled!

5. Set **Scheduled Date** (optional)
6. Click **Save**

### Step 6: Work the Request (30 sec)

1. In the Kanban view, you'll see your request in the "New" column
2. **Drag and drop** the card to "In Progress"
3. Click on the card to open it
4. Enter **Duration** (hours spent)
5. Move to "Repaired" stage when done

---

## 🎯 Common Use Cases

### Use Case 1: Equipment Breakdown

**Scenario**: A machine breaks down and needs immediate repair

1. Create a **Corrective** maintenance request
2. Select the broken equipment
3. Set **Priority** to "Urgent"
4. Assign to available technician
5. Track progress through Kanban board

### Use Case 2: Preventive Maintenance Schedule

**Scenario**: Monthly vehicle inspection

1. Create a **Preventive** maintenance request
2. Set **Scheduled Date** to next month
3. View in **Calendar** to see all scheduled maintenance
4. Technician gets reminder on the scheduled date

### Use Case 3: Equipment History

**Scenario**: Check all maintenance done on a specific machine

1. Go to **Equipment** form
2. Click the **Maintenance** smart button
3. See complete history of all requests

### Use Case 4: Team Performance

**Scenario**: How many requests did IT team handle?

1. Go to **Reporting → Maintenance Analysis**
2. Switch to **Pivot** or **Graph** view
3. Group by **Maintenance Team**
4. Analyze request counts and duration

---

## 📊 Dashboard Overview

### Kanban Board Shortcuts

- **Red Ribbon**: Overdue request
- **User Avatar**: Assigned technician
- **Red Badge**: Corrective maintenance
- **Blue Badge**: Preventive maintenance
- **Stars**: Priority level

### Calendar View Tips

- **Color-coded** by maintenance team
- **Click empty date** to quick-create request
- **Drag event** to reschedule
- **Filter** by team using sidebar

### Search & Filter Options

- **My Requests**: See only your assigned work
- **Unassigned**: Available requests to pick up
- **Overdue**: Urgent attention needed
- **This Week**: Upcoming scheduled work

---

## 💡 Pro Tips

### For Managers

1. **Use Group By**: Group requests by Department to see which areas need most maintenance
2. **Color Code**: Use colors in Kanban to visually distinguish urgent requests
3. **Calendar Planning**: Schedule preventive maintenance during low-activity periods
4. **Analytics**: Check Pivot view monthly to identify problematic equipment

### For Technicians

1. **My Requests Filter**: Start your day by filtering "My Requests"
2. **Quick Assign**: Use "Assign to Me" button on unassigned requests
3. **Time Tracking**: Always fill in Duration for accurate reporting
4. **Notes**: Use the chatter to log issues or parts used

### For Equipment Owners

1. **Smart Buttons**: Quickly access maintenance history from equipment record
2. **Warranty Tracking**: Set warranty dates to know when to contact vendor
3. **Preventive Requests**: Create recurring checkups to avoid breakdowns

---

## ⚙️ Configuration Checklist

Before going live, make sure you have:

- [ ] Created all maintenance teams
- [ ] Added team members to teams
- [ ] Created equipment categories
- [ ] Registered all critical equipment
- [ ] Set maintenance teams for each equipment
- [ ] Assigned default technicians
- [ ] Verified stages (New, In Progress, Repaired, Scrap)
- [ ] Trained users on Kanban drag-and-drop
- [ ] Set up Calendar view for preventive maintenance

---

## 🔄 Daily Workflow

### Morning (Technician)

1. Open GearGuard
2. Go to Maintenance Requests
3. Filter: "My Requests" + "Open"
4. Review today's scheduled work in Calendar view
5. Start working (drag to "In Progress")

### During the Day

1. Update request status as you work
2. Record time spent in Duration field
3. Add notes about parts or issues
4. Complete requests (drag to "Repaired")

### End of Day (Manager)

1. Check "Overdue" filter
2. Reassign if needed
3. Review team performance in Pivot view
4. Schedule tomorrow's preventive maintenance

---

## 🆘 Troubleshooting

### Problem: Maintenance Team not auto-filling

**Solution**: Make sure Equipment has a Maintenance Team assigned

### Problem: Cannot select technician

**Solution**: Ensure technician is a member of the equipment's Maintenance Team

### Problem: Smart button shows 0

**Solution**: Create at least one maintenance request for that equipment

### Problem: Request not appearing in Calendar

**Solution**: Set a Scheduled Date on the request

---

## 📚 Next Steps

1. **Customize Stages**: Add custom stages if needed (Configuration → Maintenance Stages)
2. **Create Templates**: Save common maintenance tasks as templates
3. **Set Reminders**: Use Activities to set follow-up reminders
4. **Mobile Access**: Use Odoo mobile app for field technicians
5. **Reports**: Create custom reports based on your needs

---

## 🎓 Training Resources

### For New Users (30 min)

1. Equipment basics (10 min)
2. Creating requests (10 min)
3. Using Kanban board (10 min)

### For Technicians (45 min)

1. Full request lifecycle (15 min)
2. Calendar and scheduling (15 min)
3. Time tracking and notes (15 min)

### For Managers (1 hour)

1. Complete system overview (20 min)
2. Team management (15 min)
3. Reports and analytics (25 min)

---

## ✅ Success Metrics

After 30 days, you should see:

- All equipment registered in the system
- 90%+ of maintenance requests tracked
- Average response time to breakdowns
- Preventive maintenance scheduled regularly
- Clear accountability (assigned technicians)
- Historical data for decision making

---

**Need Help?** Refer to the [README.md](README.md) for detailed documentation.

**Happy Tracking! 🎉**
