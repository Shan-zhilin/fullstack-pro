const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
module.exports = {
	outputDir: 'dist', //build输出目录
	assetsDir: 'assets', //静态资源目录（js, css, img）
	lintOnSave: false, //是否开启eslint
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: []
		}
	},
	devServer: {
		open: true, //是否自动弹出浏览器页面
		host: 'localhost', //表示启动的时候使用的域名，默认可以不写，则是使用localhost和本机IP
		port: '8080', // 设置端口号
		https: false, //是否使用https协议
		hotOnly: true, //是否开启热更新
		proxy: {
			'/api': {
				target: 'http://localhost:3000', //API服务器的地址
				changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
	configureWebpack: {
		plugins: [
			AutoImport({
				resolvers: [ElementPlusResolver()]
			}),
			Components({
				resolvers: [ElementPlusResolver()]
			})
		]
	}
};
