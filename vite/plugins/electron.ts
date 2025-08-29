import electron from "vite-plugin-electron/simple";
export default (path: any, env: any, isBuild: any, isServe: any) => {
	return electron({
		main: {
			// Shortcut of `build.lib.entry`.
			entry: path.join(__dirname, "../../electron/main.ts"),
		},
		preload: {
			// Shortcut of `build.rollupOptions.input`.
			// Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
			input: path.join(__dirname, "../../electron/preload.ts"),
		},
		// Ployfill the Electron and Node.js API for Renderer process.
		// If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
		// See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
		renderer: env.NODE_ENV === "test" ? undefined : {},
	});
};
