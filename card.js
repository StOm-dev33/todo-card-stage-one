// ===== DOM ELEMENTS =====
const card = document.querySelector('.card');
const title = document.getElementById('title');
const description = document.getElementById('description');
const priorityBadge = document.querySelector('.priority-badge');
const dueDate = document.getElementById('dueDate');
const timeRemaining = document.getElementById('timeRemaining');
const overdueIndicator = document.getElementById('overdueIndicator');
const statusControl = document.getElementById('statusControl');
const completeToggle = document.getElementById('completeToggle');

const expandBtn = document.getElementById('expandBtn');
const collapsibleSection = document.getElementById('collapsible-section');

const editBtn = document.getElementById('editBtn');
const editForm = document.getElementById('editForm');
const editTitle = document.getElementById('editTitle');
const editDescription = document.getElementById('editDescription');
const editPriority = document.getElementById('editPriority');
const editDueDate = document.getElementById('editDueDate');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const deleteBtn = document.getElementById('deleteBtn');

// ===== STATE VARIABLES =====
let taskData = {
  title: 'Finish HNG Stage 1 Task',
  description: 'Build a fully interactive todo card with edit, status, and time logic. Extend the Stage 0 card with editing capabilities, status transitions, priority changes, and dynamic time handling.',
  priority: 'High',
  dueDate: new Date('2026-04-25T18:00:00'),
  status: 'Pending',
  completed: false,
};

let isExpanded = false;
let timeUpdateInterval = null;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeUI();
  updateTimeRemaining();
  startTimeUpdate();
  setupEventListeners();
});

function initializeUI() {
  // Set initial UI state
  updateCardDisplay();
  completeToggle.checked = taskData.completed;
  statusControl.value = taskData.status;
  editTitle.value = taskData.title;
  editDescription.value = taskData.description;
  editPriority.value = taskData.priority;
  editDueDate.value = formatDateTimeLocal(taskData.dueDate);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Expand/Collapse
  expandBtn.addEventListener('click', toggleExpand);

  // Checkbox and Status Sync
  completeToggle.addEventListener('change', handleCheckboxChange);
  statusControl.addEventListener('change', handleStatusChange);

  // Edit Form
  editBtn.addEventListener('click', openEditForm);
  saveBtn.addEventListener('click', saveChanges);
  cancelBtn.addEventListener('click', closeEditForm);
  deleteBtn.addEventListener('click', deleteTask);

  // Keyboard accessibility
  expandBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand();
    }
  });

  // Close edit form on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !editForm.classList.contains('hidden')) {
      closeEditForm();
    }
  });

  // Focus management for edit form
  editForm.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      // Optional: Implement focus trap
      const focusableElements = editForm.querySelectorAll(
        'input, textarea, select, button'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}

// ===== EXPAND / COLLAPSE =====
function toggleExpand() {
  isExpanded = !isExpanded;

  if (isExpanded) {
    collapsibleSection.removeAttribute('hidden');
    expandBtn.textContent = 'Collapse';
    expandBtn.setAttribute('aria-expanded', 'true');
  } else {
    collapsibleSection.setAttribute('hidden', '');
    expandBtn.textContent = 'Expand';
    expandBtn.setAttribute('aria-expanded', 'false');
  }
}

// ===== CHECKBOX & STATUS SYNCHRONIZATION =====
function handleCheckboxChange() {
  if (completeToggle.checked) {
    taskData.status = 'Done';
    taskData.completed = true;
    statusControl.value = 'Done';
    title.classList.add('completed');
    timeRemaining.textContent = '✓ Completed';
    timeRemaining.classList.remove('overdue');
  } else {
    taskData.status = 'Pending';
    taskData.completed = false;
    statusControl.value = 'Pending';
    title.classList.remove('completed');
    updateTimeRemaining();
  }
  updateCardDisplay();
}

function handleStatusChange() {
  taskData.status = statusControl.value;

  if (statusControl.value === 'Done') {
    completeToggle.checked = true;
    taskData.completed = true;
    title.classList.add('completed');
    timeRemaining.textContent = '✓ Completed';
    timeRemaining.classList.remove('overdue');
  } else {
    completeToggle.checked = false;
    taskData.completed = false;
    title.classList.remove('completed');
    updateTimeRemaining();
  }

  updateCardDisplay();
}

// ===== TIME MANAGEMENT =====
function updateTimeRemaining() {
  if (taskData.completed || taskData.status === 'Done') {
    timeRemaining.textContent = '✓ Completed';
    timeRemaining.classList.remove('overdue');
    overdueIndicator.classList.add('hidden');
    return;
  }

  const now = new Date();
  const difference = taskData.dueDate - now;

  if (difference <= 0) {
    // Overdue
    const overdueMs = Math.abs(difference);
    const overdueHours = Math.floor(overdueMs / (1000 * 60 * 60));
    const overdueDays = Math.floor(overdueHours / 24);

    if (overdueDays > 0) {
      timeRemaining.textContent = `⚠ Overdue by ${overdueDays} day${overdueDays > 1 ? 's' : ''}`;
    } else if (overdueHours > 0) {
      timeRemaining.textContent = `⚠ Overdue by ${overdueHours} hour${overdueHours > 1 ? 's' : ''}`;
    } else {
      const overdueMinutes = Math.floor(overdueMs / (1000 * 60));
      timeRemaining.textContent = `⚠ Overdue by ${overdueMinutes} minute${overdueMinutes > 1 ? 's' : ''}`;
    }

    timeRemaining.classList.add('overdue');
    overdueIndicator.classList.remove('hidden');
  } else {
    // Not overdue
    timeRemaining.classList.remove('overdue');
    overdueIndicator.classList.add('hidden');

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      timeRemaining.textContent = `📅 Due in ${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      timeRemaining.textContent = `⏰ Due in ${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      timeRemaining.textContent = `⏱️ Due in ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      timeRemaining.textContent = '🔴 Due in less than 1 minute';
    }
  }
}

function startTimeUpdate() {
  // Update every 60 seconds (as per requirements 30-60s)
  timeUpdateInterval = setInterval(() => {
    if (!taskData.completed) {
      updateTimeRemaining();
    }
  }, 60000);
}

// ===== EDIT MODE =====
function openEditForm() {
  editForm.classList.remove('hidden');
  editTitle.focus();
  editBtn.setAttribute('aria-expanded', 'true');
}

function closeEditForm() {
  editForm.classList.add('hidden');
  editBtn.focus();
  editBtn.setAttribute('aria-expanded', 'false');
}

function saveChanges() {
  if (!editTitle.value.trim()) {
    editTitle.focus();
    alert('Title cannot be empty');
    return;
  }

  taskData.title = editTitle.value;
  taskData.description = editDescription.value;
  taskData.priority = editPriority.value;
  taskData.dueDate = new Date(editDueDate.value);

  updateCardDisplay();
  closeEditForm();

  // Visual feedback
  card.style.animation = 'none';
  setTimeout(() => {
    card.style.animation = 'slideInUp 0.3s ease-out';
  }, 10);
}

// ===== UPDATE CARD DISPLAY =====
function updateCardDisplay() {
  // Update title
  title.textContent = taskData.title;
  if (taskData.completed) {
    title.classList.add('completed');
  } else {
    title.classList.remove('completed');
  }

  // Update description
  description.textContent = taskData.description;

  // Update priority
  priorityBadge.textContent = taskData.priority;
  priorityBadge.classList.remove('low', 'medium', 'high');
  priorityBadge.classList.add(taskData.priority.toLowerCase());

  // Update due date
  dueDate.textContent = formatDueDate(taskData.dueDate);
  dueDate.setAttribute('datetime', taskData.dueDate.toISOString());

  // Update time remaining
  updateTimeRemaining();

  // Update status control
  statusControl.value = taskData.status;

  // Update checkbox
  completeToggle.checked = taskData.completed;
}

// ===== DELETE TASK =====
function deleteTask() {
  if (confirm('Are you sure you want to delete this task?')) {
    card.style.animation = 'slideInUp 0.3s ease-out reverse';
    setTimeout(() => {
      card.style.opacity = '0';
      clearInterval(timeUpdateInterval);
      // In a real app, this would make an API call
      console.log('Task deleted');
    }, 300);
  }
}

// ===== UTILITY FUNCTIONS =====
function formatDueDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return `Due ${date.toLocaleDateString('en-US', options)}`;
}

function formatDateTimeLocal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// ===== ACCESSIBILITY: ANNOUNCE TIME CHANGES =====
const observer = new MutationObserver(() => {
  // The aria-live="polite" on timeRemaining will announce changes automatically
});

observer.observe(timeRemaining, {
  characterData: true,
  subtree: true,
});
