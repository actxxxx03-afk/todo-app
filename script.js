// To-Do List Application with Local Storage

class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.storageKey = 'todoList_tasks';
        
        // DOM Elements
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.clearBtn = document.getElementById('clearBtn');
        this.deleteAllBtn = document.getElementById('deleteAllBtn');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.totalTasksEl = document.getElementById('totalTasks');
        this.completedTasksEl = document.getElementById('completedTasks');
        this.remainingTasksEl = document.getElementById('remainingTasks');
        
        this.init();
    }
    
    init() {
        // Load tasks from localStorage
        this.loadTasks();
        
        // Render tasks
        this.render();
        
        // Event listeners
        this.addBtn.addEventListener('click', () => this.addTask());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
        
        this.clearBtn.addEventListener('click', () => this.clearCompleted());
        this.deleteAllBtn.addEventListener('click', () => this.deleteAll());
        
        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentFilter = e.target.dataset.filter;
                this.updateFilterButtons();
                this.render();
            });
        });
    }
    
    // Load tasks from localStorage
    loadTasks() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                this.tasks = JSON.parse(stored);
            } catch (error) {
                console.error('Error loading tasks from localStorage:', error);
                this.tasks = [];
            }
        }
    }
    
    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }
    
    // Generate unique ID
    generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }
    
    // Add new task
    addTask() {
        const text = this.todoInput.value.trim();
        
        if (!text) {
            this.showNotification('Please enter a task');
            return;
        }
        
        if (text.length > 200) {
            this.showNotification('Task is too long (max 200 characters)');
            return;
        }
        
        const newTask = {
            id: this.generateId(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.unshift(newTask);
        this.saveTasks();
        this.todoInput.value = '';
        this.todoInput.focus();
        this.render();
    }
    
    // Toggle task completion
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }
    
    // Edit task
    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;
        
        const newText = prompt('Edit task:', task.text);
        if (newText !== null) {
            const trimmedText = newText.trim();
            if (!trimmedText) {
                this.showNotification('Task cannot be empty');
                return;
            }
            if (trimmedText.length > 200) {
                this.showNotification('Task is too long (max 200 characters)');
                return;
            }
            task.text = trimmedText;
            this.saveTasks();
            this.render();
        }
    }
    
    // Delete task
    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.render();
    }
    
    // Clear completed tasks
    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        if (completedCount === 0) {
            this.showNotification('No completed tasks to clear');
            return;
        }
        
        if (confirm(`Clear ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.render();
        }
    }
    
    // Delete all tasks
    deleteAll() {
        if (this.tasks.length === 0) {
            this.showNotification('No tasks to delete');
            return;
        }
        
        if (confirm('Delete all tasks? This cannot be undone.')) {
            this.tasks = [];
            this.saveTasks();
            this.render();
        }
    }
    
    // Get filtered tasks
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            case 'all':
            default:
                return this.tasks;
        }
    }
    
    // Update filter button styles
    updateFilterButtons() {
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === this.currentFilter);
        });
    }
    
    // Update statistics
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const remaining = total - completed;
        
        this.totalTasksEl.textContent = total;
        this.completedTasksEl.textContent = completed;
        this.remainingTasksEl.textContent = remaining;
    }
    
    // Render task list
    render() {
        const filteredTasks = this.getFilteredTasks();
        
        // Clear list
        this.todoList.innerHTML = '';
        
        // Show/hide empty state
        if (this.tasks.length === 0) {
            this.emptyState.classList.add('show');
        } else {
            this.emptyState.classList.remove('show');
        }
        
        // Render filtered tasks
        if (filteredTasks.length === 0 && this.currentFilter !== 'all') {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-state show';
            emptyMessage.innerHTML = `
                <div class="empty-icon">🎯</div>
                <p>No ${this.currentFilter} tasks</p>
            `;
            this.todoList.appendChild(emptyMessage);
        } else {
            filteredTasks.forEach(task => {
                const taskEl = this.createTaskElement(task);
                this.todoList.appendChild(taskEl);
            });
        }
        
        // Update statistics
        this.updateStats();
    }
    
    // Create task element
    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        li.id = `task-${task.id}`;
        
        li.innerHTML = `
            <input 
                type="checkbox" 
                class="checkbox" 
                ${task.completed ? 'checked' : ''}
                data-id="${task.id}"
            >
            <span class="todo-text">${this.escapeHtml(task.text)}</span>
            <div class="todo-actions">
                <button class="edit-btn" data-id="${task.id}">Edit</button>
                <button class="delete-btn" data-id="${task.id}">Delete</button>
            </div>
        `;
        
        // Event listeners
        const checkbox = li.querySelector('.checkbox');
        checkbox.addEventListener('change', () => this.toggleTask(task.id));
        
        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => this.editTask(task.id));
        
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));
        
        return li;
    }
    
    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
    
    // Show notification
    showNotification(message) {
        // You can replace this with a toast notification library if needed
        alert(message);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
