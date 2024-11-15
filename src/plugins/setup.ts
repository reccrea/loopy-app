import type { App } from 'vue';

import { setupElementPlus, setupSentry } from './modules';

export const setupPlugins = (app: App) => {
	setupElementPlus(app);
	setupSentry(app);
};
