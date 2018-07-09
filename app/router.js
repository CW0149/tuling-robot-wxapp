'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware, config } = app;

  const wxMessage = middleware.wxMessage(config.wxMessage);

  router.get('/', controller.home.index);
  router.post('/wechat', wxMessage, controller.home.wechat);
};
