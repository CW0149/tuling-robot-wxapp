'use strict';

const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');

class Image extends Service {
  save(url, callback) {
    const { ctx } = this;

    try {
      const urlArr = url.split('/');
      const name = urlArr[urlArr.length - 1];
      const filepath = path.resolve(__dirname, '../public/images/', name);

      ctx.curl(url, {
        writeStream: fs.createWriteStream(filepath),
      }).then(_ => {
        if (callback) callback(filepath, name);
      })


    } catch (err) {
      ctx.logger.error(new Error(err));
    }
  }
 
  convert(url, callback) { // 图文格式
    const data = {
       "title":"",
       "description":"来呀",
       "url":url,
       "thumb_url":url
    };
 
    if (callback) {
      callback(data);
    }
  }
}

module.exports = Image;