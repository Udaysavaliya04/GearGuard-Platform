// GearGuard Application
class GearGuard {
    constructor() {
        this.data = {
            teams: [],
            equipment: [],
            requests: [],
            stages: [
                { id: 'new', name: 'New', color: '#3b82f6' },
                { id: 'in_progress', name: 'In Progress', color: '#f59e0b' },
                { id: 'repaired', name: 'Repaired', color: '#10b981' },
                { id: 'scrap', name: 'Scrap', color: '#ef4444' }
            ]
        };
        this.currentView = 'requests';
        this.currentMonth = new Date();
        this.draggedCard = null;
        
        this.loadData();
        this.init();
    }

    init() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });

        // Initialize default data if empty
        if (this.data.teams.length === 0) {
            this.createDefaultData();
        }

        // Render initial view
        this.renderRequests();
        this.renderEquipment();
        this.renderTeams();
        this.renderCalendar();
        this.renderReports();
    }

    createDefaultData() {
        // Default teams
        this.data.teams = [
            { id: Date.now() + 1, name: 'Mechanics', members: ['John Doe', 'Mike Smith'] },
            { id: Date.now() + 2, name: 'IT Support', members: ['Sarah Johnson', 'Tom Brown'] },
            { id: Date.now() + 3, name: 'Electricians', members: ['David Lee', 'Emma Wilson'] }
        ];

        // Default equipment
        this.data.equipment = [
            {
                id: Date.now() + 1,
                name: 'CNC Machine',
                serialNumber: 'SN-12345',
                category: 'Machinery',
                team: this.data.teams[0].name,
                technician: 'John Doe',
                location: 'Building A, Floor 2',
                purchaseDate: '2024-01-15',
                warrantyDate: '2025-01-15'
            },
            {
                id: Date.now() + 2,
                name: 'Laptop 01',
                serialNumber: 'LAP-9876',
                category: 'Computers',
                team: this.data.teams[1].name,
                technician: 'Sarah Johnson',
                location: 'Office Building, 3rd Floor',
                purchaseDate: '2024-03-20',
                warrantyDate: '2025-03-20'
            }
        ];

        this.saveData();
    }

    loadData() {
        const saved = localStorage.getItem('gearguard_data');
        if (saved) {
            this.data = { ...this.data, ...JSON.parse(saved) };
        }
    }

    saveData() {
        localStorage.setItem('gearguard_data', JSON.stringify({
            teams: this.data.teams,
            equipment: this.data.equipment,
            requests: this.data.requests
        }));
    }

    switchView(view) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        
        document.getElementById(`${view}-view`).classList.add('active');
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        
        this.currentView = view;
        
        // Re-render if needed
        if (view === 'calendar') this.renderCalendar();
        if (view === 'reports') this.renderReports();
    }

    // REQUEST FUNCTIONS
    renderRequests() {
        const board = document.getElementById('kanban-board');
        board.innerHTML = '';

        this.data.stages.forEach(stage => {
            const stageRequests = this.data.requests.filter(r => r.stage === stage.id);
            
            const column = document.createElement('div');
            column.className = 'kanban-column';
            column.dataset.stage = stage.id;
            
            column.innerHTML = `
                <div class="kanban-header">
                    <h3>${stage.name}</h3>
                    <span class="kanban-count">${stageRequests.length}</span>
                </div>
                <div class="kanban-cards" data-stage="${stage.id}">
                    ${stageRequests.map(r => this.createRequestCard(r)).join('')}
                </div>
            `;
            
            board.appendChild(column);
        });

        // Setup drag and drop
        this.setupDragAndDrop();
    }

    createRequestCard(request) {
        const equipment = this.data.equipment.find(e => e.id == request.equipment);
        const isOverdue = request.scheduledDate && new Date(request.scheduledDate) < new Date() && request.stage !== 'repaired' && request.stage !== 'scrap';
        
        const priorityStars = ['low', 'normal', 'high', 'urgent'].indexOf(request.priority) + 1;
        
        return `
            <div class="kanban-card ${isOverdue ? 'overdue' : ''}" draggable="true" data-id="${request.id}">
                <div class="card-header">
                    <div class="card-title">${request.subject}</div>
                    <div class="card-priority">
                        ${[1,2,3,4].map(i => `<i class="fas fa-star priority-star ${i <= priorityStars ? 'active' : ''}"></i>`).join('')}
                    </div>
                </div>
                <div class="card-meta">
                    <div class="card-meta-item">
                        <i class="fas fa-wrench"></i>
                        <span>${equipment ? equipment.name : 'Unknown'}</span>
                    </div>
                    <div class="card-meta-item">
                        <i class="fas fa-users"></i>
                        <span>${request.team || 'Unassigned'}</span>
                    </div>
                    ${request.scheduledDate ? `
                    <div class="card-meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>${new Date(request.scheduledDate).toLocaleDateString()}</span>
                    </div>
                    ` : ''}
                    ${request.duration ? `
                    <div class="card-meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${request.duration} hours</span>
                    </div>
                    ` : ''}
                </div>
                <div class="card-badges">
                    <span class="badge badge-${request.type}">${request.type}</span>
                    ${isOverdue ? '<span class="badge badge-overdue">OVERDUE</span>' : ''}
                </div>
                <div class="card-footer">
                    <div class="avatar">${request.technician ? request.technician.substring(0, 2).toUpperCase() : '??'}</div>
                    <button class="action-btn" onclick="app.editRequest(${request.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
        `;
    }

    setupDragAndDrop() {
        const cards = document.querySelectorAll('.kanban-card');
        const columns = document.querySelectorAll('.kanban-cards');

        cards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                card.classList.add('dragging');
                this.draggedCard = card.dataset.id;
            });

            card.addEventListener('dragend', (e) => {
                card.classList.remove('dragging');
            });
        });

        columns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            column.addEventListener('drop', (e) => {
                e.preventDefault();
                const newStage = column.dataset.stage;
                this.moveRequest(this.draggedCard, newStage);
            });
        });
    }

    moveRequest(requestId, newStage) {
        const request = this.data.requests.find(r => r.id == requestId);
        if (request) {
            request.stage = newStage;
            
            // Scrap logic
            if (newStage === 'scrap') {
                const equipment = this.data.equipment.find(e => e.id == request.equipment);
                if (equipment) {
                    equipment.scrapped = true;
                    equipment.scrapDate = new Date().toISOString().split('T')[0];
                    alert(`Equipment "${equipment.name}" has been marked as scrapped.`);
                }
            }
            
            this.saveData();
            this.renderRequests();
        }
    }

    openRequestModal(id = null) {
        const modal = document.getElementById('request-modal');
        const form = document.getElementById('request-form');
        const overlay = document.getElementById('modal-overlay');
        
        // Populate equipment dropdown
        const equipmentSelect = form.querySelector('[name="equipment"]');
        equipmentSelect.innerHTML = '<option value="">Select equipment...</option>' +
            this.data.equipment.filter(e => !e.scrapped).map(e => 
                `<option value="${e.id}">${e.name} (${e.serialNumber || 'No SN'})</option>`
            ).join('');
        
        if (id) {
            const request = this.data.requests.find(r => r.id == id);
            if (request) {
                form.querySelector('[name="subject"]').value = request.subject;
                form.querySelector('[name="type"]').value = request.type;
                form.querySelector('[name="priority"]').value = request.priority;
                form.querySelector('[name="equipment"]').value = request.equipment;
                form.querySelector('[name="team"]').value = request.team;
                form.querySelector('[name="description"]').value = request.description || '';
                form.querySelector('[name="duration"]').value = request.duration || '';
                form.querySelector('[name="id"]').value = request.id;
                
                if (request.scheduledDate) {
                    form.querySelector('[name="scheduledDate"]').value = request.scheduledDate;
                }
                
                // Populate technicians
                this.onEquipmentChange(equipmentSelect);
                form.querySelector('[name="technician"]').value = request.technician || '';
            }
        } else {
            form.reset();
            form.querySelector('[name="id"]').value = '';
        }
        
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    saveRequest(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        const request = {
            subject: formData.get('subject'),
            type: formData.get('type'),
            priority: formData.get('priority'),
            equipment: formData.get('equipment'),
            team: formData.get('team'),
            technician: formData.get('technician'),
            scheduledDate: formData.get('scheduledDate'),
            description: formData.get('description'),
            duration: formData.get('duration') || null,
            stage: 'new'
        };
        
        const id = formData.get('id');
        if (id) {
            const existing = this.data.requests.find(r => r.id == id);
            Object.assign(existing, request);
        } else {
            request.id = Date.now();
            request.createdDate = new Date().toISOString();
            this.data.requests.push(request);
        }
        
        this.saveData();
        this.closeModal();
        this.renderRequests();
    }

    editRequest(id) {
        this.openRequestModal(id);
    }

    onEquipmentChange(select) {
        const equipmentId = select.value;
        const equipment = this.data.equipment.find(e => e.id == equipmentId);
        const form = select.closest('form');
        
        if (equipment) {
            // Auto-fill team
            form.querySelector('[name="team"]').value = equipment.team;
            
            // Populate technicians from team
            const team = this.data.teams.find(t => t.name === equipment.team);
            const techSelect = form.querySelector('[name="technician"]');
            if (team) {
                techSelect.innerHTML = '<option value="">Assign later...</option>' +
                    team.members.map(m => `<option value="${m}">${m}</option>`).join('');
                
                // Set default technician
                if (equipment.technician) {
                    techSelect.value = equipment.technician;
                }
            }
        }
    }

    // EQUIPMENT FUNCTIONS
    renderEquipment() {
        const list = document.getElementById('equipment-list');
        const equipment = this.data.equipment;
        
        list.innerHTML = `
            <div class="table-row header">
                <div>Equipment</div>
                <div>Category</div>
                <div>Serial Number</div>
                <div>Team</div>
                <div>Location</div>
                <div>Maintenance</div>
                <div>Actions</div>
            </div>
            ${equipment.map(e => {
                const requests = this.data.requests.filter(r => r.equipment == e.id);
                const openRequests = requests.filter(r => r.stage !== 'repaired' && r.stage !== 'scrap');
                
                return `
                    <div class="table-row">
                        <div>
                            <div class="equipment-name">${e.name}</div>
                            ${e.scrapped ? '<span class="badge badge-overdue">SCRAPPED</span>' : ''}
                        </div>
                        <div><span class="equipment-badge">${e.category}</span></div>
                        <div class="equipment-serial">${e.serialNumber || '-'}</div>
                        <div>${e.team}</div>
                        <div>${e.location || '-'}</div>
                        <div>
                            ${openRequests.length > 0 ? `<span class="maintenance-count"><i class="fas fa-ticket-alt"></i> ${openRequests.length}</span>` : '-'}
                        </div>
                        <div class="table-actions">
                            <button class="action-btn" onclick="app.viewEquipmentRequests(${e.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn" onclick="app.editEquipment(${e.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('')}
        `;
    }

    openEquipmentModal(id = null) {
        const modal = document.getElementById('equipment-modal');
        const form = document.getElementById('equipment-form');
        const overlay = document.getElementById('modal-overlay');
        
        // Populate teams
        const teamSelect = form.querySelector('[name="team"]');
        teamSelect.innerHTML = '<option value="">Select team...</option>' +
            this.data.teams.map(t => `<option value="${t.name}">${t.name}</option>`).join('');
        
        if (id) {
            const equipment = this.data.equipment.find(e => e.id == id);
            if (equipment) {
                form.querySelector('[name="name"]').value = equipment.name;
                form.querySelector('[name="serialNumber"]').value = equipment.serialNumber || '';
                form.querySelector('[name="category"]').value = equipment.category;
                form.querySelector('[name="team"]').value = equipment.team;
                form.querySelector('[name="location"]').value = equipment.location || '';
                form.querySelector('[name="purchaseDate"]').value = equipment.purchaseDate || '';
                form.querySelector('[name="warrantyDate"]').value = equipment.warrantyDate || '';
                form.querySelector('[name="id"]').value = equipment.id;
                
                this.onTeamChangeEquipment(teamSelect);
                form.querySelector('[name="technician"]').value = equipment.technician || '';
            }
        } else {
            form.reset();
            form.querySelector('[name="id"]').value = '';
        }
        
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    saveEquipment(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        const equipment = {
            name: formData.get('name'),
            serialNumber: formData.get('serialNumber'),
            category: formData.get('category'),
            team: formData.get('team'),
            technician: formData.get('technician'),
            location: formData.get('location'),
            purchaseDate: formData.get('purchaseDate'),
            warrantyDate: formData.get('warrantyDate')
        };
        
        const id = formData.get('id');
        if (id) {
            const existing = this.data.equipment.find(e => e.id == id);
            Object.assign(existing, equipment);
        } else {
            equipment.id = Date.now();
            this.data.equipment.push(equipment);
        }
        
        this.saveData();
        this.closeModal();
        this.renderEquipment();
    }

    editEquipment(id) {
        this.openEquipmentModal(id);
    }

    viewEquipmentRequests(equipmentId) {
        const equipment = this.data.equipment.find(e => e.id == equipmentId);
        if (equipment) {
            // Filter requests and switch to requests view
            this.switchView('requests');
            // You can add filtering logic here
            alert(`Showing maintenance requests for: ${equipment.name}`);
        }
    }

    onTeamChangeEquipment(select) {
        const teamName = select.value;
        const team = this.data.teams.find(t => t.name === teamName);
        const form = select.closest('form');
        const techSelect = form.querySelector('[name="technician"]');
        
        if (team) {
            techSelect.innerHTML = '<option value="">Select technician...</option>' +
                team.members.map(m => `<option value="${m}">${m}</option>`).join('');
        } else {
            techSelect.innerHTML = '<option value="">Select team first...</option>';
        }
    }

    // TEAM FUNCTIONS
    renderTeams() {
        const list = document.getElementById('teams-list');
        
        list.innerHTML = this.data.teams.map(team => {
            const equipmentCount = this.data.equipment.filter(e => e.team === team.name).length;
            const requestCount = this.data.requests.filter(r => r.team === team.name).length;
            
            return `
                <div class="team-card">
                    <div class="team-header">
                        <div class="team-name">${team.name}</div>
                    </div>
                    <div class="team-members">
                        <h4>Team Members</h4>
                        <div class="member-list">
                            ${team.members.map(m => `<span class="member-tag">${m}</span>`).join('')}
                        </div>
                    </div>
                    <div class="team-stats">
                        <div class="stat-item">
                            <i class="fas fa-wrench"></i>
                            <span>${equipmentCount} Equipment</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-ticket-alt"></i>
                            <span>${requestCount} Requests</span>
                        </div>
                    </div>
                    <div class="table-actions" style="margin-top: 1rem;">
                        <button class="btn" onclick="app.editTeam(${team.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    openTeamModal(id = null) {
        const modal = document.getElementById('team-modal');
        const form = document.getElementById('team-form');
        const overlay = document.getElementById('modal-overlay');
        
        if (id) {
            const team = this.data.teams.find(t => t.id == id);
            if (team) {
                form.querySelector('[name="name"]').value = team.name;
                form.querySelector('[name="members"]').value = team.members.join('\n');
                form.querySelector('[name="id"]').value = team.id;
            }
        } else {
            form.reset();
            form.querySelector('[name="id"]').value = '';
        }
        
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    saveTeam(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        const team = {
            name: formData.get('name'),
            members: formData.get('members').split('\n').filter(m => m.trim()).map(m => m.trim())
        };
        
        const id = formData.get('id');
        if (id) {
            const existing = this.data.teams.find(t => t.id == id);
            Object.assign(existing, team);
        } else {
            team.id = Date.now();
            this.data.teams.push(team);
        }
        
        this.saveData();
        this.closeModal();
        this.renderTeams();
    }

    editTeam(id) {
        this.openTeamModal(id);
    }

    // CALENDAR FUNCTIONS
    renderCalendar() {
        const grid = document.getElementById('calendar-grid');
        const monthTitle = document.getElementById('calendar-month');
        
        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();
        
        monthTitle.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        let html = '<div class="calendar-header">';
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
            html += `<div class="calendar-day-header">${day}</div>`;
        });
        html += '</div><div class="calendar-days">';
        
        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            html += `<div class="calendar-day other-month">
                <div class="calendar-day-number">${daysInPrevMonth - i}</div>
            </div>`;
        }
        
        // Current month days
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateStr = date.toISOString().split('T')[0];
            const isToday = date.toDateString() === today.toDateString();
            
            const dayRequests = this.data.requests.filter(r => {
                if (!r.scheduledDate) return false;
                const reqDate = new Date(r.scheduledDate).toISOString().split('T')[0];
                return reqDate === dateStr && r.type === 'preventive';
            });
            
            html += `
                <div class="calendar-day ${isToday ? 'today' : ''}" onclick="app.createRequestForDate('${dateStr}')">
                    <div class="calendar-day-number">${day}</div>
                    <div class="calendar-requests">
                        ${dayRequests.slice(0, 2).map(r => `
                            <div class="calendar-request">${r.subject}</div>
                        `).join('')}
                        ${dayRequests.length > 2 ? `<div class="calendar-request">+${dayRequests.length - 2} more</div>` : ''}
                    </div>
                </div>
            `;
        }
        
        // Next month days
        const remainingDays = 42 - (firstDay + daysInMonth);
        for (let i = 1; i <= remainingDays; i++) {
            html += `<div class="calendar-day other-month">
                <div class="calendar-day-number">${i}</div>
            </div>`;
        }
        
        html += '</div>';
        grid.innerHTML = html;
    }

    prevMonth() {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1);
        this.renderCalendar();
    }

    nextMonth() {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1);
        this.renderCalendar();
    }

    createRequestForDate(date) {
        this.openRequestModal();
        const form = document.getElementById('request-form');
        form.querySelector('[name="type"]').value = 'preventive';
        form.querySelector('[name="scheduledDate"]').value = date + 'T09:00';
    }

    // REPORTS FUNCTIONS
    renderReports() {
        this.renderTeamChart();
        this.renderTypeChart();
        this.renderStatusChart();
    }

    renderTeamChart() {
        const ctx = document.getElementById('teamChart');
        if (!ctx) return;
        
        const teamCounts = {};
        this.data.teams.forEach(t => teamCounts[t.name] = 0);
        this.data.requests.forEach(r => {
            if (r.team && teamCounts.hasOwnProperty(r.team)) {
                teamCounts[r.team]++;
            }
        });
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(teamCounts),
                datasets: [{
                    label: 'Requests',
                    data: Object.values(teamCounts),
                    backgroundColor: '#7c3aed'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    renderTypeChart() {
        const ctx = document.getElementById('typeChart');
        if (!ctx) return;
        
        const corrective = this.data.requests.filter(r => r.type === 'corrective').length;
        const preventive = this.data.requests.filter(r => r.type === 'preventive').length;
        
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Corrective', 'Preventive'],
                datasets: [{
                    data: [corrective, preventive],
                    backgroundColor: ['#ef4444', '#3b82f6']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }

    renderStatusChart() {
        const ctx = document.getElementById('statusChart');
        if (!ctx) return;
        
        const statusCounts = {};
        this.data.stages.forEach(s => statusCounts[s.name] = 0);
        this.data.requests.forEach(r => {
            const stage = this.data.stages.find(s => s.id === r.stage);
            if (stage) statusCounts[stage.name]++;
        });
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    data: Object.values(statusCounts),
                    backgroundColor: this.data.stages.map(s => s.color)
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }

    closeModal() {
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
        document.getElementById('modal-overlay').classList.remove('active');
    }
}

// Initialize app
const app = new GearGuard();
