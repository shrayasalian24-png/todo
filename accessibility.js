/* ==========================================
   CivicPulse - Accessibility & Inclusive Design Module
   ========================================== */

const AccessibilityModule = {
  theme: "dark", // "dark", "light", "high-contrast"
  fontScale: 1.0,
  lang: "en",
  speechSynth: window.speechSynthesis || null,
  isReading: false,

  init() {
    this.bindEvents();
    this.applySettings();
  },

  setTheme(newTheme) {
    this.theme = newTheme;
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("civic_theme", newTheme);
  },

  setFontScale(delta) {
    this.fontScale = Math.min(Math.max(0.85, this.fontScale + delta), 1.35);
    document.documentElement.style.setProperty("--font-scale", this.fontScale);
  },

  resetFontScale() {
    this.fontScale = 1.0;
    document.documentElement.style.setProperty("--font-scale", 1.0);
  },

  toggleSpeechReader() {
    if (!this.speechSynth) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    if (this.isReading) {
      this.speechSynth.cancel();
      this.isReading = false;
      document.querySelectorAll(".reading-highlight").forEach(el => el.classList.remove("reading-highlight"));
      const btn = document.getElementById("tts-toggle-btn");
      if (btn) btn.innerHTML = `<i class="fas fa-volume-up"></i> Read Page`;
    } else {
      const heroText = document.querySelector(".hero-description")?.innerText || document.body.innerText.substring(0, 300);
      const utterance = new SpeechSynthesisUtterance(heroText);
      utterance.onstart = () => {
        this.isReading = true;
        const btn = document.getElementById("tts-toggle-btn");
        if (btn) btn.innerHTML = `<i class="fas fa-stop"></i> Stop Reading`;
        document.querySelector(".hero-description")?.classList.add("reading-highlight");
      };
      utterance.onend = () => {
        this.isReading = false;
        const btn = document.getElementById("tts-toggle-btn");
        if (btn) btn.innerHTML = `<i class="fas fa-volume-up"></i> Read Page`;
        document.querySelectorAll(".reading-highlight").forEach(el => el.classList.remove("reading-highlight"));
      };
      this.speechSynth.speak(utterance);
    }
  },

  applySettings() {
    const savedTheme = localStorage.getItem("civic_theme") || "dark";
    this.setTheme(savedTheme);
  },

  bindEvents() {
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const nextTheme = this.theme === "dark" ? "light" : this.theme === "light" ? "high-contrast" : "dark";
        this.setTheme(nextTheme);
      });
    }

    const ttsBtn = document.getElementById("tts-toggle-btn");
    if (ttsBtn) {
      ttsBtn.addEventListener("click", () => this.toggleSpeechReader());
    }

    const fontInc = document.getElementById("font-increase-btn");
    if (fontInc) fontInc.addEventListener("click", () => this.setFontScale(0.1));

    const fontDec = document.getElementById("font-decrease-btn");
    if (fontDec) fontDec.addEventListener("click", () => this.setFontScale(-0.1));
  }
};
