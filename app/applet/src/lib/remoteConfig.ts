// Firebase-style Remote Config simulation for Web & Mobile parity
// Matches remoteConfig.setDefaultsAsync and fetchAndActivate pattern requested

export interface RemoteConfigDefaults {
  [key: string]: string | number | boolean;
}

class WebRemoteConfig {
  private static instance: WebRemoteConfig;
  private defaults: RemoteConfigDefaults = {
    cta_button_color: 'blue',
    hero_badge_text: 'Verified Digital Goods & Payments',
    flash_sale_active: true,
    max_discount_percentage: 88,
  };
  private values: RemoteConfigDefaults = {};
  private fetchIntervalMs: number = 3600000; // 1 hour

  private constructor() {
    // Load cached values from localStorage if available
    try {
      const cached = localStorage.getItem('wka_remote_config');
      if (cached) {
        this.values = JSON.parse(cached);
      }
    } catch (e) {
      console.error('Failed to load remote config cache', e);
    }
  }

  public static getInstance(): WebRemoteConfig {
    if (!WebRemoteConfig.instance) {
      WebRemoteConfig.instance = new WebRemoteConfig();
    }
    return WebRemoteConfig.instance;
  }

  public setDefaultsAsync(defaults: RemoteConfigDefaults): Promise<void> {
    return new Promise((resolve) => {
      this.defaults = { ...this.defaults, ...defaults };
      resolve();
    });
  }

  public async fetchAndActivate(): Promise<boolean> {
    try {
      // Simulate network fetch from Firebase Remote Config backend
      await new Promise((res) => setTimeout(res, 300));
      
      // In a real app, this fetches from Firebase. Here we sync with localStorage / Admin overrides
      const adminOverride = localStorage.getItem('wka_admin_remote_config');
      if (adminOverride) {
        const parsed = JSON.parse(adminOverride);
        this.values = { ...this.defaults, ...parsed };
      } else {
        this.values = { ...this.defaults, ...this.values };
      }
      
      localStorage.setItem('wka_remote_config', JSON.stringify(this.values));
      return true;
    } catch (e) {
      console.error('fetchAndActivate failed', e);
      return false;
    }
  }

  public getString(key: string): string {
    if (this.values[key] !== undefined) {
      return String(this.values[key]);
    }
    return String(this.defaults[key] || '');
  }

  public getBoolean(key: string): boolean {
    if (this.values[key] !== undefined) {
      return Boolean(this.values[key]);
    }
    return Boolean(this.defaults[key] || false);
  }

  public getNumber(key: string): number {
    if (this.values[key] !== undefined) {
      return Number(this.values[key]);
    }
    return Number(this.defaults[key] || 0);
  }

  public setParameter(key: string, value: string | number | boolean) {
    this.values[key] = value;
    localStorage.setItem('wka_remote_config', JSON.stringify(this.values));
    localStorage.setItem('wka_admin_remote_config', JSON.stringify(this.values));
  }
}

export const remoteConfig = WebRemoteConfig.getInstance();
