'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531027612051_9019';

  // add your config here
  config.middleware = [];

  config.security = {
  	csrf: {
    	enable: false,
  	}
  };

  config.wxMessage = { // 小程序开发设置页面信息
  	token: '',
  	appid: '',
  	encodingAESKey: ''
  };

  config.wxapp = { // 小程序信息
    appid: '',
    appSecret: ''
  };

  config.robot = {
    apiKey: '', // 图灵机器人apiKey
    apiUrl: 'http://openapi.tuling123.com/openapi/api/v2'
  };

  return config;
};
