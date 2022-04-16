/*
 * @Author: shanzhilin
 * @Date: 2022-03-26 14:44:43
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-16 16:44:43
 */
import { createRouter, createWebHashHistory } from 'vue-router';
const login = () => import('../pages/Login.vue');
const home = () => import('../pages/Home.vue');
const board = () => import('@/components/Board.vue');
const studentHome = () => import('@/pages/StudentHome.vue');
const teacherHome = () => import('@/pages/TeacherHome.vue');
const noticedHome = () => import('@/pages/Noticed.vue');
const classHome = () => import('@/pages/Classes.vue');
const userInfo = () => import('@/components/UserInfo.vue');


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
			{ path: '/teacher/home', component: teacherHome },
			{ path: '/notice', component: noticedHome },
			{ path: '/classes', component: classHome },
			{ path: '/userinfo',name: 'UserInfo', component: userInfo },
		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});
export default router;
