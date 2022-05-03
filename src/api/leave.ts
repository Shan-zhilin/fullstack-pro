/*
 * @Author: shanzhilin
 * @Date: 2022-05-02 14:40:06
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-05-03 23:01:58
 */
import request from '../util/request';

//添加请假申请
export async function addLeave(data: any) {
	return await request('/leave/add', {
		method: 'post',
		data
	});
}

//查询请假信息
export async function getAllLeave(data: any) {
	return await request('/leave/getAllLeave', {
		method: 'post',
		data
	});
}

//审核请假信息
export async function checkLeave(data: any) {
	return await request('/leave/update', {
		method: 'get',
		data
	});
}