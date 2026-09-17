/* ==========================================
   CivicPulse - Voter Readiness Calculator & Wizard
   ========================================== */

const WizardModule = {
  currentStep: 1,
  selectedPersona: null,
  completedChecklistIds: new Set(),

  init() {
    this.renderPersonaOptions();
    this.bindEvents();
  },

  renderPersonaOptions() {
    const grid = document.getElementById("wizard-persona-grid");
    if (!grid) return;

    grid.innerHTML = CIVIC_DATA.personas.map(persona => `
      <div class="option-card ${this.selectedPersona?.id === persona.id ? 'selected' : ''}" data-persona-id="${persona.id}">
        <span class="option-icon">${persona.icon}</span>
        <h4 class="option-title">${persona.title}</h4>
        <p class="option-desc">${persona.subtitle}</p>
      </div>
    `).join("");
  },

  selectPersona(personaId) {
    this.selectedPersona = CIVIC_DATA.personas.find(p => p.id === personaId);
    this.renderPersonaOptions();
    
    // Enable Next Step button
    const nextBtn = document.getElementById("wizard-next-btn");
    if (nextBtn) nextBtn.removeAttribute("disabled");
  },

  nextStep() {
    if (this.currentStep === 1 && !this.selectedPersona) return;

    if (this.currentStep < 2) {
      this.currentStep++;
      this.updateStepUI();
      if (this.currentStep === 2) {
        this.generateChecklistOutput();
      }
    }
  },

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStepUI();
    }
  },

  updateStepUI() {
    const step1El = document.getElementById("wizard-step-1");
    const step2El = document.getElementById("wizard-step-2");
    const progressLine = document.getElementById("wizard-progress-line");
    
    const node1 = document.getElementById("node-step-1");
    const node2 = document.getElementById("node-step-2");

    if (this.currentStep === 1) {
      if (step1El) step1El.classList.remove("hidden");
      if (step2El) step2El.classList.add("hidden");
      if (progressLine) progressLine.style.width = "0%";
      
      if (node1) { node1.classList.add("active"); node1.classList.remove("completed"); }
      if (node2) { node2.classList.remove("active", "completed"); }
    } else if (this.currentStep === 2) {
      if (step1El) step1El.classList.add("hidden");
      if (step2El) step2El.classList.remove("hidden");
      if (progressLine) progressLine.style.width = "100%";

      if (node1) { node1.classList.remove("active"); node1.classList.add("completed"); }
      if (node2) { node2.classList.add("active"); }
    }
  },

  generateChecklistOutput() {
    const container = document.getElementById("wizard-checklist-container");
    if (!container || !this.selectedPersona) return;

    const items = this.selectedPersona.checklist;

    container.innerHTML = `
      <div class="checklist-container">
        <div class="checklist-header">
          <div>
            <span class="badge badge-emerald" style="margin-bottom: 0.3rem;">Personalized Action Plan</span>
            <h3 style="font-size: 1.5rem;">${this.selectedPersona.icon} ${this.selectedPersona.title} Guide</h3>
          </div>
          <button class="btn btn-secondary" onclick="WizardModule.printChecklist()">
            <i class="fas fa-print"></i> Save / Print Checklist
          </button>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.4rem;">
            <span>Readiness Progress</span>
            <span id="checklist-progress-text">0 / ${items.length} Completed</span>
          </div>
          <div style="width: 100%; height: 8px; background: rgba(255, 255, 255, 0.1); border-radius: 4px; overflow: hidden;">
            <div id="checklist-progress-bar" style="width: 0%; height: 100%; background: var(--accent-emerald); transition: width 0.3s ease;"></div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.8rem;">
          ${items.map(item => `
            <div class="checklist-item">
              <input type="checkbox" class="checklist-checkbox" id="${item.id}" onchange="WizardModule.toggleItem('${item.id}', ${items.length})">
              <div>
                <label for="${item.id}" class="checklist-text-title" style="cursor: pointer;">${item.title}</label>
                <div class="checklist-text-desc">${item.desc}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    // Unlock Voter Ready badge
    if (typeof QuizModule !== 'undefined') {
      QuizModule.unlockBadge('b4');
    }
  },

  toggleItem(itemId, totalItems) {
    const checkbox = document.getElementById(itemId);
    if (checkbox.checked) {
      this.completedChecklistIds.add(itemId);
    } else {
      this.completedChecklistIds.delete(itemId);
    }

    const count = this.completedChecklistIds.size;
    const percentage = Math.round((count / totalItems) * 100);

    const bar = document.getElementById("checklist-progress-bar");
    const text = document.getElementById("checklist-progress-text");

    if (bar) bar.style.width = `${percentage}%`;
    if (text) text.innerText = `${count} / ${totalItems} Completed (${percentage}%)`;
  },

  printChecklist() {
    window.print();
  },

  bindEvents() {
    const grid = document.getElementById("wizard-persona-grid");
    if (grid) {
      grid.addEventListener("click", (e) => {
        const card = e.target.closest(".option-card");
        if (card) {
          this.selectPersona(card.dataset.personaId);
        }
      });
    }

    const nextBtn = document.getElementById("wizard-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.nextStep());
    }

    const prevBtn = document.getElementById("wizard-prev-btn");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.prevStep());
    }
  }
};
