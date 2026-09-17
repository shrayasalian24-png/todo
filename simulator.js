/* ==========================================
   CivicPulse - Interactive Ballot Voting Simulator Booth
   ========================================== */

const SimulatorModule = {
  currentMode: "general", // "general", "rcv", "proposition"
  
  // State for single choice contests
  generalSelections: {
    governor: null,
    mayor: null
  },
  
  // State for ranked choice contest
  rcvSelections: {
    first: null,
    second: null,
    third: null
  },

  // State for ballot measure proposition
  propSelection: null,

  init() {
    this.bindEvents();
    this.renderCurrentMode();
  },

  setMode(mode) {
    this.currentMode = mode;
    this.renderCurrentMode();
    this.updateTabUI();
  },

  updateTabUI() {
    document.querySelectorAll(".booth-tab").forEach(tab => {
      if (tab.dataset.mode === this.currentMode) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  },

  renderCurrentMode() {
    const mainBox = document.getElementById("booth-main-content");
    if (!mainBox) return;

    if (this.currentMode === "general") {
      this.renderGeneralBallot(mainBox);
    } else if (this.currentMode === "rcv") {
      this.renderRCVBallot(mainBox);
    } else if (this.currentMode === "proposition") {
      this.renderPropBallot(mainBox);
    }
  },

  renderGeneralBallot(container) {
    container.innerHTML = `
      <div class="ballot-header">
        <span class="badge badge-blue">Official Practice Ballot</span>
        <h3 class="ballot-title">General Election - Single-Choice Voting</h3>
        <p class="ballot-instruction">Select EXACTLY ONE candidate per contest by clicking on your choice.</p>
      </div>

      <!-- Contest 1: Governor -->
      <div style="margin-bottom: 2rem;">
        <h4 style="font-size: 1.15rem; color: var(--accent-blue); margin-bottom: 1rem;">Contest 1: Governor of the State</h4>
        <div class="candidate-list">
          <div class="candidate-card ${this.generalSelections.governor === 'cand-1' ? 'selected' : ''}" onclick="SimulatorModule.selectGeneral('governor', 'cand-1')">
            <div class="candidate-info">
              <div class="candidate-avatar">A</div>
              <div>
                <div class="candidate-name">Elena Vance</div>
                <div class="candidate-party">Progressive Alliance Party</div>
              </div>
            </div>
            <div class="vote-bubble">${this.generalSelections.governor === 'cand-1' ? '✓' : ''}</div>
          </div>

          <div class="candidate-card ${this.generalSelections.governor === 'cand-2' ? 'selected' : ''}" onclick="SimulatorModule.selectGeneral('governor', 'cand-2')">
            <div class="candidate-info">
              <div class="candidate-avatar" style="background: linear-gradient(135deg, #f43f5e, #be123c);">B</div>
              <div>
                <div class="candidate-name">Marcus Sterling</div>
                <div class="candidate-party">Civic Liberty Party</div>
              </div>
            </div>
            <div class="vote-bubble">${this.generalSelections.governor === 'cand-2' ? '✓' : ''}</div>
          </div>
        </div>
      </div>

      <!-- Contest 2: Mayor -->
      <div style="margin-bottom: 2rem;">
        <h4 style="font-size: 1.15rem; color: var(--accent-blue); margin-bottom: 1rem;">Contest 2: City Mayor</h4>
        <div class="candidate-list">
          <div class="candidate-card ${this.generalSelections.mayor === 'cand-3' ? 'selected' : ''}" onclick="SimulatorModule.selectGeneral('mayor', 'cand-3')">
            <div class="candidate-info">
              <div class="candidate-avatar" style="background: linear-gradient(135deg, #10b981, #047857);">C</div>
              <div>
                <div class="candidate-name">Sarah Lin</div>
                <div class="candidate-party">Independent Voter Coalition</div>
              </div>
            </div>
            <div class="vote-bubble">${this.generalSelections.mayor === 'cand-3' ? '✓' : ''}</div>
          </div>

          <div class="candidate-card ${this.generalSelections.mayor === 'cand-4' ? 'selected' : ''}" onclick="SimulatorModule.selectGeneral('mayor', 'cand-4')">
            <div class="candidate-info">
              <div class="candidate-avatar" style="background: linear-gradient(135deg, #f59e0b, #b45309);">D</div>
              <div>
                <div class="candidate-name">David Thorne</div>
                <div class="candidate-party">Metropolitan Forward Party</div>
              </div>
            </div>
            <div class="vote-bubble">${this.generalSelections.mayor === 'cand-4' ? '✓' : ''}</div>
          </div>
        </div>
      </div>

      <div id="ballot-status-alert"></div>

      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-secondary" onclick="SimulatorModule.clearGeneral()">Clear Ballot</button>
        <button class="btn btn-primary" onclick="SimulatorModule.castBallot()">Cast Practice Ballot</button>
      </div>
    `;
  },

  selectGeneral(contest, candidateId) {
    this.generalSelections[contest] = candidateId;
    this.renderCurrentMode();
  },

  clearGeneral() {
    this.generalSelections.governor = null;
    this.generalSelections.mayor = null;
    this.renderCurrentMode();
  },

  renderRCVBallot(container) {
    const candidates = [
      { id: 'rcv-1', name: 'Jordan Hayes', party: 'Reform Party' },
      { id: 'rcv-2', name: 'Amara Patel', party: 'Green Renewal Party' },
      { id: 'rcv-3', name: 'Carlos Mendez', party: 'Centrist Civic Party' }
    ];

    container.innerHTML = `
      <div class="ballot-header">
        <span class="badge badge-purple">Ranked-Choice Voting Demo</span>
        <h3 class="ballot-title">City Council - Ranked Preference Contest</h3>
        <p class="ballot-instruction">Rank candidates in order of preference (1st Choice, 2nd Choice, 3rd Choice). If your 1st choice is eliminated, your vote transfers to your 2nd choice!</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem;">
        ${candidates.map(cand => {
          const rank = this.getRCVRank(cand.id);
          return `
            <div class="candidate-card ${rank ? 'selected' : ''}">
              <div class="candidate-info">
                <div class="candidate-avatar" style="background: var(--gradient-accent);">${cand.name.charAt(0)}</div>
                <div>
                  <div class="candidate-name">${cand.name}</div>
                  <div class="candidate-party">${cand.party}</div>
                </div>
              </div>

              <div style="display: flex; gap: 0.5rem;">
                <button class="acc-btn ${rank === 1 ? 'active' : ''}" style="border: 1px solid var(--border-subtle);" onclick="SimulatorModule.setRCVRank('${cand.id}', 1)">1st Choice</button>
                <button class="acc-btn ${rank === 2 ? 'active' : ''}" style="border: 1px solid var(--border-subtle);" onclick="SimulatorModule.setRCVRank('${cand.id}', 2)">2nd Choice</button>
                <button class="acc-btn ${rank === 3 ? 'active' : ''}" style="border: 1px solid var(--border-subtle);" onclick="SimulatorModule.setRCVRank('${cand.id}', 3)">3rd Choice</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-secondary" onclick="SimulatorModule.clearRCV()">Clear RCV Ranks</button>
        <button class="btn btn-primary" onclick="SimulatorModule.castBallot()">Cast RCV Ballot</button>
      </div>
    `;
  },

  getRCVRank(candId) {
    if (this.rcvSelections.first === candId) return 1;
    if (this.rcvSelections.second === candId) return 2;
    if (this.rcvSelections.third === candId) return 3;
    return null;
  },

  setRCVRank(candId, rankNumber) {
    const keyMap = { 1: 'first', 2: 'second', 3: 'third' };
    const targetKey = keyMap[rankNumber];

    // Remove candidate from any existing rank
    Object.keys(this.rcvSelections).forEach(k => {
      if (this.rcvSelections[k] === candId) this.rcvSelections[k] = null;
    });

    this.rcvSelections[targetKey] = candId;
    this.renderCurrentMode();
  },

  clearRCV() {
    this.rcvSelections = { first: null, second: null, third: null };
    this.renderCurrentMode();
  },

  renderPropBallot(container) {
    container.innerHTML = `
      <div class="ballot-header">
        <span class="badge badge-amber">Public Measure / Proposition</span>
        <h3 class="ballot-title">Proposition 104: Local Public School & Library Modernization Bond</h3>
        <p class="ballot-instruction">Shall the district issue $15 Million in general obligation bonds to modernize school building safety and expand public digital library access?</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
        <div class="candidate-card ${this.propSelection === 'YES' ? 'selected' : ''}" onclick="SimulatorModule.selectProp('YES')">
          <div>
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-emerald);">YES</div>
            <div class="candidate-party">For the Measure</div>
          </div>
          <div class="vote-bubble">${this.propSelection === 'YES' ? '✓' : ''}</div>
        </div>

        <div class="candidate-card ${this.propSelection === 'NO' ? 'selected' : ''}" onclick="SimulatorModule.selectProp('NO')">
          <div>
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-rose);">NO</div>
            <div class="candidate-party">Against the Measure</div>
          </div>
          <div class="vote-bubble">${this.propSelection === 'NO' ? '✓' : ''}</div>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-primary" onclick="SimulatorModule.castBallot()">Cast Proposition Ballot</button>
      </div>
    `;
  },

  selectProp(val) {
    this.propSelection = val;
    this.renderCurrentMode();
  },

  castBallot() {
    // Check for Under-voting
    let isBlank = false;
    if (this.currentMode === 'general' && (!this.generalSelections.governor || !this.generalSelections.mayor)) {
      isBlank = true;
    } else if (this.currentMode === 'rcv' && !this.rcvSelections.first) {
      isBlank = true;
    } else if (this.currentMode === 'proposition' && !this.propSelection) {
      isBlank = true;
    }

    const modalOverlay = document.getElementById("stage-modal-overlay");
    const modalBody = document.getElementById("stage-modal-body");
    if (!modalOverlay || !modalBody) return;

    modalBody.innerHTML = `
      <div style="text-align: center; padding: 1.5rem 0;">
        <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--gradient-gold); color: #0f172a; font-size: 2.5rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
          <i class="fas fa-check-circle"></i>
        </div>
        <span class="badge badge-emerald" style="margin-bottom: 0.5rem; display: inline-block;">Official Practice Submission</span>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.8rem;">Ballot Successfully Tabulated!</h2>
        <p style="color: var(--text-secondary); max-width: 550px; margin: 0 auto 2rem auto;">
          ${isBlank ? '<strong>Notice:</strong> Your ballot contained unvoted contests (Under-vote). In real elections, unvoted contests are left blank, while your voted contests are fully counted!' : 'Congratulations! You successfully cast a complete ballot without any over-votes or ballot marking errors.'}
        </p>

        <div style="background: rgba(15, 23, 42, 0.8); border: 1px dashed var(--border-glow); padding: 1.5rem; border-radius: 16px; text-align: left; max-width: 500px; margin: 0 auto 2rem auto;">
          <div style="font-size: 0.8rem; color: var(--accent-blue); text-transform: uppercase; font-weight: 700; margin-bottom: 0.8rem;">Simulated Digital Ballot Receipt</div>
          <div style="font-family: monospace; font-size: 0.9rem; line-height: 1.8; color: var(--text-primary);">
            TIMESTAMP: ${new Date().toISOString()}<br>
            PRECINCT: Precinct #104 - District 12<br>
            TABULATOR ID: TAB-8842-SECURE<br>
            STATUS: CERTIFIED & STORED IN BALLOT BOX
          </div>
        </div>

        <button class="btn btn-primary" onclick="TimelineModule.closeStageModal()">Return to Simulator</button>
      </div>
    `;

    modalOverlay.classList.add("active");
  },

  bindEvents() {
    document.querySelectorAll(".booth-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        this.setMode(tab.dataset.mode);
      });
    });
  }
};
