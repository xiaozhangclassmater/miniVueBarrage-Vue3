import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'normalize.css';
import { createApp } from 'vue';
import { miniVueBarrage } from '../dist/minivuebarrage';
import '../dist/minivuebarrage/lib/index.css';
import App from './App.vue';
import router from './router';
const app = createApp(App)
app.use(miniVueBarrage)
app.use(router)
app.use(ElementPlus)
app.mount("#app")
