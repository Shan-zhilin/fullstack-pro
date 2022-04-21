import axios from 'axios';
import router from '../route/index';
import { ElMessage } from 'element-plus/lib/components';

const HOST_URL = location.protocol + '//' + location.host + '/api';

// axios 请求拦截器处理请求数据
axios.interceptors.request.use((config: any) => {
	const token = window.localStorage.getItem('token');
	config.headers.common['Authorization'] = 'Bearer ' + token; // 留意这里的 Authorization
	config.headers.common['Content-Type'] =
		'application/json;multipart/form-data;text/plain; charset=utf-8';
	return config;
});

// axios 响应拦截器
axios.interceptors.response.use(
	response => {
		// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
		// 否则的话抛出错误
		if (response.status === 200) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	// 服务器状态码不是2开头的的情况
	// 这里可以跟你们的后台开发人员协商好统一的错误状态码
	// 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
	// 下面列举几个常见的操作，其他需求可自行扩展
	error => {
		if (error.response.status) {
			switch (error.response.status) {
				// 401: token过期或者未登录时
				// 未登录则跳转登录页面，并携带当前页面的路径
				// 在登录成功后返回当前页面，这一步需要在登录页操作。
				case 401:
					ElMessage.error({
						message: '用户未登录或登录信息已过期'
					});
					localStorage.removeItem('token');
					router.replace('/login');
					setTimeout(() => {
						router.replace('/login');
					}, 1000);
					break;

				// 404请求不存在
				case 404:
					ElMessage.error({
						message: '页面不存在'
					});
					break;
				// 其他错误，直接抛出错误提示
				default:
					ElMessage.error({
						message: '请求错误'
					});
			}
			return Promise.reject(error.response);
		}
	}
);

const request = (
	url: string | string[],
	{
		method,
		data = {},
		response = 'json' //文件传输需要替换格式
	}: { method: string, data: any, response?: any }
) => {
	return new Promise((resolve, reject) => {
		url = HOST_URL + url;
		if (url.indexOf('?') < 0) {
			url += '?_dt=' + Math.random();
		}

		if (data && typeof data === 'object' && (method === 'get' || method === 'delete')) {
			for (const k in data) {
				// eslint-disable-next-line no-prototype-builtins
				if (data.hasOwnProperty(k)) {
					if (k === 'key' && (data[k] || '').indexOf("'") >= 0) {
						data[k] = data[k].replace(/\/'/g, '');
					}
					url += '&' + k + '=' + data[k];
				}
			}
		}
		let result;
		if (method === 'get') {
			result = axios.get(url, { responseType: response });
		} else if (method === 'delete') {
			result = axios.delete(url);
		} else if (method === 'post') {
			result = axios.post(url, data);
		} else if (method === 'put') {
			result = axios.put(url, data);
		}

		result?.then(
			r => {
				resolve(r.data);
			},
			r => {
				reject(r.data);
			}
		);
	});
};

export default request;
