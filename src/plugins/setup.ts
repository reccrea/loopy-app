import { type App } from 'vue';

import { loadElementPlus } from './modules';

export const setupPlugins = (app: App) => {
	loadElementPlus(app);
};
