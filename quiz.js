/* ==========================================
   CivicPulse - Myth vs Fact Quiz & Badges Engine
   ========================================== */

const QuizModule = {
  currentIndex: 0,
  score: 0,
  unlockedBadgeIds: new Set(["b1"]), // First badge unlocked by default or on start
  answered: false,

  init() {
    this.renderQuestion();
    this.renderBadges();
    this.bindEvents();
  },

  renderQuestion() {
    const container = document.getElementById("quiz-question-container");
    if (!container) return;

    const question = CIVIC_DATA.quizQuestions[this.currentIndex];
    if (!question) {
      this.renderQuizResults(container);
      return;
    }

    this.answered = false;

    container.innerHTML = `
      <div class="quiz-header-status">
        <span class="badge badge-purple">Question 0${this.currentIndex + 1} of 0${CIVIC_DATA.quizQuestions.length}</span>
        <span class="quiz-score-badge"><i class="fas fa-star"></i> Score: ${this.score} pts</span>
      </div>

      <div class="quiz-question-box">
        <h3 class="question-text">${question.question}</h3>

        <div class="quiz-answers-grid">
          ${question.options.map((opt, idx) => `
            <button class="quiz-choice-btn" onclick="QuizModule.selectAnswer(${idx})">
              ${opt}
            </button>
          `).join("")}
        </div>

        <div id="quiz-explanation-slot"></div>
      </div>
    `;
  },

  selectAnswer(choiceIndex) {
    if (this.answered) return;
    this.answered = true;

    const question = CIVIC_DATA.quizQuestions[this.currentIndex];
    const isCorrect = choiceIndex === question.correctIndex;

    const buttons = document.querySelectorAll(".quiz-choice-btn");
    buttons.forEach((btn, idx) => {
      btn.style.pointerEvents = "none";
      if (idx === question.correctIndex) {
        btn.classList.add("correct");
      } else if (idx === choiceIndex) {
        btn.classList.add("incorrect");
      }
    });

    if (isCorrect) {
      this.score += 100;
      this.unlockBadge("b1");
    }

    const slot = document.getElementById("quiz-explanation-slot");
    if (slot) {
      slot.innerHTML = `
        <div class="quiz-explanation-box">
          <div style="font-weight: 700; color: ${isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; margin-bottom: 0.4rem;">
            ${isCorrect ? '✓ Correct Answer!' : '✗ Incorrect choice'}
          </div>
          <p style="color: var(--text-primary); font-size: 0.95rem;">${question.explanation}</p>
          <button class="btn btn-primary" style="margin-top: 1.2rem;" onclick="QuizModule.nextQuestion()">
            ${this.currentIndex < CIVIC_DATA.quizQuestions.length - 1 ? 'Next Question' : 'View Final Score'} <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      `;
    }
  },

  nextQuestion() {
    this.currentIndex++;
    this.renderQuestion();
  },

  renderQuizResults(container) {
    const total = CIVIC_DATA.quizQuestions.length * 100;
    const percentage = Math.round((this.score / total) * 100);

    if (percentage >= 60) this.unlockBadge("b2");
    if (percentage === 100) this.unlockBadge("b3");

    container.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🎉</div>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem;">Quiz Completed!</h2>
        <p style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 1.5rem;">
          You scored <strong>${this.score} / ${total}</strong> (${percentage}%)
        </p>

        <div style="margin-bottom: 2rem;">
          <span class="badge ${percentage >= 60 ? 'badge-emerald' : 'badge-amber'}" style="font-size: 1rem; padding: 0.5rem 1.2rem;">
            ${percentage >= 80 ? 'Master Civic Scholar 🏆' : percentage >= 60 ? 'Informed Citizen 🌟' : 'Civic Learner 📖'}
          </span>
        </div>

        <button class="btn btn-primary" onclick="QuizModule.restartQuiz()">
          <i class="fas fa-redo"></i> Retake Quiz
        </button>
      </div>
    `;
  },

  restartQuiz() {
    this.currentIndex = 0;
    this.score = 0;
    this.renderQuestion();
  },

  unlockBadge(badgeId) {
    this.unlockedBadgeIds.add(badgeId);
    this.renderBadges();
  },

  renderBadges() {
    const grid = document.getElementById("badges-grid");
    if (!grid) return;

    grid.innerHTML = CIVIC_DATA.badges.map(badge => {
      const isUnlocked = this.unlockedBadgeIds.has(badge.id);
      return `
        <div class="badge-card ${isUnlocked ? 'unlocked' : ''}">
          <div class="badge-icon-wrap">${badge.icon}</div>
          <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.3rem;">${badge.title}</h4>
          <p style="font-size: 0.8rem; color: var(--text-secondary);">${badge.requirement}</p>
        </div>
      `;
    }).join("");
  },

  bindEvents() {}
};
