import { renderLandingView } from './views/landing.js';
import { renderDashboardView } from './views/dashboard.js';
import { renderProjectDetailView } from './views/projectDetail.js';
import { renderFlowView } from './views/flow.js';
import { renderSettingsView } from './views/settings.js';

// Initial Mock Data Store
const STORAGE_KEY_PROJECTS = 'aura_projects_v1';
const STORAGE_KEY_TASKS = 'aura_tasks_v1';

const defaultProjects = [
  {
    id: 'p1',
    name: 'Phoenix Rebrand Project',
    category: 'Design System',
    categoryBg: 'bg-purple-500/10',
    categoryColor: 'text-purple-600 dark:text-purple-400',
    description: 'Design system overhaul, high-contrast dark theme tokens, and component library expansion.',
    progress: 72,
    sprint: 14
  },
  {
    id: 'p2',
    name: 'Mobile App Redesign',
    category: 'Engineering',
    categoryBg: 'bg-blue-500/10',
    categoryColor: 'text-blue-600 dark:text-blue-400',
    description: 'Native iOS & Android app refresh with smooth micro-animations and offline caching.',
    progress: 45,
    sprint: 8
  },
  {
    id: 'p3',
    name: 'AI Predictive Engine',
    category: 'Machine Learning',
    categoryBg: 'bg-amber-500/10',
    categoryColor: 'text-amber-600 dark:text-amber-400',
    description: 'Sprint duration forecasting, workload optimization, and bottleneck detection models.',
    progress: 90,
    sprint: 22
  }
];

const defaultTasks = [
  {
    id: 't1',
    title: 'Design System v2.0 Tokens',
    description: 'Define CSS variables for HSL tailored color palette, glassmorphism surface elevations, and dark mode.',
    status: 'in-progress',
    tag: 'Design',
    dueDate: 'Aug 12',
    assigneeInitials: 'AK'
  },
  {
    id: 't2',
    title: 'Stitch MCP Integration API',
    description: 'Connect lazily loaded tools and design export hooks for real-time preview sync.',
    status: 'review',
    tag: 'API',
    dueDate: 'Aug 14',
    assigneeInitials: 'PS'
  },
  {
    id: 't3',
    title: 'Kanban Card Drag & Drop Animations',
    description: 'Implement physics-based micro-interactions and smooth column transfer feedback.',
    status: 'todo',
    tag: 'Engineering',
    dueDate: 'Aug 18',
    assigneeInitials: 'ML'
  },
  {
    id: 't4',
    title: 'Setup Workspace Authentication',
    description: 'OAuth2 authentication flow and session key rotation for enterprise teams.',
    status: 'done',
    tag: 'Engineering',
    dueDate: 'Aug 05',
    assigneeInitials: 'AK'
  },
  {
    id: 't5',
    title: 'Accessibility & Contrast Audit',
    description: 'Ensure WCAG AA compliance across light and dark theme mode palettes.',
    status: 'todo',
    tag: 'QA',
    dueDate: 'Aug 20',
    assigneeInitials: 'PS'
  }
];

class AppStore {
  constructor() {
    this.projects = this.load(STORAGE_KEY_PROJECTS, defaultProjects);
    this.tasks = this.load(STORAGE_KEY_TASKS, defaultTasks);
  }

  load(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(this.projects));
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(this.tasks));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  getProjects() {
    return this.projects;
  }

  getTasks() {
    return this.tasks;
  }

  getAutomations() {
    return [
      { id: 'a1', name: 'Auto-Assign QA on Review', status: 'active' },
      { id: 'a2', name: 'Slack Alert on High Priority Task', status: 'active' }
    ];
  }

  addTask(taskData, navigateTo) {
    const newTask = {
      id: 't_' + Date.now(),
      title: taskData.title || 'Untitled Task',
      description: taskData.description || 'No description provided.',
      status: taskData.status || 'todo',
      tag: taskData.tag || 'Engineering',
      dueDate: taskData.dueDate || 'Aug 25',
      assigneeInitials: taskData.assigneeInitials || 'AK'
    };

    this.tasks.unshift(newTask);
    this.save();
    this.showToast(`Task "${newTask.title}" added to board!`, 'success');
    navigateTo('project');
  }

  addProject(projectData, navigateTo) {
    const newProject = {
      id: 'p_' + Date.now(),
      name: projectData.name || 'New SaaS Project',
      category: projectData.category || 'Engineering',
      categoryBg: 'bg-blue-500/10',
      categoryColor: 'text-blue-600 dark:text-blue-400',
      description: projectData.description || 'Project created in Aura Workspace.',
      progress: 10,
      sprint: 1
    };

    this.projects.unshift(newProject);
    this.save();
    this.showToast(`Project "${newProject.name}" created!`, 'success');
    navigateTo('dashboard');
  }

  cycleTaskStatus(taskId, navigateTo) {
    const statuses = ['todo', 'in-progress', 'review', 'done'];
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      const idx = statuses.indexOf(task.status);
      const nextStatus = statuses[(idx + 1) % statuses.length];
      task.status = nextStatus;
      this.save();
      this.showToast(`Task moved to ${nextStatus.toUpperCase()}`, 'info');
      navigateTo('project');
    }
  }

  deleteTask(taskId, navigateTo) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.save();
    this.showToast('Task removed from board.', 'info');
    navigateTo('project');
  }

  toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    this.showToast(`Switched to ${isDark ? 'Dark' : 'Light'} theme`, 'info');
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const borderColors = {
      success: 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
      info: 'border-primary bg-primary/10 text-primary',
      warning: 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300'
    };

    toast.className = `pointer-events-auto px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg text-xs font-bold transition-all duration-300 transform translate-y-2 opacity-0 flex items-center gap-2 ${borderColors[type] || borderColors.info}`;
    toast.innerHTML = `
      <span class="material-symbols-outlined text-base">info</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  openNewTaskModal(navigateTo, defaultStatus = 'todo') {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-2xl w-full max-w-md shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 duration-150">
        <div class="flex items-center justify-between border-b border-outline-variant/10 pb-3">
          <h3 class="font-headline-md text-lg font-bold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">add_task</span>
            <span>Create New Task</span>
          </h3>
          <button id="modal-close-btn" class="text-on-surface-variant hover:text-primary">
            <span class="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <form id="form-create-task" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Task Title *</label>
            <input type="text" id="task-title-input" required placeholder="e.g. Design System v2.0 Tokens" class="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-sm text-on-surface focus:outline-none focus:border-primary" />
          </div>

          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Description</label>
            <textarea id="task-desc-input" rows="3" placeholder="Task details and deliverables..." class="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-sm text-on-surface focus:outline-none focus:border-primary"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-on-surface mb-1">Initial Status</label>
              <select id="task-status-select" class="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none">
                <option value="todo" ${defaultStatus === 'todo' ? 'selected' : ''}>To Do</option>
                <option value="in-progress" ${defaultStatus === 'in-progress' ? 'selected' : ''}>In Progress</option>
                <option value="review" ${defaultStatus === 'review' ? 'selected' : ''}>Review</option>
                <option value="done" ${defaultStatus === 'done' ? 'selected' : ''}>Done</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-on-surface mb-1">Category Tag</label>
              <select id="task-tag-select" class="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none">
                <option value="Design">Design</option>
                <option value="Engineering" selected>Engineering</option>
                <option value="API">API</option>
                <option value="QA">QA</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-3">
            <button type="button" id="modal-cancel-btn" class="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container rounded-xl">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-gradient-to-r from-primary to-primary-container text-white text-xs font-bold rounded-xl hover:brightness-110 shadow-sm">
              Save Task
            </button>
          </div>
        </form>
      </div>
    `;

    modalContainer.classList.remove('hidden');
    requestAnimationFrame(() => modalContainer.classList.remove('opacity-0'));

    const closeModal = () => {
      modalContainer.classList.add('opacity-0');
      setTimeout(() => modalContainer.classList.add('hidden'), 200);
    };

    modalContainer.querySelector('#modal-close-btn')?.addEventListener('click', closeModal);
    modalContainer.querySelector('#modal-cancel-btn')?.addEventListener('click', closeModal);

    modalContainer.querySelector('#form-create-task')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = modalContainer.querySelector('#task-title-input').value;
      const description = modalContainer.querySelector('#task-desc-input').value;
      const status = modalContainer.querySelector('#task-status-select').value;
      const tag = modalContainer.querySelector('#task-tag-select').value;

      this.addTask({ title, description, status, tag }, navigateTo);
      closeModal();
    });
  }

  openNewProjectModal(navigateTo) {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-2xl w-full max-w-md shadow-2xl space-y-5 relative">
        <div class="flex items-center justify-between border-b border-outline-variant/10 pb-3">
          <h3 class="font-headline-md text-lg font-bold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">create_new_folder</span>
            <span>Create New Project</span>
          </h3>
          <button id="modal-close-btn" class="text-on-surface-variant hover:text-primary">
            <span class="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <form id="form-create-project" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Project Name *</label>
            <input type="text" id="project-name-input" required placeholder="e.g. AI Analytics Platform" class="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-sm text-on-surface focus:outline-none focus:border-primary" />
          </div>

          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Description</label>
            <textarea id="project-desc-input" rows="3" placeholder="Brief overview of project goals..." class="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-sm text-on-surface focus:outline-none focus:border-primary"></textarea>
          </div>

          <div>
            <label class="block text-xs font-bold text-on-surface mb-1">Category</label>
            <input type="text" id="project-category-input" placeholder="e.g. Mobile App, Design System" class="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs text-on-surface focus:outline-none" />
          </div>

          <div class="flex justify-end gap-3 pt-3">
            <button type="button" id="modal-cancel-btn" class="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container rounded-xl">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-gradient-to-r from-primary to-primary-container text-white text-xs font-bold rounded-xl hover:brightness-110 shadow-sm">
              Create Project
            </button>
          </div>
        </form>
      </div>
    `;

    modalContainer.classList.remove('hidden');
    requestAnimationFrame(() => modalContainer.classList.remove('opacity-0'));

    const closeModal = () => {
      modalContainer.classList.add('opacity-0');
      setTimeout(() => modalContainer.classList.add('hidden'), 200);
    };

    modalContainer.querySelector('#modal-close-btn')?.addEventListener('click', closeModal);
    modalContainer.querySelector('#modal-cancel-btn')?.addEventListener('click', closeModal);

    modalContainer.querySelector('#form-create-project')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = modalContainer.querySelector('#project-name-input').value;
      const description = modalContainer.querySelector('#project-desc-input').value;
      const category = modalContainer.querySelector('#project-category-input').value || 'Engineering';

      this.addProject({ name, description, category }, navigateTo);
      closeModal();
    });
  }
}

// Router & App State Initialization
const appContainer = document.getElementById('app');
const store = new AppStore();
let currentRoute = 'landing';

function navigateTo(route) {
  currentRoute = route;
  window.scrollTo(0, 0);

  const state = { route: currentRoute };

  switch (route) {
    case 'landing':
      renderLandingView(appContainer, navigateTo, state, store);
      break;
    case 'dashboard':
      renderDashboardView(appContainer, navigateTo, state, store);
      break;
    case 'project':
      renderProjectDetailView(appContainer, navigateTo, state, store);
      break;
    case 'flow':
      renderFlowView(appContainer, navigateTo, state, store);
      break;
    case 'settings':
      renderSettingsView(appContainer, navigateTo, state, store);
      break;
    default:
      renderLandingView(appContainer, navigateTo, state, store);
  }

  // Global Theme Toggler Handler Attachment
  document.querySelectorAll('#btn-toggle-theme, #btn-theme-toggle-landing').forEach(btn => {
    btn.addEventListener('click', () => store.toggleTheme());
  });
}

// Initial Boot
navigateTo('landing');
