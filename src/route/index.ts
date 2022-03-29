/*
 * @Author: shanzhilin
 * @Date: 2022-03-26 14:44:43
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-03-29 22:33:20
 */
import { createRouter, createWebHashHistory } from 'vue-router';
const login = () => import('../pages/Login.vue');
const home = () => import('../pages/Home.vue');
const studentHome = () => import('../components/StudentHome.vue');
const board = () => import('@/components/Board.vue');
const routes = [
	{ path: '/', redirect: '/login' },
	{ path: '/login', component: login },
	{
		path: '/home',
		component: home,
        redirect: '/home/board',
		children: [
			{ path: '/home/board', component: board },
			{ path: '/student/home', component: studentHome }
		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});
export default router;
