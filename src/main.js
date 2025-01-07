import { createApp } from "vue";
import App from "./App.vue";
import router from './router'
// 引入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入Element Plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 如果需要中文界面，引入中文语言包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入UnoCSS
import 'uno.css'

import '@/assets/dark/element.css'

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用路由和Element Plus
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount("#app");
