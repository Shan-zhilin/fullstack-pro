/*
 * @Author: shanzhilin
 * @Date: 2022-03-26 15:03:26
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-04 00:11:40
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

// 获取学生 或 教师的列表信息
export async function getUsersByTypePage(data:any) {
	return await request('/users/getUsersByTypePage',{
		method: 'get',
		data
	})
}

// 删除学生 或 教师
export async function deleteUser(data:any) {
	return await request('/users/delUserdata',{
		method: 'get',
		data
	})
}
// 修改用户信息
export async function updateUserInfo(data:any) {
	return await request('/users/upUserdata',{
		method: 'post',
		data
	})
}


