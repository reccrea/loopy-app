import type { PluginOption } from 'vite';
import { cdn } from './cdn';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import removeConsole from 'vite-plugin-remove-console';

const createVitePlugins = (
	viteEnv: ViteEnv
): (PluginOption | PluginOption[])[] => {
	const { VITE_DEVTOOLS, VITE_REPORT, VITE_DROP_CONSOLE, VITE_CDN } = viteEnv;
	return [
		vue(),
		// vue 可以使用 jsx/tsx 语法
		vueJsx(),
		// devTools
		VITE_DEVTOOLS &&
			vueDevTools({
				launchEditor: 'code'
			}),
		// 打包压缩配置
		createCompression(viteEnv),
		// 是否生成包预览，分析依赖包大小做优化处理
		VITE_REPORT &&
			(visualizer({
				filename: 'stats.html',
				gzipSize: true,
				brotliSize: true
			}) as PluginOption),
		// 删除console
		VITE_DROP_CONSOLE &&
			removeConsole({
				external: ['src/assets/iconfont/iconfont.js']
			}),
		VITE_CDN ? cdn : null
	];
};

const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
	const {
		VITE_BUILD_COMPRESS = 'none',
		VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
	} = viteEnv;

	const compressList = VITE_BUILD_COMPRESS.split(',');

	const plugins: PluginOption[] = [];

	if (compressList.includes('gzip')) {
		plugins.push(
			viteCompression({
				ext: '.gz',
				algorithm: 'gzip',
				deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
			})
		);
	}
	if (compressList.includes('brotli')) {
		plugins.push(
			viteCompression({
				ext: '.br',
				algorithm: 'brotliCompress',
				deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
			})
		);
	}
	return plugins;
};

export { createVitePlugins };
