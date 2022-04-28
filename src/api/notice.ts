/*
 * @Author: shanzhilin
 * @Date: 2022-04-06 22:25:30
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-28 21:46:31
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
		method: 'get',
		data
	});
}
