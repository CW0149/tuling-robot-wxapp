'use strict';

const Controller = require('egg').Controller;
const url = require('url');
const wechatApi = require('co-wechat')


class HomeController extends Controller {
  index() {
  	const { ctx } = this;
  	ctx.body = 'hello';
  }

  wechat() { // 微信消息专供
  	const { ctx } = this;
  	const { robot } = ctx.service;

  	if (ctx.wxMessage.MsgType === 'event') return;
  	const request = robot.createRequest(ctx.wxMessage);
  	robot.sendRequest(...request);
  }
}

module.exports = HomeController;
