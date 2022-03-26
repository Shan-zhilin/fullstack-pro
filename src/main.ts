import { createApp } from 'vue';
import App from './App.vue';
import router from './route/index'
const app = createApp(App)

// 使用路由
app.use(router)

// 挂载
app.mount('#app');
