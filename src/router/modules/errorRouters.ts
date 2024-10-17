import type { RouteRecordRaw } from 'vue-router';

export const errorRouter: RouteRecordRaw[] = [
	{
		// 解决刷新页面,route warnings
		path: '/:pathMatch(.*)*',
		component: () => import('@/components/ErrorMessage/404.vue')
	}
];
