/* ==========================================
   CivicPulse - Interactive Timeline Component
   ========================================== */

const TimelineModule = {
  activeCategory: "all",

  init() {
    this.renderFilterButtons();
    this.renderTimeline();
    this.bindEvents();
  },

  renderFilterButtons() {
    const container = document.getElementById("timeline-filters");
    if (!container) return;

    const categories = ["all", "Preparation", "Nomination", "Information", "Voting Phase", "Results"];
    container.innerHTML = categories.map(cat => `
      <button class="filter-btn ${cat === this.activeCategory ? 'active' : ''}" data-category="${cat}">
        ${cat === 'all' ? 'All Stages' : cat}
      </button>
    `).join("");
  },

  renderTimeline() {
    const container = document.getElementById("timeline-pipeline");
    if (!container) return;

    const filtered = this.activeCategory === "all"
      ? CIVIC_DATA.timelineStages
      : CIVIC_DATA.timelineStages.filter(s => s.category === this.activeCategory);

    container.innerHTML = filtered.map(stage => `
      <div class="timeline-stage-card" data-stage-id="${stage.id}">
        <div class="stage-node-icon">
          <i class="fas ${stage.icon}"></i>
        </div>
        <div class="stage-inner">
          <div class="stage-header">
            <span class="stage-step-num">Stage 0${stage.step} &bull; ${stage.category}</span>
            <span class="badge badge-blue">${stage.timelineWindow}</span>
          </div>
          <h3 class="stage-title">${stage.title}</h3>
          <p class="stage-summary">${stage.summary}</p>
          <div class="stage-quick-tips">
            ${stage.quickTips.map(tip => `<span class="tip-pill"><i class="fas fa-check-circle"></i> ${tip}</span>`).join("")}
          </div>
          <button class="stage-action-btn" onclick="TimelineModule.openStageModal('${stage.id}')">
            <span>Explore Stage Deep-Dive</span> <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `).join("");
  },

  bindEvents() {
    const filterContainer = document.getElementById("timeline-filters");
    if (filterContainer) {
      filterContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (btn) {
          this.activeCategory = btn.dataset.category;
          this.renderFilterButtons();
          this.renderTimeline();
        }
      });
    }
  },

  openStageModal(stageId) {
    const stage = CIVIC_DATA.timelineStages.find(s => s.id === stageId);
    if (!stage) return;

    const modalOverlay = document.getElementById("stage-modal-overlay");
    const modalBody = document.getElementById("stage-modal-body");
    if (!modalOverlay || !modalBody) return;

    const guide = stage.detailedGuide;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="badge badge-purple" style="margin-bottom: 0.5rem; display: inline-block;">Stage 0${stage.step} &bull; ${stage.category}</span>
        <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">${stage.title}</h2>
        <p style="color: var(--text-secondary); font-size: 1.05rem;">${stage.summary}</p>
      </div>

      <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
        <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); padding: 0.8rem 1.2rem; border-radius: 12px; flex: 1;">
          <div style="font-size: 0.8rem; color: var(--accent-blue); text-transform: uppercase; font-weight: 700;">Timeline Window</div>
          <div style="font-weight: 600; margin-top: 0.2rem;">${stage.timelineWindow}</div>
        </div>
        <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); padding: 0.8rem 1.2rem; border-radius: 12px; flex: 1;">
          <div style="font-size: 0.8rem; color: var(--accent-amber); text-transform: uppercase; font-weight: 700;">Critical Deadline</div>
          <div style="font-weight: 600; margin-top: 0.2rem;">${stage.keyDeadline}</div>
        </div>
      </div>

      <div style="margin-bottom: 2rem;">
        <h4 style="font-size: 1.2rem; color: var(--accent-blue); margin-bottom: 0.8rem;"><i class="fas fa-clipboard-list"></i> Key Requirements & Procedures</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem;">
          ${guide.procedureSteps.map(step => `
            <li style="display: flex; align-items: flex-start; gap: 0.8rem; background: rgba(255, 255, 255, 0.03); padding: 0.8rem 1rem; border-radius: 8px;">
              <i class="fas fa-check" style="color: var(--accent-emerald); margin-top: 0.2rem;"></i>
              <span>${step}</span>
            </li>
          `).join("")}
        </ul>
      </div>

      <div style="margin-bottom: 2rem; background: rgba(15, 23, 42, 0.6); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--border-subtle);">
        <h4 style="font-size: 1.2rem; color: var(--accent-purple); margin-bottom: 0.6rem;"><i class="fas fa-cogs"></i> Behind the Scenes Mechanics</h4>
        <p style="color: var(--text-secondary); line-height: 1.6;">${guide.behindTheScenes}</p>
      </div>

      <div>
        <h4 style="font-size: 1.2rem; color: var(--accent-rose); margin-bottom: 0.8rem;"><i class="fas fa-shield-virus"></i> Myth vs. Reality</h4>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${guide.commonMyths.map(m => `
            <div style="border-left: 4px solid var(--accent-rose); padding-left: 1rem; background: rgba(244, 63, 94, 0.05); padding: 1rem; border-radius: 0 12px 12px 0;">
              <div style="font-weight: 700; color: var(--accent-rose); margin-bottom: 0.3rem;"><i class="fas fa-times-circle"></i> MYTH: "${m.myth}"</div>
              <div style="color: var(--text-primary); font-size: 0.95rem;"><i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i> <strong>FACT:</strong> ${m.fact}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    modalOverlay.classList.add("active");
  },

  closeStageModal() {
    const modalOverlay = document.getElementById("stage-modal-overlay");
    if (modalOverlay) {
      modalOverlay.classList.remove("active");
    }
  }
};
