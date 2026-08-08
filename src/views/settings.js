export function renderSettingsView(container, navigateTo, state, store) {
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
            <div class="font-label-sm text-xs text-on-surface-variant font-medium">Settings</div>
          </div>
        </div>

        <nav class="flex flex-col gap-1.5 flex-1">
          <button data-route="dashboard" class="nav-item flex items-center gap-3 px-3.5 py-2.5 text-on-surface-variant hover:bg-surface-container rounded-xl text-sm font-medium transition-colors text-left">
            <span class="material-symbols-outlined text-xl">dashboard</span>
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
          <button data-route="settings" class="nav-item flex items-center gap-3 px-3.5 py-2.5 text-primary font-bold bg-surface-container-high rounded-xl text-sm text-left">
            <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">settings</span>
            <span>Settings</span>
          </button>
        </nav>
      </aside>

      <!-- Main Settings Panel -->
      <main class="flex-1 flex flex-col h-screen overflow-hidden bg-surface-bright">
        <!-- Top Workspace Bar -->
        <header class="h-16 px-6 border-b border-outline-variant/15 bg-surface/80 backdrop-blur-md flex items-center justify-between gap-4 sticky top-0 z-20">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary text-2xl">settings</span>
            <h1 class="font-headline-lg text-lg font-bold text-on-surface">Workspace & Account Settings</h1>
          </div>

          <button id="btn-toggle-theme" class="p-2 text-on-surface-variant hover:text-primary rounded-xl hover:bg-surface-container transition-colors">
            <span class="material-symbols-outlined text-xl">dark_mode</span>
          </button>
        </header>

        <!-- Settings Form Content -->
        <div class="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar max-w-4xl space-y-8">

          <!-- Profile Settings Section -->
          <div class="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/15 shadow-sm space-y-6">
            <h2 class="font-headline-md text-lg font-bold text-on-surface border-b border-outline-variant/10 pb-3">User Profile</h2>

            <div class="flex items-center gap-6">
              <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-extrabold text-2xl shadow-md">
                AN
              </div>
              <div class="space-y-2">
                <button class="bg-surface-container-low border border-outline-variant/30 text-on-surface text-xs font-bold px-4 py-2 rounded-xl hover:bg-surface-container transition-all">
                  Change Photo
                </button>
                <div class="text-[11px] text-on-surface-variant">JPG, PNG or GIF up to 2MB</div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-on-surface mb-1">Full Name</label>
                <input type="text" value="Anish Kumar" class="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label class="block text-xs font-bold text-on-surface mb-1">Email Address</label>
                <input type="email" value="anish@aura.workspace" class="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary" />
              </div>
            </div>
          </div>

          <!-- Preferences Section -->
          <div class="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/15 shadow-sm space-y-6">
            <h2 class="font-headline-md text-lg font-bold text-on-surface border-b border-outline-variant/10 pb-3">Appearance & Theme</h2>

            <div class="flex items-center justify-between">
              <div>
                <div class="font-bold text-sm text-on-surface">Interface Theme Mode</div>
                <div class="text-xs text-on-surface-variant mt-0.5">Toggle between High-Contrast Dark mode and Soft Glass Light mode</div>
              </div>
              <button id="btn-theme-switcher" class="bg-primary text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-primary-container transition-all flex items-center gap-2">
                <span class="material-symbols-outlined text-base">dark_mode</span>
                <span>Toggle Dark Mode</span>
              </button>
            </div>
          </div>

          <!-- Notifications Section -->
          <div class="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/15 shadow-sm space-y-6">
            <h2 class="font-headline-md text-lg font-bold text-on-surface border-b border-outline-variant/10 pb-3">Notifications & Alerts</h2>

            <div class="space-y-4">
              <label class="flex items-center justify-between cursor-pointer">
                <div>
                  <div class="font-bold text-sm text-on-surface">Email Digest</div>
                  <div class="text-xs text-on-surface-variant">Daily summary of task updates and velocity progress</div>
                </div>
                <input type="checkbox" checked class="w-5 h-5 accent-primary rounded cursor-pointer" />
              </label>

              <label class="flex items-center justify-between cursor-pointer border-t border-outline-variant/10 pt-4">
                <div>
                  <div class="font-bold text-sm text-on-surface">Automation Triggers</div>
                  <div class="text-xs text-on-surface-variant">Instant notifications when automated flow rules fire</div>
                </div>
                <input type="checkbox" checked class="w-5 h-5 accent-primary rounded cursor-pointer" />
              </label>
            </div>
          </div>

          <!-- Action Bar -->
          <div class="flex justify-end gap-3 pt-4">
            <button id="btn-save-settings" class="bg-gradient-to-r from-primary to-primary-container text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md hover:brightness-110 transition-all active:scale-95 flex items-center gap-2">
              <span class="material-symbols-outlined text-lg">save</span>
              <span>Save Preferences</span>
            </button>
          </div>

        </div>
      </main>
    </div>
  `;

  // Attach Handlers
  container.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const route = btn.dataset.route;
      navigateTo(route);
    });
  });

  container.querySelector('#btn-theme-switcher')?.addEventListener('click', () => {
    store.toggleTheme();
  });

  container.querySelector('#btn-save-settings')?.addEventListener('click', () => {
    store.showToast('Settings saved successfully!', 'success');
  });
}
