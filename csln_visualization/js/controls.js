// Bottom strip: step chips, play button, caption line.

export class Controls {
  constructor({ steps, onStep, onPlay }) {
    this.steps = steps.map(String);
    this.onStep = onStep;
    this.chipsEl = document.getElementById("step-chips");
    this.playBtn = document.getElementById("play-btn");
    this.captionEl = document.getElementById("caption");

    for (const s of this.steps) {
      const b = document.createElement("button");
      b.textContent = s === "inf" ? "∞" : s;
      b.dataset.step = s;
      b.addEventListener("click", () => onStep(s));
      this.chipsEl.appendChild(b);
    }
    this.playBtn.addEventListener("click", onPlay);
  }

  setActiveStep(k) {
    this.chipsEl.querySelectorAll("button").forEach((b) =>
      b.classList.toggle("active", b.dataset.step === String(k))
    );
  }

  setPlaying(on) {
    this.playBtn.textContent = on ? "⏸ pause" : "▶ play";
  }

  setCaption(text) {
    this.captionEl.textContent = text;
  }
}
