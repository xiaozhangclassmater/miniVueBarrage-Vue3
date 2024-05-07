import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount("#app")
