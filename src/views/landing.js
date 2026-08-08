export function renderLandingView(container, navigateTo) {
  container.innerHTML = `
    <div class="relative min-h-screen bg-background text-on-surface overflow-x-hidden">
      <!-- Ambient Background Glows -->
      <div class="ambient-glow top-0 left-[-200px]"></div>
      <div class="ambient-glow top-[40%] right-[-250px]"></div>

      <!-- Landing Navigation Header -->
      <header class="sticky top-0 z-40 w-full px-6 md:px-12 h-16 bg-surface/70 backdrop-blur-md border-b border-outline-variant/10 flex items-center justify-between">
        <div class="flex items-center gap-3 cursor-pointer" id="brand-logo-btn">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white font-bold text-lg shadow-sm">
            A
          </div>
          <span class="font-headline-md text-2xl font-extrabold text-primary tracking-tight">Aura</span>
        </div>

        <nav class="hidden md:flex items-center gap-8 text-on-surface-variant font-label-md font-medium text-sm">
          <a href="#features" class="hover:text-primary transition-colors">Features</a>
          <a href="#solutions" class="hover:text-primary transition-colors">Solutions</a>
          <a href="#pricing" class="hover:text-primary transition-colors">Pricing</a>
          <a href="#docs" class="hover:text-primary transition-colors">Resources</a>
        </nav>

        <div class="flex items-center gap-4">
          <button id="btn-theme-toggle-landing" class="p-2 text-on-surface-variant hover:text-primary rounded-lg transition-colors">
            <span class="material-symbols-outlined text-xl">dark_mode</span>
          </button>
          <button id="btn-landing-signin" class="hidden sm:block text-on-surface-variant hover:text-primary font-label-md font-semibold text-sm transition-colors">
            Sign In
          </button>
          <button id="btn-launch-app" class="bg-gradient-to-r from-primary to-primary-container text-white font-label-md font-semibold text-sm px-5 py-2.5 rounded-xl hover:brightness-110 shadow-md transition-all active:scale-95 flex items-center gap-2">
            <span>Launch App</span>
            <span class="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center flex flex-col items-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-surface-container-high/60 text-primary px-4 py-1.5 rounded-full font-label-sm text-xs font-semibold mb-8 border border-outline-variant/20 shadow-sm animate-bounce">
          <span class="material-symbols-outlined text-sm">auto_awesome</span>
          <span>Introducing Aura v2.0 • Powered by Intelligent Workflows</span>
        </div>

        <h1 class="font-headline-lg text-4xl sm:text-6xl font-extrabold text-on-surface leading-tight max-w-4xl mb-6">
          Project Management, <br class="hidden sm:inline"/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">Reimagined for Speed.</span>
        </h1>

        <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
          The unified workspace for high-velocity teams. Real-time Kanban boards, native workflow automation, and predictive team analytics.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button id="btn-hero-start" class="bg-gradient-to-r from-primary to-primary-container text-white font-label-md font-bold text-base px-8 py-4 rounded-xl hover:brightness-110 shadow-lg hover:shadow-primary/20 transition-all duration-200 active:scale-95 flex items-center justify-center gap-3">
            <span>Get Started Free</span>
            <span class="material-symbols-outlined text-lg">rocket_launch</span>
          </button>
          <button id="btn-hero-demo" class="bg-surface-container-low border border-outline-variant/30 text-secondary font-label-md font-semibold text-base px-8 py-4 rounded-xl hover:bg-surface-container transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">play_circle</span>
            <span>View Interactive Demo</span>
          </button>
        </div>
      </section>

      <!-- App Preview Mockup -->
      <section class="max-w-6xl mx-auto px-6 pb-20 relative z-10">
        <div class="relative w-full rounded-2xl p-1 bg-gradient-to-b from-primary/30 via-outline-variant/20 to-transparent shadow-2xl">
          <div class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-inner border border-outline-variant/10">
            <!-- Window Bar -->
            <div class="h-11 bg-surface-container flex items-center justify-between px-4 border-b border-outline-variant/10">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-red-400"></div>
                <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div class="bg-surface-container-low text-xs text-on-surface-variant font-mono px-6 py-1 rounded-md border border-outline-variant/10">
                https://app.aura.workspace/dashboard
              </div>
              <div class="w-16"></div>
            </div>

            <!-- Dashboard Content Preview Grid -->
            <div class="p-6 md:p-8 bg-surface-bright grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Card 1: Kanban Sneak Peek -->
              <div class="col-span-2 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 shadow-sm">
                <div class="flex justify-between items-center mb-4">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-xl">view_kanban</span>
                    <h3 class="font-headline-md font-bold text-on-surface text-base">Phoenix Rebrand Sprint</h3>
                  </div>
                  <span class="bg-secondary-container/40 text-secondary text-xs font-semibold px-2.5 py-1 rounded-full">Active Sprint</span>
                </div>
                <div class="grid grid-cols-3 gap-3">
                  <div class="bg-surface-container-low p-3 rounded-lg border border-outline-variant/10">
                    <div class="text-xs font-bold text-on-surface-variant mb-2">In Progress (4)</div>
                    <div class="bg-surface-container-lowest p-2.5 rounded border border-outline-variant/10 text-xs font-medium text-on-surface shadow-2xs mb-2">
                      Design System v2.0 Tokens
                    </div>
                    <div class="bg-surface-container-lowest p-2.5 rounded border border-outline-variant/10 text-xs font-medium text-on-surface shadow-2xs">
                      Dark Theme Palette Setup
                    </div>
                  </div>
                  <div class="bg-surface-container-low p-3 rounded-lg border border-outline-variant/10">
                    <div class="text-xs font-bold text-on-surface-variant mb-2">Review (2)</div>
                    <div class="bg-surface-container-lowest p-2.5 rounded border border-outline-variant/10 text-xs font-medium text-on-surface shadow-2xs">
                      Stitch API Integration
                    </div>
                  </div>
                  <div class="bg-surface-container-low p-3 rounded-lg border border-outline-variant/10">
                    <div class="text-xs font-bold text-on-surface-variant mb-2">Completed (8)</div>
                    <div class="bg-surface-container-lowest p-2.5 rounded border border-outline-variant/10 text-xs font-medium text-emerald-700 dark:text-emerald-400 shadow-2xs">
                      ✓ Setup Workspace Auth
                    </div>
                  </div>
                </div>
              </div>

              <!-- Card 2: Sprint Metrics -->
              <div class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                    <span class="material-symbols-outlined">trending_up</span>
                    <span>Sprint Velocity</span>
                  </div>
                  <div class="text-3xl font-extrabold text-on-surface mb-1">+24%</div>
                  <div class="text-xs text-on-surface-variant">Compared to last week</div>
                </div>
                <div class="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden mt-4">
                  <div class="bg-gradient-to-r from-primary to-secondary h-full w-4/5 rounded-full"></div>
                </div>
                <div class="mt-4 pt-4 border-t border-outline-variant/10 flex items-center justify-between text-xs text-on-surface-variant">
                  <span>84 / 100 Story Points</span>
                  <span class="text-primary font-bold">84%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Client Logo Marquee -->
      <section class="py-12 border-y border-outline-variant/10 bg-surface-container-lowest overflow-hidden">
        <p class="text-center font-label-sm text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-8">
          Trusted by product teams at high-growth organizations
        </p>
        <div class="relative w-full flex overflow-hidden">
          <div class="flex animate-marquee whitespace-nowrap items-center min-w-full gap-16 px-8 text-on-surface-variant/60 font-bold text-lg">
            <div class="flex items-center gap-2"><span class="material-symbols-outlined text-2xl">webhook</span> Acme Global</div>
            <div class="flex items-center gap-2"><span class="material-symbols-outlined text-2xl">cloud_sync</span> CloudScale</div>
            <div class="flex items-center gap-2"><span class="material-symbols-outlined text-2xl">architecture</span> Stratos AI</div>
            <div class="flex items-center gap-2"><span class="material-symbols-outlined text-2xl">all_inclusive</span> Infinity Labs</div>
            <div class="flex items-center gap-2"><span class="material-symbols-outlined text-2xl">fingerprint</span> Aegis Security</div>
            <div class="flex items-center gap-2"><span class="material-symbols-outlined text-2xl">webhook</span> Acme Global</div>
            <div class="flex items-center gap-2"><span class="material-symbols-outlined text-2xl">cloud_sync</span> CloudScale</div>
            <div class="flex items-center gap-2"><span class="material-symbols-outlined text-2xl">architecture</span> Stratos AI</div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="max-w-6xl mx-auto px-6 py-24">
        <div class="text-center mb-16">
          <h2 class="font-headline-lg text-3xl sm:text-4xl font-extrabold text-on-surface mb-4">
            Built for modern engineering & design workflows
          </h2>
          <p class="font-body-md text-base text-on-surface-variant max-w-2xl mx-auto">
            Everything your team needs to plan, track, and ship high-quality products without friction.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/15 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
              <span class="material-symbols-outlined text-2xl">view_kanban</span>
            </div>
            <h3 class="font-headline-md text-xl font-bold text-on-surface mb-3">Fluid Kanban Boards</h3>
            <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Drag, drop, assign, and organize tasks effortlessly with customizable columns, priority flags, and tags.
            </p>
          </div>

          <div class="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/15 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div class="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-6">
              <span class="material-symbols-outlined text-2xl">account_tree</span>
            </div>
            <h3 class="font-headline-md text-xl font-bold text-on-surface mb-3">Workflow Automation</h3>
            <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Connect triggers to automated actions. Auto-assign tasks, send Slack notifications, and update statuses.
            </p>
          </div>

          <div class="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/15 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div class="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center text-tertiary mb-6">
              <span class="material-symbols-outlined text-2xl">insights</span>
            </div>
            <h3 class="font-headline-md text-xl font-bold text-on-surface mb-3">Predictive Analytics</h3>
            <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Real-time sprint velocity charts, bottleneck detection, and AI-assisted task duration forecasting.
            </p>
          </div>
        </div>
      </section>

      <!-- Footer CTA -->
      <footer class="bg-surface-container-low border-t border-outline-variant/15 py-12 px-6">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <span class="font-headline-md font-bold text-primary text-xl">Aura</span>
            <span class="text-xs text-on-surface-variant ml-4">© 2026 Aura Inc. All rights reserved.</span>
          </div>
          <div class="flex items-center gap-6 text-sm text-on-surface-variant font-medium">
            <a href="#" class="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" class="hover:text-primary transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  `;

  // Attach Event Listeners
  const launchBtn = container.querySelector('#btn-launch-app');
  const heroStartBtn = container.querySelector('#btn-hero-start');
  const heroDemoBtn = container.querySelector('#btn-hero-demo');
  const logoBtn = container.querySelector('#brand-logo-btn');
  const signInBtn = container.querySelector('#btn-landing-signin');

  [launchBtn, heroStartBtn, heroDemoBtn, signInBtn].forEach(btn => {
    btn?.addEventListener('click', () => navigateTo('dashboard'));
  });

  logoBtn?.addEventListener('click', () => navigateTo('landing'));
}
