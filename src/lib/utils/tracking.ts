import { browser, dev } from '$app/environment';
import Plausible from 'plausible-tracker';

class TrackingService {
  plausible?: ReturnType<typeof Plausible>;

  constructor() {
  }

  start() {
    if (!browser || dev) return;

    this.plausible = Plausible({
      domain: 'quangdao.com-test'
    });

    this.plausible.enableAutoPageviews();
  }

  track(evt: string, s?: any) {
    if (!this.plausible) return;
    this.plausible.trackEvent(evt, s);
  } 
}

export const tracker = new TrackingService();