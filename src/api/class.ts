/*
 * @Author: shanzhilin
 * @Date: 2022-04-14 22:41:06
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-14 22:43:27
 */
import request from '../util/request';

// 查询班级列表
export async function getClassList(data: any) {
    return await request('/class/getclsses', {
		method: 'get',
		data
	});
}

// 删除班级
export async function deleteClass(data: any) {
    return await request('/class/deleteClass', {
		method: 'post',
		data
	});
}
