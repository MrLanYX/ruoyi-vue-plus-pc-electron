# ruoyi-vue-plus-pc-electron

本项目是基于 [ruoyi-vue-plus](https://gitee.com/zhangmrit/ruoyi-vue-plus) 官方前端，使用 Electron 进行改写，实现了桌面端应用。适用于需要将 ruoyi-vue-plus 前端以桌面程序形式运行，也可以打包成原本的web。

## 运行脚本（npm）

```bash
# 安装依赖
npm install

# 启动开发环境，包含桌面和web
npm run dev

# 使用部署环境打包桌面应用
npm run build:pc-prod

# 使用部署环境打包WEB应用
npm build:web-prod