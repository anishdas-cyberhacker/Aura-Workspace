export function renderDashboardView(container, navigateTo, state, store) {
  const projects = store.getProjects();
  const tasks = store.getTasks();

  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;

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
            <div class="font-label-sm text-xs text-on-surface-variant font-medium">Workspace v2.0</div>
          </div>
        </div>

        <button id="btn-sidebar-new-project" class="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-label-md text-sm font-bold shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-lg">add</span>
          <span>New Project</span>
        </button>

        <nav class="flex flex-col gap-1.5 flex-1">
          <button data-route="dashboard" class="nav-item flex items-center gap-3 px-3.5 py-2.5 text-primary font-bold bg-surface-container-high rounded-xl text-sm text-left">
            <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">dashboard</span>
            <span>Dashboard</span>
          </button>
          <button data-route="project" class="nav-item flex items-center gap-3 px-3.5 py-2.5 text-on-surface-variant hover:bg-surface-container rounded-xl text-sm font-medium transition-colors text-left">
            <span class="material-symbols-outlined text-xl">folder</span>
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

        <div class="pt-4 border-t border-outline-variant/15 flex flex-col gap-2">
          <button id="nav-landing-link" class="flex items-center gap-3 px-3.5 py-2 text-on-surface-variant hover:bg-surface-container rounded-xl text-sm font-medium transition-colors text-left">
            <span class="material-symbols-outlined text-xl">home</span>
            <span>Back to Landing</span>
          </button>
        </div>
      </aside>

      <!-- Main Workspace Area -->
      <main class="flex-1 flex flex-col h-screen overflow-hidden bg-surface-bright">
        <!-- Top Navbar -->
        <header class="h-16 px-6 border-b border-outline-variant/15 bg-surface/80 backdrop-blur-md flex items-center justify-between gap-4 sticky top-0 z-20">
          <div class="flex items-center gap-4 flex-1">
            <button id="btn-mobile-menu" class="md:hidden p-2 text-on-surface-variant hover:text-primary">
              <span class="material-symbols-outlined text-2xl">menu</span>
            </button>
            <div class="flex items-center bg-surface-container-low rounded-full px-4 py-2 border border-outline-variant/20 focus-within:border-primary w-full max-w-md">
              <span class="material-symbols-outlined text-outline text-lg mr-2">search</span>
              <input id="dashboard-search-input" type="text" placeholder="Search projects, tasks, or members..." class="bg-transparent border-none outline-none text-sm w-full placeholder:text-outline text-on-surface" />
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button id="btn-toggle-theme" class="p-2 text-on-surface-variant hover:text-primary rounded-xl hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined text-xl">dark_mode</span>
            </button>
            <button id="btn-notifications" class="p-2 text-on-surface-variant hover:text-primary rounded-xl hover:bg-surface-container transition-colors relative">
              <span class="material-symbols-outlined text-xl">notifications</span>
              <span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-surface"></span>
            </button>
            <div class="h-6 w-px bg-outline-variant/30"></div>
            <div class="flex items-center gap-3 pl-1">
              <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-sm">
                AN
              </div>
              <div class="hidden sm:block text-left">
                <div class="text-xs font-bold text-on-surface leading-tight">Anish Kumar</div>
                <div class="text-[11px] text-on-surface-variant leading-tight">Workspace Owner</div>
              </div>
            </div>
          </div>
        </header>

        <!-- Scrollable Dashboard Content -->
        <div class="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
          <!-- Welcome Banner & Quick Stats -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 class="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface">Welcome back, Anish 👋</h1>
              <p class="font-body-md text-sm text-on-surface-variant mt-1">Here is what is happening across your active projects today.</p>
            </div>
            <button id="btn-quick-new-task" class="self-start md:self-auto bg-primary text-white font-label-md text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-primary-container transition-all flex items-center gap-2 shadow-sm">
              <span class="material-symbols-outlined text-lg">add_task</span>
              <span>Create Task</span>
            </button>
          </div>

          <!-- Metrics Cards Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div class="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/15 shadow-sm flex items-center justify-between">
              <div>
                <div class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Active Projects</div>
                <div class="text-3xl font-extrabold text-on-surface">${totalProjects}</div>
                <div class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">trending_up</span> 100% On Track
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined text-2xl">folder_special</span>
              </div>
            </div>

            <div class="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/15 shadow-sm flex items-center justify-between">
              <div>
                <div class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Total Tasks</div>
                <div class="text-3xl font-extrabold text-on-surface">${totalTasks}</div>
                <div class="text-xs text-on-surface-variant font-medium mt-1.5">
                  ${inProgressTasks} In Progress • ${completedTasks} Done
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <span class="material-symbols-outlined text-2xl">assignment_turned_in</span>
              </div>
            </div>

            <div class="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/15 shadow-sm flex items-center justify-between">
              <div>
                <div class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Sprint Velocity</div>
                <div class="text-3xl font-extrabold text-on-surface">+24%</div>
                <div class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">bolt</span> 84 Points Completed
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                <span class="material-symbols-outlined text-2xl">speed</span>
              </div>
            </div>

            <div class="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/15 shadow-sm flex items-center justify-between">
              <div>
                <div class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Team Efficiency</div>
                <div class="text-3xl font-extrabold text-on-surface">96%</div>
                <div class="text-xs text-primary font-semibold mt-1.5 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">group</span> 8 Active Members
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                <span class="material-symbols-outlined text-2xl">groups</span>
              </div>
            </div>
          </div>

          <!-- Active Projects Section -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-headline-md text-xl font-bold text-on-surface">Active Projects</h2>
              <button id="btn-view-all-projects" class="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                <span>View Kanban Board</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            <div id="projects-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${projects.map(project => `
                <div class="project-card bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/15 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer" data-id="${project.id}">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-bold px-3 py-1 rounded-full ${project.categoryBg} ${project.categoryColor}">
                      ${project.category}
                    </span>
                    <span class="text-xs text-on-surface-variant font-medium">Sprint ${project.sprint}</span>
                  </div>
                  
                  <h3 class="font-headline-md text-lg font-bold text-on-surface mb-2">${project.name}</h3>
                  <p class="font-body-md text-xs text-on-surface-variant line-clamp-2 mb-4">${project.description}</p>

                  <div class="space-y-2 mb-5">
                    <div class="flex justify-between text-xs font-semibold">
                      <span class="text-on-surface-variant">Progress</span>
                      <span class="text-primary">${project.progress}%</span>
                    </div>
                    <div class="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div class="bg-gradient-to-r from-primary to-secondary h-full rounded-full" style="width: ${project.progress}%"></div>
                    </div>
                  </div>

                  <div class="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                    <div class="flex -space-x-2">
                      <div class="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center ring-2 ring-surface">AK</div>
                      <div class="w-7 h-7 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center ring-2 ring-surface">PS</div>
                      <div class="w-7 h-7 rounded-full bg-tertiary text-white text-xs font-bold flex items-center justify-center ring-2 ring-surface">ML</div>
                    </div>
                    <span class="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Open Board <span class="material-symbols-outlined text-sm">chevron_right</span>
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Activity & Quick Actions Split -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Recent Activity Feed -->
            <div class="lg:col-span-2 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
              <h3 class="font-headline-md text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-xl">history</span>
                <span>Recent Team Activity</span>
              </h3>

              <div class="space-y-4">
                <div class="flex gap-3 text-xs pb-3 border-b border-outline-variant/10 items-start">
                  <div class="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-base">check_circle</span>
                  </div>
                  <div>
                    <div class="text-on-surface font-semibold">Anish Kumar completed task <span class="text-primary font-bold">"Design System v2.0 Tokens"</span></div>
                    <div class="text-on-surface-variant text-[11px] mt-0.5">15 minutes ago • Phoenix Rebrand</div>
                  </div>
                </div>

                <div class="flex gap-3 text-xs pb-3 border-b border-outline-variant/10 items-start">
                  <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-base">add_task</span>
                  </div>
                  <div>
                    <div class="text-on-surface font-semibold">Priya Sharma created <span class="text-primary font-bold">"Stitch API Integration"</span></div>
                    <div class="text-on-surface-variant text-[11px] mt-0.5">1 hour ago • Mobile App Redesign</div>
                  </div>
                </div>

                <div class="flex gap-3 text-xs items-start">
                  <div class="w-8 h-8 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-base">alt_route</span>
                  </div>
                  <div>
                    <div class="text-on-surface font-semibold">System triggered <span class="text-primary font-bold">"Auto-assign Task to QA"</span> automation</div>
                    <div class="text-on-surface-variant text-[11px] mt-0.5">3 hours ago • SaaS Workflow Automation</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Automation Flow Launcher -->
            <div class="bg-gradient-to-br from-primary/5 via-surface-container-lowest to-secondary/5 p-6 rounded-2xl border border-primary/20 shadow-sm flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center mb-4">
                  <span class="material-symbols-outlined text-xl">account_tree</span>
                </div>
                <h3 class="font-headline-md text-lg font-bold text-on-surface mb-2">Automate Your Workflow</h3>
                <p class="font-body-md text-xs text-on-surface-variant leading-relaxed mb-6">
                  Build custom triggers and actions with Aura's node-based automation flow builder.
                </p>
              </div>

              <button id="btn-launch-flow-builder" class="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-white font-label-md text-xs font-bold rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2">
                <span>Open Automation Flow</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;

  // Attach Navigation Listeners
  container.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const route = btn.dataset.route;
      navigateTo(route);
    });
  });

  container.querySelector('#nav-landing-link')?.addEventListener('click', () => navigateTo('landing'));
  container.querySelector('#btn-view-all-projects')?.addEventListener('click', () => navigateTo('project'));
  container.querySelector('#btn-launch-flow-builder')?.addEventListener('click', () => navigateTo('flow'));

  // Project Card Clicks
  container.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      navigateTo('project');
    });
  });

  // Modal Triggers
  container.querySelector('#btn-sidebar-new-project')?.addEventListener('click', () => store.openNewProjectModal(navigateTo));
  container.querySelector('#btn-quick-new-task')?.addEventListener('click', () => store.openNewTaskModal(navigateTo));
}
