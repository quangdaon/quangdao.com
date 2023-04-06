import { browser } from '$app/environment';
import Plausible from 'plausible-tracker';

// TODO: Plausible breaks build, so this is a (hopefully temporary) workaround
export const plausible = browser
	? Plausible({
			trackLocalhost: true,
			domain: 'quangdao.com-test'
	  })
	: {
			trackEvent: () => {},
			trackPageview: () => {},
			enableAutoPageviews: () => {},
			enableAutoOutboundTracking: () => {}
	  };
