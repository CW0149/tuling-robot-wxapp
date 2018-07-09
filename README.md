# Talk-bot

为小程序搭建的机器人服务，使用微信客服接口，机器人回答来自图灵机器人。回复格式支持文本、图片。

## 快速入门

### 如何使用
- 设置微信公众平台小程序消息推送服务器
- 小程序添加客服按钮
- 将config/config.default.example.js 改为config/config.default.js，并补全相应信息
- 更改安装的node_module/co-wechat/wechat.js middleware方法中`const body = await handle(formatted, ctx);` 为 `const body = await handle(formatted, ctx, next);`
- 运行程序


#### 需要的信息
	1. 小程序apiKey, apiSecret
	2. 微信公众平台小程序开发设置所填token, encodingAESKey


### 主要框架与库
-  [Egg](https://eggjs.org/)
- [co-wechat](https://github.com/node-webot/co-wechat)
- [co-wechat-api](https://github.com/node-webot/co-wechat-api)


### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```


### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。

## License
[MIT](LICENSE)

