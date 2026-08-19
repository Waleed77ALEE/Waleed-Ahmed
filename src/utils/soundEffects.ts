/**
 * WALEEDKHANAFRIDI.ONLINE — Web Audio Synthesized Tactile Sound Library
 * 
 * Provides ultra-low latency, pure Web Audio synthetic sound effects for
 * tactile micro-interactions (clicks, hovers, success chimes, tab switches, modals).
 * Zero external audio asset dependencies, zero network requests, fully accessible with
 * user mute controls, throttled hover triggers, and volume gain safety ramps.
 */

class SoundEngine {
  private static instance: SoundEngine;
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private lastHoverTime: number = 0;
  private hoverThrottleMs: number = 45;

  private constructor() {
    // Check saved preference or default to true
    try {
      const saved = localStorage.getItem('wka_sound_effects_enabled');
      this.isMuted = saved === 'false';
    } catch {
      this.isMuted = false;
    }
  }

  public static getInstance(): SoundEngine {
    if (!SoundEngine.instance) {
      SoundEngine.instance = new SoundEngine();
    }
    return SoundEngine.instance;
  }

  /**
   * Initializes or resumes the AudioContext on user interaction to comply
   * with browser autoplay policies.
   */
  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (!AudioContextClass) return null;

      try {
        this.audioCtx = new AudioContextClass();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(1.0, this.audioCtx.currentTime);
        this.masterGain.connect(this.audioCtx.destination);
      } catch (e) {
        console.warn('[SoundEngine] Could not initialize Web Audio Context:', e);
        return null;
      }
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }

    return this.audioCtx;
  }

  public getIsEnabled(): boolean {
    return !this.isMuted;
  }

  public setEnabled(enabled: boolean): void {
    this.isMuted = !enabled;
    try {
      localStorage.setItem('wka_sound_effects_enabled', String(enabled));
      window.dispatchEvent(new CustomEvent('wka_sound_state_change', { detail: { enabled } }));
    } catch {
      // ignore
    }
  }

  public toggle(): boolean {
    const newState = !this.getIsEnabled();
    this.setEnabled(newState);
    if (newState) {
      this.playClick();
    }
    return newState;
  }

  /**
   * Subtle, airy micro-hover sound (~20ms, 1400Hz -> 900Hz sine drop, ultra-delicate gain).
   * Throttled to prevent overlapping flutter when moving across dense button grids.
   */
  public playHover(volumeScale: number = 1.0): void {
    if (this.isMuted) return;
    const now = Date.now();
    if (now - this.lastHoverTime < this.hoverThrottleMs) return;
    this.lastHoverTime = now;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, t);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.022);

      const targetGain = 0.025 * Math.min(Math.max(volumeScale, 0.1), 2.0);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(targetGain, t + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.022);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain || ctx.destination);

      osc.start(t);
      osc.stop(t + 0.025);
    } catch {
      // Ignore audio synthesis errors gracefully
    }
  }

  /**
   * Snappy, tactile mechanical click (~35ms, dual frequency impact).
   */
  public playClick(volumeScale: number = 1.0): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Sharp lowpass filter to produce a crisp mechanical tap
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3200, t);
      filter.frequency.exponentialRampToValueAtTime(600, t + 0.035);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, t);
      osc.frequency.exponentialRampToValueAtTime(110, t + 0.035);

      const targetGain = 0.065 * Math.min(Math.max(volumeScale, 0.1), 2.0);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(targetGain, t + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain || ctx.destination);

      osc.start(t);
      osc.stop(t + 0.038);
    } catch {
      // Ignore
    }
  }

  /**
   * Ascending harmonic chime for successful actions, checkouts, and copy triggers.
   */
  public playSuccess(volumeScale: number = 1.0): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const notes = [587.33, 880.0, 1174.66]; // D5, A5, D6 chord
      const targetGain = 0.05 * Math.min(Math.max(volumeScale, 0.1), 2.0);

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = t + idx * 0.05;
        const noteDuration = 0.22;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.linearRampToValueAtTime(targetGain, noteStart + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);

        osc.connect(gain);
        gain.connect(this.masterGain || ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + noteDuration + 0.01);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Tactile notch sound for tab switching and filter pills (~400Hz).
   */
  public playTab(volumeScale: number = 1.0): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, t);
      osc.frequency.exponentialRampToValueAtTime(280, t + 0.03);

      const targetGain = 0.045 * Math.min(Math.max(volumeScale, 0.1), 2.0);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(targetGain, t + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain || ctx.destination);

      osc.start(t);
      osc.stop(t + 0.035);
    } catch {
      // Ignore
    }
  }

  /**
   * Soft modal open transition swell.
   */
  public playModalOpen(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(560, t + 0.06);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.04, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain || ctx.destination);

      osc.start(t);
      osc.stop(t + 0.065);
    } catch {
      // Ignore
    }
  }
}

export const soundEngine = SoundEngine.getInstance();

// Convenience helper exports
export const playHoverSound = (volumeScale?: number) => soundEngine.playHover(volumeScale);
export const playClickSound = (volumeScale?: number) => soundEngine.playClick(volumeScale);
export const playSuccessSound = (volumeScale?: number) => soundEngine.playSuccess(volumeScale);
export const playTabSound = (volumeScale?: number) => soundEngine.playTab(volumeScale);
export const playModalOpenSound = () => soundEngine.playModalOpen();
export const toggleSoundEffects = () => soundEngine.toggle();
export const isSoundEffectsEnabled = () => soundEngine.getIsEnabled();
export const setSoundEffectsEnabled = (enabled: boolean) => soundEngine.setEnabled(enabled);
