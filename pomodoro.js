export class PomodoroTimer {
  constructor(displayId, syncCallback) {
    this.displayEl = document.getElementById(displayId);
    this.syncCallback = syncCallback;
    this.timeLeft = 25 * 60;
    this.timerId = null;
    this.mode = 25;
  }

  setMode(minutes) {
    this.mode = minutes;
    this.reset();
  }

  updateDisplay() {
    const min = Math.floor(this.timeLeft / 60);
    const sec = this.timeLeft % 60;
    if (this.displayEl) {
      this.displayEl.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }
  }

  start() {
    if (this.timerId) return;
    this.timerId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateDisplay();
      } else {
        this.complete();
      }
    }, 1000);
  }

  pause() {
    clearInterval(this.timerId);
    this.timerId = null;
  }

  reset() {
    this.pause();
    this.timeLeft = this.mode * 60;
    this.updateDisplay();
  }

  complete() {
    this.pause();
    const hoursEarned = Number((this.mode / 60).toFixed(2));
    if (typeof this.syncCallback === 'function') {
      this.syncCallback(hoursEarned);
    }
    alert(`🎉 Focus session completed! Added ${hoursEarned} hours to your study log.`);
  }
}
