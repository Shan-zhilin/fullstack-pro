/*
 * @Author: shanzhilin
 * @Date: 2022-04-06 22:25:30
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-06 22:26:31
 */
import request from '../util/request';

// 获取通知列表
export async function getAllNotice(data:any) {
    return await request('/notice/getAllNotice', {
		method: 'get',
		data
	});
}
