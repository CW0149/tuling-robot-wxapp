const wechat = require('co-wechat');
const WechatAPI = require('co-wechat-api');

module.exports = options => {
  	return wechat(options).middleware(async (message, ctx, next) => {
  		/*
  		 因为微信需要return所以可以不用asyn，但是为了避免不必要问题还是需要用
		 若非解析，不会执行下面操作
		 nginx会将经过80端口所有路径的请求都转发过来并且路径一致
  		  */

  		ctx.wxMessage = message;
  		await next();

  		return ''; // 回复空字微信避免三次重发
	 });

};