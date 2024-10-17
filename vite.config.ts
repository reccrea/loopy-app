import { type UserConfigExport, type ConfigEnv, loadEnv } from 'vite';
import { root, alias, wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/plugin';

export default ({ mode }: ConfigEnv): UserConfigExport => {
	const env = loadEnv(mode, root);
	const viteEnv = wrapperEnv(env);

	return {
		base: viteEnv.VITE_PUBLIC_PATH,
		root,
		resolve: {
			alias
		},
		server: {
			host: '0.0.0.0',
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true
		},
		plugins: createVitePlugins(viteEnv),
		build: {
			outDir: 'dist',
			minify: 'esbuild',
			sourcemap: false,
			// 禁用 gzip 压缩大小报告，可略微减少打包时间
			reportCompressedSize: false,
			// 消除打包大小超过500kb警告
			chunkSizeWarningLimit: 4000,
			rollupOptions: {
				// 静态资源分类打包
				output: {
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
				}
			}
		}
	};
};
