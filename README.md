# 📝 To-Do List Application

A modern, feature-rich to-do list web application with local storage functionality. Stay organized and productive with an intuitive interface and persistent task management.

## ✨ Features

- ✅ **Add Tasks** - Easily add new tasks to your to-do list
- ✏️ **Edit Tasks** - Modify existing tasks inline
- 🗑️ **Delete Tasks** - Remove individual tasks or clear all at once
- ☑️ **Mark Complete** - Check off completed tasks
- 🔍 **Filter Tasks** - View All, Active, or Completed tasks
- 💾 **Local Storage** - Tasks persist across browser sessions
- 📊 **Statistics** - Track total, completed, and remaining tasks
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 🔒 **Input Validation** - Prevents empty or overly long tasks

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or dependencies required

### Usage

1. **Open the Application**
   - Simply open `index.html` in your web browser

2. **Add a Task**
   - Type your task in the input field
   - Press `Enter` or click "Add Task"

3. **Manage Tasks**
   - **Check**: Click the checkbox to mark as complete
   - **Edit**: Click "Edit" to modify the task text
   - **Delete**: Click "Delete" to remove a task

4. **Filter Tasks**
   - Click "All" to see all tasks
   - Click "Active" to see incomplete tasks only
   - Click "Completed" to see finished tasks only

5. **Clear Tasks**
   - "Clear Completed" - Remove all completed tasks
   - "Delete All" - Remove all tasks (with confirmation)

## 📁 File Structure

```
todo-app/
├── index.html      # HTML structure
├── styles.css      # Styling and responsive design
├── script.js       # JavaScript logic and localStorage
└── README.md       # Documentation
```

## 💡 How Local Storage Works

- Tasks are automatically saved to your browser's local storage
- Data persists even if you close the browser
- Each browser/device has its own separate task list
- To clear all data: Use "Delete All" or clear browser storage

### Local Storage Details

- **Storage Key**: `todoList_tasks`
- **Storage Type**: JSON string
- **Storage Location**: Browser's local storage (site-specific)

## 🎯 Task Object Structure

```json
{
  "id": "unique_timestamp_string",
  "text": "Task description",
  "completed": false,
  "createdAt": "ISO_8601_timestamp"
}
```

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #4f46e5;
    --secondary-color: #10b981;
    --danger-color: #ef4444;
    /* ... more variables */
}
```

### Validation Rules
Edit in `script.js`:
- Maximum task length: 200 characters
- Empty task prevention
- Duplicate task handling

## 🌐 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Internet Explorer (not supported)

## 📝 Keyboard Shortcuts

- `Enter` - Add new task when input is focused
- `Tab` - Navigate through buttons

## 🔐 Privacy & Security

- All data is stored **locally** on your device
- No data is sent to any server
- No tracking or analytics
- No cookies (except localStorage)
- XSS protection with HTML escaping

## 🐛 Troubleshooting

### Tasks not saving?
- Check if localStorage is enabled in your browser
- Private/Incognito mode may limit localStorage

### Tasks disappeared?
- Browser cache was cleared
- localStorage was manually cleared
- Browser data was reset

### Need to recover deleted tasks?
- Use browser history to restore the page state
- Keep regular backups by exporting data

## 📈 Future Enhancements

- [ ] Task categories/projects
- [ ] Due dates and reminders
- [ ] Recurring tasks
- [ ] Task priority levels
- [ ] Export/import functionality
- [ ] Dark mode toggle
- [ ] Drag and drop reordering
- [ ] Cloud synchronization

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created with ❤️ for productivity enthusiasts.

## 💬 Feedback

Have suggestions or found a bug? Feel free to contribute or open an issue!

---

**Happy Task Managing! 🎉**
