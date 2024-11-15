import * as Sentry from '@sentry/vue';
import { type App } from 'vue';

export const setupSentry = (app: App) => {
	Sentry.init({
		app,
		// 确保该地址填写正确，指向搭建的 Sentry 服务器，在 Sentry 后台管理页的配置指南页中有给出
		dsn: 'https://3aeb332c877772ad0df2a439e43e7fc4@o4508278619176960.ingest.us.sentry.io/4508299930959872',
		integrations: [],
		// 监控采样率（1.0 表示 100% 采样)
		tracesSampleRate: 1.0
	});
};
