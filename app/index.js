'use strict';

const WechatApi = require('co-wechat-api');

module.exports = app => {
	const wxappConfig = app.config.wxapp;
	app.wechatApi = new WechatApi(wxappConfig.appid, wxappConfig.appSecret);
}
