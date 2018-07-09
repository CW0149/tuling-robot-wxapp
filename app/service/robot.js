'use strict';

const Service = require('egg').Service;
const fs = require('fs');

const msgTypeMap = {
	text: {
		value: 0,
		wxApiMethod: 'sendText'
	},
	image: {
		value: 1,
		wxApiMethod: 'sendImage'
	},
	voice: {
		value: 2,
		wxApiMethod: 'sendVoice'
	} // 未认证小程序不支持
};

class Robot extends Service {
	createRequest(message) {
		const { config, ctx } = this;

		ctx.logger.info(`来自 ${message.FromUserName} ${message.Content || message.MediaId}`);

		if (!msgTypeMap[message.MsgType]) return;

		const data = {
			reqType: msgTypeMap[message.MsgType].value,
			perception: {},
			userInfo: {
				apiKey: config.robot.apiKey,
				userId: message.FromUserName
			}
		};
		const { perception } = data;
		switch (data.reqType) {
			case 1:
				perception.inputImage = { url: message.MediaId };
				break;
			default:
				perception.inputText = { text: message.Content || '' };

		}

		return [ data, message ];

	}

	sendRequest(data, wxMsg) {
		const { ctx, app } = this;
		const { wechatApi } = app;
		const url = this.config.robot.apiUrl;

		const request = ctx.curl(url, {
		      method: 'POST',
		      contentType: 'json',
		      data,
		      // 明确告诉 HttpClient 以 JSON 格式处理响应 body
		      dataType: 'json',
		    });

		request
			.then(res => {
				const { results } = res.data;
				console.log(results);
				results.forEach(result => {
					try {
						const type = msgTypeMap[result.resultType] || {};
						const values = result.values;

						const method = type.wxApiMethod || 'sendText';
						let data = result.values.url || result.values.text || result.values.image;

						if (result.resultType === 'image') {
							const imageUrl = result.values.image;
							ctx.service.image.save(imageUrl, (filepath, name) => {
								wechatApi.uploadMedia(filepath, 'image', name)
									.then((buffer) => {
										fs.unlink(filepath, _=>{});

										const data = JSON.parse(buffer.toString());
										wechatApi[method](wxMsg.FromUserName, data.media_id)
											.catch(err => {
												ctx.logger.error(new Error(err));
											});
									});
							});
						} else {	
							if (!data) return;		
							wechatApi[method](wxMsg.FromUserName, data)
								.catch(err => {
									ctx.logger.error(new Error(err));
								});
						}
					} catch (err) {
						ctx.logger.error(new Error(err));
					}
				});

			});

	}

}

module.exports = Robot;