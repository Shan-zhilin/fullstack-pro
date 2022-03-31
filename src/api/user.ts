/*
 * @Author: shanzhilin
 * @Date: 2022-03-26 15:03:26
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-03-31 16:22:31
 */
import request from '../util/request';

//用户登录
export async function userLogin(data: any) {
	return await request('/login', {
		method: 'post',
		data
	});
}

// 根据token登录token获取用户信息
export async function getUserDataByToken(data:any) {
	return await request('/users/getUserDataByToken',{
		method: 'get',
		data
	})
}
