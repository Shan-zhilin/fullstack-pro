/*
 * @Author: shanzhilin
 * @Date: 2022-04-29 23:47:32
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-29 23:51:51
 */
import request from '../util/request';
//用户登录
export async function createHealthyApply(data: any) {
	return await request('/healthy/create', {
		method: 'post',
		data
	});
}