/*
 * @Author: shanzhilin
 * @Date: 2022-03-25 16:15:00
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-03-29 17:40:08
 */
import { createApp } from 'vue';
import 'element-plus/theme-chalk/index.css';
import App from './App.vue';
import router from './route/index'
const app = createApp(App)

// 使用路由
app.use(router)

// 挂载
app.mount('#app');
