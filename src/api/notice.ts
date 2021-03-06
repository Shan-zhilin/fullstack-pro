/*
 * @Author: shanzhilin
 * @Date: 2022-04-06 22:25:30
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-05-05 21:45:06
 */
import request from '../util/request';

// 获取通知列表
export async function getAllNotice(data:any) {
    return await request('/notice/getAllNotice', {
		method: 'get',
		data
	});
}
// 删除通知
export async function deleteNotice(data:any) {
	return await request('/notice/deleteNotice', {
		method: 'get',
		data
	});
}

// 获取阅读通知的人数
export async function getAllRead(data:any) {
	return await request('/notice/getReadNum', {
		method: 'post',
		data
	});
}

// 阅读通知
export async function readNotice(data:any) {
	return await request('/notice/read', {
		method: 'post',
		data
	});
}

// 添加通知
export async function addNotice(data:any) {
	return await request('/notice/add', {
		method: 'post',
		data
	});
}