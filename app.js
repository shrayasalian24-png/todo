/* ==========================================
   CivicPulse - Main Application Coordinator
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  init() {
    console.log("CivicPulse Application Initialized.");

    // Initialize modules
    AccessibilityModule.init();
    TimelineModule.init();
    WizardModule.init();
    SimulatorModule.init();
    QuizModule.init();

    // Render Security Steps
    this.renderSecuritySteps();

    // Start Live Countdown Timer
    this.startCountdown();

    // Bind Search Engine
    this.bindSearch();

    // Mobile Nav Toggle
    this.bindMobileNav();
  },

  startCountdown() {
    // Target Election Day: November 3, 2026
    const targetDate = new Date("2026-11-03T07:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        document.getElementById("timer-days").innerText = "00";
        document.getElementById("timer-hours").innerText = "00";
        document.getElementById("timer-mins").innerText = "00";
        document.getElementById("timer-secs").innerText = "00";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const daysEl = document.getElementById("timer-days");
      const hoursEl = document.getElementById("timer-hours");
      const minsEl = document.getElementById("timer-mins");
      const secsEl = document.getElementById("timer-secs");

      if (daysEl) daysEl.innerText = days < 10 ? `0${days}` : days;
      if (hoursEl) hoursEl.innerText = hours < 10 ? `0${hours}` : hours;
      if (minsEl) minsEl.innerText = minutes < 10 ? `0${minutes}` : minutes;
      if (secsEl) secsEl.innerText = seconds < 10 ? `0${seconds}` : seconds;
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  },

  bindSearch() {
    const input = document.getElementById("quick-search-input");
    const resultsContainer = document.getElementById("quick-search-results");
    if (!input || !resultsContainer) return;

    input.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length < 2) {
        resultsContainer.innerHTML = "";
        resultsContainer.classList.add("hidden");
        return;
      }

      const matches = CIVIC_DATA.timelineStages.filter(stage => 
        stage.title.toLowerCase().includes(query) ||
        stage.summary.toLowerCase().includes(query) ||
        stage.category.toLowerCase().includes(query)
      );

      if (matches.length === 0) {
        resultsContainer.innerHTML = `
          <div class="search-result-item">
            <div class="search-result-desc">No election stages matching "${query}"</div>
          </div>
        `;
      } else {
        resultsContainer.innerHTML = matches.map(m => `
          <div class="search-result-item" onclick="TimelineModule.openStageModal('${m.id}')">
            <div class="search-result-title">Stage 0${m.step}: ${m.title}</div>
            <div class="search-result-desc">${m.summary.substring(0, 80)}...</div>
          </div>
        `).join("");
      }

      resultsContainer.classList.remove("hidden");
    });

    // Close search dropdown on click outside
    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !resultsContainer.contains(e.target)) {
        resultsContainer.classList.add("hidden");
      }
    });
  },

  renderSecuritySteps() {
    const grid = document.getElementById("security-flow-grid");
    if (!grid) return;

    grid.innerHTML = CIVIC_DATA.securitySteps.map(step => `
      <div class="flow-step-card">
        <div class="flow-step-number">0${step.step}</div>
        <div class="flow-step-icon"><i class="fas ${step.icon}"></i></div>
        <h4 class="flow-step-title">${step.title}</h4>
        <p class="flow-step-desc">${step.desc}</p>
      </div>
    `).join("");
  },

  bindMobileNav() {
    const toggle = document.getElementById("mobile-menu-toggle");
    const menu = document.getElementById("nav-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        menu.classList.toggle("mobile-open");
      });
    }
  }
};
