/*
 * @Author: shanzhilin
 * @Date: 2022-04-06 22:25:30
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-07 22:46:39
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
