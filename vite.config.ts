import { defineConfig, loadEnv } from "vite";
import createPlugins from "./vite/plugins";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
	const env = loadEnv(mode, process.cwd());
	return {
		// 部署生产环境和开发环境下的URL。
		// 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
		// 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
				"@store": path.resolve(__dirname, "./src/store/modules"),
				"@api": path.resolve(__dirname, "./src/api"),
				"@globel": path.resolve(__dirname, "./globel"),
			},
			extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
		},
		// https://cn.vitejs.dev/config/#resolve-extensions
		plugins: createPlugins(
			mode,
			env,
			command === "build",
			command === "serve"
		),
		server:
			command === "serve" &&
			(() => {
				return {
					host: "0.0.0.0",
					port: env.VITE_APP_PORT,
					open: true,
					proxy: {
						[env.VITE_APP_BASE_API]: {
							target: "http://localhost:8080",
							changeOrigin: true,
							ws: true,
							rewrite: (path) =>
								path.replace(
									new RegExp("^" + env.VITE_APP_BASE_API),
									""
								),
						},
					},
				};
			})(),
		// 预编译
		optimizeDeps: {
			include: [
				"vue",
				"vue-router",
				"pinia",
				"axios",
				"@vueuse/core",
				"echarts",
				"vue-i18n",
				"@vueup/vue-quill",
				"image-conversion",
				"element-plus/es/components/**/css",
			],
		},
	};
});
