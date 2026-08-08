export function renderFlowView(container, navigateTo, state, store) {
  const automations = store.getAutomations();

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
            <div class="font-label-sm text-xs text-on-surface-variant font-medium">Automations</div>
          </div>
        </div>

        <button id="btn-sidebar-new-flow" class="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-label-md text-sm font-bold shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-lg">add</span>
          <span>New Automation</span>
        </button>

        <nav class="flex flex-col gap-1.5 flex-1">
          <button data-route="dashboard" class="nav-item flex items-center gap-3 px-3.5 py-2.5 text-on-surface-variant hover:bg-surface-container rounded-xl text-sm font-medium transition-colors text-left">
            <span class="material-symbols-outlined text-xl">dashboard</span>
            <span>Dashboard</span>
          </button>
          <button data-route="project" class="nav-item flex items-center gap-3 px-3.5 py-2.5 text-on-surface-variant hover:bg-surface-container rounded-xl text-sm font-medium transition-colors text-left">
            <span class="material-symbols-outlined text-xl">folder</span>
            <span>Projects & Board</span>
          </button>
          <button data-route="flow" class="nav-item flex items-center gap-3 px-3.5 py-2.5 text-primary font-bold bg-surface-container-high rounded-xl text-sm text-left">
            <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">account_tree</span>
            <span>SaaS Automation Flow</span>
          </button>
          <button data-route="settings" class="nav-item flex items-center gap-3 px-3.5 py-2.5 text-on-surface-variant hover:bg-surface-container rounded-xl text-sm font-medium transition-colors text-left">
            <span class="material-symbols-outlined text-xl">settings</span>
            <span>Settings</span>
          </button>
        </nav>
      </aside>

      <!-- Main Canvas -->
      <main class="flex-1 flex flex-col h-screen overflow-hidden bg-surface-bright relative">
        <!-- Top Workspace Bar -->
        <header class="h-16 px-6 border-b border-outline-variant/15 bg-surface/80 backdrop-blur-md flex items-center justify-between gap-4 sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary text-2xl">account_tree</span>
            <h1 class="font-headline-lg text-lg font-bold text-on-surface">Auto-Assign & Notify Sprint Flow</h1>
            <span class="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-bold">Active</span>
          </div>

          <div class="flex items-center gap-3">
            <button id="btn-test-automation" class="bg-gradient-to-r from-secondary to-secondary-container text-white text-xs font-bold px-4 py-2 rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 shadow-sm">
              <span class="material-symbols-outlined text-base">play_arrow</span>
              <span>Test Run</span>
            </button>
            <button id="btn-toggle-theme" class="p-2 text-on-surface-variant hover:text-primary rounded-xl hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined text-xl">dark_mode</span>
            </button>
          </div>
        </header>

        <!-- Canvas Flow Graph -->
        <div class="flex-1 p-8 overflow-y-auto custom-scrollbar flex flex-col items-center justify-start space-y-6">
          <p class="text-xs text-on-surface-variant font-medium bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/15">
            ⚡ Triggers fire automatically when task events occur in your workspace.
          </p>

          <!-- Flow Node 1: Trigger -->
          <div class="w-full max-w-md bg-surface-container-lowest p-6 rounded-2xl border-2 border-primary shadow-lg relative transition-transform hover:scale-[1.01]">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <span class="material-symbols-outlined text-lg">bolt</span>
                </div>
                <span class="text-xs font-bold uppercase tracking-wider text-primary">Trigger Event</span>
              </div>
              <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">Listening</span>
            </div>

            <h3 class="font-headline-md text-base font-bold text-on-surface mb-1">When Task Status Changes</h3>
            <p class="font-body-md text-xs text-on-surface-variant">Fires when any task is moved to "In Progress" or "Review"</p>
          </div>

          <!-- Connector Wire -->
          <div class="w-0.5 h-10 bg-gradient-to-b from-primary to-secondary relative flex items-center justify-center">
            <span class="material-symbols-outlined text-secondary text-sm bg-surface p-1 rounded-full border border-outline-variant/20">arrow_downward</span>
          </div>

          <!-- Flow Node 2: Condition -->
          <div class="w-full max-w-md bg-surface-container-lowest p-6 rounded-2xl border border-secondary shadow-md relative transition-transform hover:scale-[1.01]">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                  <span class="material-symbols-outlined text-lg">filter_alt</span>
                </div>
                <span class="text-xs font-bold uppercase tracking-wider text-secondary">Condition Rule</span>
              </div>
              <span class="text-xs font-semibold text-on-surface-variant">Match All</span>
            </div>

            <h3 class="font-headline-md text-base font-bold text-on-surface mb-1">If Tag Equals "Engineering"</h3>
            <p class="font-body-md text-xs text-on-surface-variant">Check if task priority is High or Critical</p>
          </div>

          <!-- Connector Wire -->
          <div class="w-0.5 h-10 bg-gradient-to-b from-secondary to-tertiary relative flex items-center justify-center">
            <span class="material-symbols-outlined text-tertiary text-sm bg-surface p-1 rounded-full border border-outline-variant/20">arrow_downward</span>
          </div>

          <!-- Flow Node 3: Action -->
          <div class="w-full max-w-md bg-surface-container-lowest p-6 rounded-2xl border border-tertiary shadow-md relative transition-transform hover:scale-[1.01]">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center">
                  <span class="material-symbols-outlined text-lg">send</span>
                </div>
                <span class="text-xs font-bold uppercase tracking-wider text-tertiary">Action Output</span>
              </div>
              <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Ready</span>
            </div>

            <h3 class="font-headline-md text-base font-bold text-on-surface mb-1">Send Slack Notification & Auto-Assign</h3>
            <p class="font-body-md text-xs text-on-surface-variant">Posts alert to #engineering-sprint and assigns QA reviewer.</p>
          </div>
        </div>
      </main>
    </div>
  `;

  // Attach Event Handlers
  container.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const route = btn.dataset.route;
      navigateTo(route);
    });
  });

  container.querySelector('#btn-test-automation')?.addEventListener('click', () => {
    store.showToast('⚡ Test Automation Triggered! Connected nodes executed successfully.', 'success');
  });

  container.querySelector('#btn-sidebar-new-flow')?.addEventListener('click', () => {
    store.showToast('Created new automation workflow block.', 'info');
  });
}
