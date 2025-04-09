import { browser } from '$app/environment';
import { PUBLIC_TRACKING_DOMAIN } from '$env/static/public';
import Plausible from 'plausible-tracker';

class TrackingService {
  plausible?: ReturnType<typeof Plausible>;

  start() {
    if (!browser || !PUBLIC_TRACKING_DOMAIN) return;

    this.plausible = Plausible({
      domain: PUBLIC_TRACKING_DOMAIN
    });

    this.plausible.enableAutoPageviews();
  }

  track(evt: string, s?: any) {
    if (!this.plausible) return;
    this.plausible.trackEvent(evt, s);
  } 
}

export const tracker = new TrackingService();