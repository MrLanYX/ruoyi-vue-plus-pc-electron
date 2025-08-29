import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

import createUnoCss from "./unocss";
import electron from "./electron";
import createAutoImport from "./auto-import";
import createComponents from "./components";
import createIcons from "./icons";
import createSvgIconsPlugin from "./svg-icon";
import createCompression from "./compression";
import createSetupExtend from "./setup-extend";
import path from "path";

export default (
	mode: any,
	viteEnv: any,
	isBuild = false,
	isServe = false
): [] => {
	const vitePlugins: any = [];
	vitePlugins.push(vue());
	if (mode !== "web")
		vitePlugins.push(electron(path, viteEnv, isBuild, isServe));
	vitePlugins.push(vueDevTools());
	vitePlugins.push(createUnoCss());
	vitePlugins.push(createAutoImport(path));
	vitePlugins.push(createComponents(path));
	vitePlugins.push(createCompression(viteEnv));
	vitePlugins.push(createIcons());
	vitePlugins.push(createSvgIconsPlugin(path));
	vitePlugins.push(createSetupExtend());
	return vitePlugins;
};
