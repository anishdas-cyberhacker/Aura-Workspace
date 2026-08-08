export function renderProjectDetailView(container, navigateTo, state, store) {
  const tasks = store.getTasks();

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const reviewTasks = tasks.filter(t => t.status === 'review');
  const doneTasks = tasks.filter(t => t.status === 'done');

  container.innerHTML = `
    <div class="flex h-screen overflow-hidden bg-background text-on-surface">
      <!-- Sidebar Navigation -->
      <aside class="hidden md:flex flex-col w-64 border-r border-outline-variant/15 bg-surface-container-low p-4 gap-6 shrink-0">
        <div class="flex items-center gap-3 px-2 pt-2 cursor-pointer" id="nav-brand">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
            A
          </div>
          <div>
            <div class="font-headline-md text-xl font-extrabold text-primary tracking-tight">Aura</div>
            <div class="font-label-sm text-xs text-on-surface-variant font-medium">Management</div>
          </div>
        </div>

        <button id="btn-sidebar-new-task" class="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-label-md text-sm font-bold shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-lg">add</span>
          <span>New Task</span>
        </button>

        <nav class="flex flex-col gap-1.5 flex-1">
          <button data-route="dashboard" class="nav-item flex items-center gap-3 px-3.5 py-2.5 text-on-surface-variant hover:bg-surface-container rounded-xl text-sm font-medium transition-colors text-left">
            <span class="material-symbols-outlined text-xl">dashboard</span>
            <span>Dashboard</span>
          </button>
          <button data-route="project" class="nav-item flex items-center gap-3 px-3.5 py-2.5 text-primary font-bold bg-surface-container-high rounded-xl text-sm text-left">
            <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">folder</span>
            <span>Projects & Board</span>
          </button>
          <button data-route="flow" class="nav-item flex items-center gap-3 px-3.5 py-2.5 text-on-surface-variant hover:bg-surface-container rounded-xl text-sm font-medium transition-colors text-left">
            <span class="material-symbols-outlined text-xl">account_tree</span>
            <span>SaaS Automation Flow</span>
          </button>
          <button data-route="settings" class="nav-item flex items-center gap-3 px-3.5 py-2.5 text-on-surface-variant hover:bg-surface-container rounded-xl text-sm font-medium transition-colors text-left">
            <span class="material-symbols-outlined text-xl">settings</span>
            <span>Settings</span>
          </button>
        </nav>
      </aside>

      <!-- Main Kanban Area -->
      <main class="flex-1 flex flex-col h-screen overflow-hidden bg-surface-bright">
        <!-- Top Workspace Bar -->
        <header class="h-16 px-6 border-b border-outline-variant/15 bg-surface/80 backdrop-blur-md flex items-center justify-between gap-4 sticky top-0 z-20">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
              <span>Projects</span>
              <span class="material-symbols-outlined text-sm">chevron_right</span>
              <span class="text-on-surface font-bold">Phoenix Rebrand</span>
            </div>
            <span class="bg-primary/10 text-primary text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-primary/20">Sprint 14</span>
          </div>

          <div class="flex items-center gap-3">
            <button id="btn-add-board-task" class="bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm">
              <span class="material-symbols-outlined text-base">add</span>
              <span>Add Task</span>
            </button>
            <button id="btn-toggle-theme" class="p-2 text-on-surface-variant hover:text-primary rounded-xl hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined text-xl">dark_mode</span>
            </button>
          </div>
        </header>

        <!-- Project Header Details -->
        <div class="px-6 pt-6 pb-4 border-b border-outline-variant/15 bg-surface-container-lowest/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="font-headline-lg text-2xl font-extrabold text-on-surface flex items-center gap-3">
              <span>Phoenix Rebrand Project</span>
              <span class="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs px-2.5 py-1 rounded-full font-semibold">Active</span>
            </h1>
            <p class="font-body-md text-xs text-on-surface-variant mt-1">Design system overhaul, high-contrast dark theme tokens, and component library expansion.</p>
          </div>

          <div class="flex items-center gap-3 text-xs">
            <div class="flex -space-x-2">
              <div class="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center ring-2 ring-surface">AK</div>
              <div class="w-8 h-8 rounded-full bg-secondary text-white font-bold flex items-center justify-center ring-2 ring-surface">PS</div>
              <div class="w-8 h-8 rounded-full bg-tertiary text-white font-bold flex items-center justify-center ring-2 ring-surface">ML</div>
            </div>
            <button class="w-8 h-8 rounded-full border border-dashed border-outline-variant/50 text-on-surface-variant hover:text-primary flex items-center justify-center">
              <span class="material-symbols-outlined text-base">add</span>
            </button>
          </div>
        </div>

        <!-- Kanban Board Columns Grid -->
        <div class="flex-1 overflow-x-auto p-6 custom-scrollbar">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 min-w-[1000px] h-full items-start">

            <!-- COLUMN 1: TO DO -->
            <div class="kanban-column bg-surface-container-low/70 p-4 rounded-2xl border border-outline-variant/15 flex flex-col max-h-full">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-amber-500"></div>
                  <h3 class="font-headline-md font-bold text-sm text-on-surface">To Do</h3>
                  <span class="bg-surface-container text-on-surface-variant text-xs font-bold px-2 py-0.5 rounded-full">${todoTasks.length}</span>
                </div>
                <button class="btn-quick-add text-on-surface-variant hover:text-primary p-1" data-status="todo">
                  <span class="material-symbols-outlined text-lg">add</span>
                </button>
              </div>

              <div class="space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                ${todoTasks.map(task => renderTaskCard(task)).join('')}
              </div>
            </div>

            <!-- COLUMN 2: IN PROGRESS -->
            <div class="kanban-column bg-surface-container-low/70 p-4 rounded-2xl border border-outline-variant/15 flex flex-col max-h-full">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-primary"></div>
                  <h3 class="font-headline-md font-bold text-sm text-on-surface">In Progress</h3>
                  <span class="bg-surface-container text-on-surface-variant text-xs font-bold px-2 py-0.5 rounded-full">${inProgressTasks.length}</span>
                </div>
                <button class="btn-quick-add text-on-surface-variant hover:text-primary p-1" data-status="in-progress">
                  <span class="material-symbols-outlined text-lg">add</span>
                </button>
              </div>

              <div class="space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                ${inProgressTasks.map(task => renderTaskCard(task)).join('')}
              </div>
            </div>

            <!-- COLUMN 3: REVIEW -->
            <div class="kanban-column bg-surface-container-low/70 p-4 rounded-2xl border border-outline-variant/15 flex flex-col max-h-full">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                  <h3 class="font-headline-md font-bold text-sm text-on-surface">Review</h3>
                  <span class="bg-surface-container text-on-surface-variant text-xs font-bold px-2 py-0.5 rounded-full">${reviewTasks.length}</span>
                </div>
                <button class="btn-quick-add text-on-surface-variant hover:text-primary p-1" data-status="review">
                  <span class="material-symbols-outlined text-lg">add</span>
                </button>
              </div>

              <div class="space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                ${reviewTasks.map(task => renderTaskCard(task)).join('')}
              </div>
            </div>

            <!-- COLUMN 4: DONE -->
            <div class="kanban-column bg-surface-container-low/70 p-4 rounded-2xl border border-outline-variant/15 flex flex-col max-h-full">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <h3 class="font-headline-md font-bold text-sm text-on-surface">Done</h3>
                  <span class="bg-surface-container text-on-surface-variant text-xs font-bold px-2 py-0.5 rounded-full">${doneTasks.length}</span>
                </div>
                <button class="btn-quick-add text-on-surface-variant hover:text-primary p-1" data-status="done">
                  <span class="material-symbols-outlined text-lg">add</span>
                </button>
              </div>

              <div class="space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                ${doneTasks.map(task => renderTaskCard(task)).join('')}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  `;

  // Task Card Component Renderer
  function renderTaskCard(task) {
    const tagColors = {
      'Design': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      'Engineering': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      'API': 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      'QA': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    };

    return `
      <div class="task-card bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/15 shadow-2xs hover:shadow-md transition-all space-y-3 group" data-id="${task.id}">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColors[task.tag] || 'bg-primary/10 text-primary'}">
            ${task.tag}
          </span>
          <div class="flex items-center gap-1">
            <button class="btn-change-status text-on-surface-variant hover:text-primary p-0.5 rounded" data-id="${task.id}" title="Move task">
              <span class="material-symbols-outlined text-sm">swap_horiz</span>
            </button>
            <button class="btn-delete-task text-on-surface-variant hover:text-error p-0.5 rounded" data-id="${task.id}" title="Delete task">
              <span class="material-symbols-outlined text-sm">delete</span>
            </button>
          </div>
        </div>

        <h4 class="font-headline-md text-sm font-bold text-on-surface leading-snug group-hover:text-primary transition-colors">
          ${task.title}
        </h4>

        <p class="font-body-md text-xs text-on-surface-variant line-clamp-2">
          ${task.description}
        </p>

        <div class="flex items-center justify-between pt-2 border-t border-outline-variant/10 text-[11px] text-on-surface-variant">
          <div class="flex items-center gap-1.5 font-medium">
            <span class="material-symbols-outlined text-xs">schedule</span>
            <span>Due ${task.dueDate}</span>
          </div>
          <div class="w-6 h-6 rounded-full bg-primary text-white font-bold text-[10px] flex items-center justify-center">
            ${task.assigneeInitials}
          </div>
        </div>
      </div>
    `;
  }

  // Navigation Handlers
  container.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const route = btn.dataset.route;
      navigateTo(route);
    });
  });

  container.querySelector('#btn-sidebar-new-task')?.addEventListener('click', () => store.openNewTaskModal(navigateTo));
  container.querySelector('#btn-add-board-task')?.addEventListener('click', () => store.openNewTaskModal(navigateTo));

  container.querySelectorAll('.btn-quick-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const status = btn.dataset.status;
      store.openNewTaskModal(navigateTo, status);
    });
  });

  // Task Status Toggle & Delete Event Delegation
  container.querySelectorAll('.btn-change-status').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const taskId = btn.dataset.id;
      store.cycleTaskStatus(taskId, navigateTo);
    });
  });

  container.querySelectorAll('.btn-delete-task').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const taskId = btn.dataset.id;
      store.deleteTask(taskId, navigateTo);
    });
  });
}
