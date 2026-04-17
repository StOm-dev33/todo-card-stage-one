# todo-card-stage-one
# HNG Stage 1 - Interactive Todo Card

A fully interactive, stateful Todo Card component built with vanilla HTML, CSS, and JavaScript. This is an enhanced version of the Stage 0 card with advanced features including editing, status management, priority levels, and dynamic time handling.

 Features Implemented

Editing Mode
- Edit Button: Click to enter edit mode
- Edit Form: Fully functional form with:
  - Title input (required, max 100 characters)
  - Description textarea (max 500 characters)
  - Priority selector (Low, Medium, High)
  - Due date picker (datetime-local)
- Save/Cancel: Persist or discard changes with proper focus management
- Keyboard Support: ESC key closes form, focus trapped in edit mode

 Status Management
- Status Dropdown: Select from "Pending", "In Progress", "Done"
- Bidirectional Sync: 
  - Checkbox toggles status to "Done"
  - Status change syncs with checkbox
  - All visual states update together
- Visual Feedback: Strike-through and muted colors when completed

 Priority Indicators
- Color-Coded Badges: High (red), Medium (orange), Low (green)
- Visual Distinction: Different background colors and borders
- Hover Effects: Scale and shadow animations

 Expand/Collapse Behavior
- Collapsible Section: Hidden by default, reveals status and time info
- Keyboard Accessible: `aria-expanded` and `aria-controls` attributes
- Smooth Animations: CSS transitions with visual feedback

 Time Management
- Granular Time Updates: 
  - "Due in X days"
  - "Due in X hours"
  - "Due in X minutes"
  - "Due in less than 1 minute"
- Overdue Logic:
  - Shows "Overdue by X days/hours/minutes"
  - Red visual indicator
  - Pulsing animation for urgency
- Auto-Refresh: Updates every 60 seconds
- Completion Handling: Shows "✓ Completed" when task is done

 Accessibility Features
- ARIA Labels: All interactive elements have proper labels
- Live Region: `aria-live="polite"` on time updates for screen readers
- Focus Management: 
  - Edit form focus trap
  - Return focus to edit button when closed
  - Tab order preserved
- Keyboard Navigation:
  - Tab through: Checkbox → Status → Expand → Edit → Delete → Form fields
  - Enter/Space: Activate buttons
  - ESC: Close edit form
- Semantic HTML: Proper use of `<label>`, `<section>`, `<dialog>` roles

 Responsive Design
- Mobile (320px): Single column, full-width buttons, compact padding
- Tablet (768px): Optimized spacing, flexible layouts
- Desktop (1024px+): Full-width elements, enhanced spacing

 Design Features
- Glassmorphism Effect: Frosted glass with backdrop blur
- Gradient Background: Purple to violet gradient
- Smooth Animations: 
  - Slide-in on load
  - Glow pulse on card
  - Smooth transitions on all interactive elements
  - Ripple effect on buttons
- Hover Effects: Elevation, shadow enhancement, color transitions

 File Structure


stom/
├── index.html      # Main HTML structure
├── card.css        # Styling and animations
├── card.js         # Functionality and state management
└── README.md       # This file


 HTML Structure

 Main Sections
- Card Header: Title + Priority badge
- Description Section: Description text + Expand button
- Collapsible Section: Status control, due date, time remaining, overdue indicator
- Checkbox Group: Mark as complete toggle
- Edit Form: Form with all editable fields (hidden by default)
- Action Buttons: Edit, Delete buttons

 Test IDs (for automated testing)
- `test-todo-card`: Main card container
- `test-todo-title`: Task title
- `test-todo-description`: Description text
- `test-todo-priority`: Priority badge
- `test-todo-due-date`: Due date element
- `test-todo-time-remaining`: Time remaining display
- `test-todo-overdue-indicator`: Overdue warning
- `test-todo-complete-toggle`: Checkbox for marking complete
- `test-todo-expand-toggle`: Expand/collapse button
- `test-todo-collapsible-section`: Hidden section with status/time
- `test-todo-status-control`: Status dropdown
- `test-todo-edit-button`: Edit button
- `test-todo-delete-button`: Delete button
- `test-todo-edit-form`: Edit form container
- `test-todo-edit-title-input`: Title input in form
- `test-todo-edit-description-input`: Description textarea in form
- `test-todo-edit-priority-select`: Priority selector in form
- `test-todo-edit-due-date-input`: Due date input in form
- `test-todo-save-button`: Save button
- `test-todo-cancel-button`: Cancel button

 JavaScript State Management

 Task Data Structure
javascript
{
  title: string,
  description: string,
  priority: 'Low' | 'Medium' | 'High',
  dueDate: Date,
  status: 'Pending' | 'In Progress' | 'Done',
  completed: boolean
}


 Key Functions
- `toggleExpand()`: Show/hide collapsible section
- `handleCheckboxChange()`: Sync checkbox with status
- `handleStatusChange()`: Sync status dropdown with checkbox
- `updateTimeRemaining()`: Calculate and display time until due
- `openEditForm()`: Enter edit mode
- `saveChanges()`: Update task and close form
- `deleteTask()`: Remove task (with confirmation)
- `updateCardDisplay()`: Refresh all UI elements

 Usage

### Opening in Browser
1. Open `index.html` in a modern web browser
2. The card loads with default task data
3. Interact with features:
   - Click "Expand" to see status and time details
   - Click "Edit" to modify task information
   - Toggle checkbox to mark complete
   - Change status in dropdown
   - Click "Delete" to remove (with confirmation)

### Editing a Task
1. Click the "Edit" button
2. Update any field:
   - Title (required, max 100 chars)
   - Description (max 500 chars)
   - Priority level
   - Due date and time
3. Click "Save" to apply changes
4. Or click "Cancel" to discard changes

### Status Transitions
1. **Pending → Done**: Check the checkbox or select "Done" from status dropdown
2. **Done → Pending**: Uncheck the checkbox or select "Pending"
3. **Any status**: Select "In Progress" from status dropdown

 CSS Customization

### Color Scheme
- **Primary**: #667eea (Blue)
- **Secondary**: #764ba2 (Purple)
- **High Priority**: #ef4444 (Red)
- **Medium Priority**: #fb923c (Orange)
- **Low Priority**: #22c55e (Green)

### Spacing Scale
- Base unit: 4px
- Padding: 16px (mobile), 20-30px (desktop)
- Gap between elements: 8-16px

### Animations
- `slideInUp`: 0.6s - Card load animation
- `slideDown`: 0.4s - Form/section reveal
- `pulse`: 1.5s - Overdue indicator
- Transitions: 0.3s with cubic-bezier timing

 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+ (with -webkit prefixes)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

 Known Limitations

1. **Local Storage**: Changes are not persisted (in-memory only)
   - *To add*: Implement localStorage or API integration
2. **Delete Animation**: Task disappears after confirmation
   - *To add*: Backend API integration for actual deletion
3. **Time Zone**: Uses browser's local timezone
   - *To add*: Support for custom timezones
4. **Edit Form Validation**: Basic required field only
   - *To add*: More advanced validation and error messages

 What Changed from Stage 0

 New Features
- ✨ Full edit mode with form
- ✨ Status dropdown with three options
- ✨ Priority selector in edit form
- ✨ Expand/collapse for details
- ✨ Due date picker
- ✨ Granular time remaining display
- ✨ Overdue indicator with styling

 Enhanced Features
-  Better status synchronization (checkbox ↔ dropdown)
-  Glassmorphism design with animations
-  Comprehensive accessibility (ARIA labels, focus management)
-  Fully responsive layout
-  Keyboard navigation and focus trapping

### Removed Features
-  Static tags (may be added back as editable)
-  Simple status display (now interactive dropdown)

Testing

### Manual Testing Checklist
- [ ] Can open/close edit form with Edit button
- [ ] Can save changes and see them reflected
- [ ] Can cancel and restore previous values
- [ ] Checkbox toggles status correctly
- [ ] Status dropdown syncs with checkbox
- [ ] Expand/collapse button toggles section visibility
- [ ] Time updates every 60 seconds
- [ ] Overdue logic works correctly
- [ ] Priority badge changes color based on selection
- [ ] Completed task shows strike-through
- [ ] All test IDs are present and correct
- [ ] Keyboard navigation works (Tab, ESC, Enter)
- [ ] Responsive at 320px, 768px, 1024px

### Accessibility Testing
- [ ] Screen reader announces time updates (aria-live)
- [ ] All buttons have aria-labels
- [ ] Form fields have labels with for attributes
- [ ] Focus is visible on all interactive elements
- [ ] Tab order is logical
- [ ] Focus trap works in edit form
- [ ] Can navigate with keyboard only

 Next Steps for Improvement

1. **Backend Integration**: 
   - Save tasks to database
   - Sync status across sessions
   - Real delete functionality

2. **Advanced Features**:
   - Multiple task cards
   - Tags/categories
   - Recurring tasks
   - Notifications
   - Dark mode toggle

3. **Enhancement**:
   - Form validation with error messages
   - Undo/redo functionality
   - Task history
   - Export/import functionality

4. **Performance**:
   - Optimize animations for mobile
   - Lazy load form
   - Service worker for offline support

 License

This is an educational project for HNG Stage 1 assignment.



**Last Updated**: April 2026
**Version**: 1.0 - Stage 1 Complete




 Features

 Stage 1A — Advanced Todo Card

#### Core Features

* Editable task (title, description, priority, due date)
* Status control (Pending, In Progress, Done)
* Checkbox and status synchronization
* Expand / Collapse description
* Priority indicator (Low, Medium, High)
* Overdue detection and visual indicator
* Dynamic time remaining (minutes, hours, days)

#### Behavior

* Edit mode with Save and Cancel functionality
* State-driven rendering using a central `todo` object
* Time updates every 60 seconds
* Timer stops when task is marked as "Done"
* Status logic consistency across:

  * Checkbox
  * Status display
  * Status dropdown

#### Accessibility

* Semantic HTML elements (`article`, `time`, `label`, `button`)
* `aria-expanded`, `aria-controls` for collapsible content
* `aria-live="polite"` for time updates
* Keyboard navigable interface
* Proper form labeling



 Stage 1B — Profile Card

#### Core Features

* User name and biography
* Avatar image with meaningful alt text
* Current time in milliseconds (`Date.now()`)
* Social links (open in new tab securely)
* Hobbies and dislikes lists

#### Accessibility

* Semantic layout (`article`, `figure`, `nav`, `section`)
* Keyboard-accessible links
* Responsive and readable layout
* Proper alt text and focus states



 Technologies Used

* HTML5 (Semantic Markup)
* CSS3 (Flexbox, Responsive Design)
* Vanilla JavaScript (DOM Manipulation, State Management)



 What Changed from Stage 0

* Introduced **state management** using a central JavaScript object
* Replaced direct DOM manipulation with a **render-based approach**
* Added:

  * Edit mode with form inputs
  * Status control and synchronization logic
  * Expand/collapse functionality
  * Priority visual indicators
  * Overdue handling and enhanced time logic
* Improved accessibility with ARIA attributes and labels


 Known Limitations

* No persistent storage (data resets on refresh)
* Edit mode does not include full focus trapping (optional enhancement)
* Styling is functional but minimal (can be improved further)
* No animations or transitions for UI changes



 Accessibility Notes

* All interactive elements are keyboard accessible
* Focus states are visible
* Screen reader support included via ARIA attributes
* Time updates are announced using `aria-live="polite"`
* Form inputs are properly labeled



 Responsiveness

* Mobile (320px): Fully stacked layout
* Tablet (768px): Improved spacing and alignment
* Desktop (1024px+): Structured and centered layout
* Handles long text and multiple tags without breaking layout



 Key Learning Outcomes

* State-driven UI design without frameworks
* DOM manipulation best practices
* Accessibility-first development
* Managing synchronized UI states
* Building scalable frontend components



 Setup Instructions

1. Clone the repository:

   
   git clone https://github.com/StOm-dev33/your-repo-name.git
  

2. Open the project folder:


   cd todo-card-stage-one
  

3. Run the project:

    Open `index.html` in your browser




 Acknowledgements

HNG Internship Program for providing structured frontend challenges focused on real-world development practices.
