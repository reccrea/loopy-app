import '@/style/index.less';

import App from '.@/App.vue';

import { createApp } from 'vue';

import { initStores } from './stores';

const app = createApp(App);

app.mount('#app');

const bootstrap = async () => {
	const app = createApp(App);

	// 配置 store
	initStores(app);
};
