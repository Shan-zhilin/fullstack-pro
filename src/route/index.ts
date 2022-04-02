/*
 * @Author: shanzhilin
 * @Date: 2022-03-26 14:44:43
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-01 17:43:32
 */
import { createRouter, createWebHashHistory } from 'vue-router';
const login = () => import('../pages/Login.vue');
const home = () => import('../pages/Home.vue');
const board = () => import('@/components/Board.vue');
const studentHome = () => import('@/pages/StudentHome.vue');
const teacherHome = () => import('@/pages/TeacherHome.vue')
const routes = [
	{ path: '/', redirect: '/home' },
	{ path: '/login', component: login },
	{
		path: '/home',
		component: home,
        redirect: '/home/board', //默认重定向到/home/board
		children: [
			{ path: '/home/board', component: board },
			{ path: '/student/home', component: studentHome },
			{ path: '/teacher/home', component: teacherHome }
		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});
export default router;
