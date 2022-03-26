import AjaxPlugin from 'axios';

const HOST_URL = location.protocol + '//' + location.host + '/api';

const request = (
	url,
	{
		method,
		data = {},
		response = 'json' //文件传输需要替换格式
	}
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
		let ajaxResult;
		if (method === 'get') {
			ajaxResult = AjaxPlugin.get(url, { responseType: response });
		} else if (method === 'delete') {
			ajaxResult = AjaxPlugin.delete(url);
		} else if (method === 'post') {
			ajaxResult = AjaxPlugin.post(url, data);
		} else if (method === 'put') {
			ajaxResult = AjaxPlugin.put(url, data);
		}

		ajaxResult.then(
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
