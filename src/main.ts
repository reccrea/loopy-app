import App from '.@/App.vue';
import { createApp } from 'vue';
import { setupStore } from '@/stores';
import { setupPlugins } from '@/plugins';
import { setupRouter, router } from '@/router';

import '@/styles/index.less';

const bootstrap = async () => {
	const app = createApp(App);

	// 配置 store
	setupStore(app);

	// 配置路由
	setupRouter(app);

	await router.isReady();

	// 配置插件
	setupPlugins(app);

	app.mount('#app');
};

bootstrap();
