/**
 * 用户相关服务
 */
import { weixinLogin } from '@/api/login'
const util = require('../utils/util.js');


/**
 * Promise封装wx.checkSession
 */
function checkSession() {
  return new Promise(function(resolve, reject) {
    console.log('gg3')
    uni.checkSession({
      success: function() {
        console.log('gg4')
        resolve(true);
      },
      fail: function() {
        console.log('gg5')
        reject(false);
      }
    })
  });
}

/**
 * Promise封装wx.login
 */
function login() {
  return new Promise(function(resolve, reject) {
    uni.login({
      success: function(res) {
        if (res.code) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}

/**
 * 调用微信登录
 */
function loginByWeixin(userInfo) {

  return new Promise(function(resolve, reject) {
    return login().then((res) => {
      weixinLogin({
        code: res.code,
        userInfo: userInfo
      }).then(res => {
        if (res.errno === 0) {
          //存储用户信息
          uni.setStorageSync('userInfo', res.data.userInfo);
          uni.setStorageSync('token', res.data.token);

          resolve(res);
        } else {
          reject(res);
        }
      }).catch((err) => {
        console.log(err, '--gg123')
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function(resolve, reject) {
    console.log('gg1', uni.getStorageSync('userInfo') && uni.getStorageSync('token'))
    if (uni.getStorageSync('userInfo') && uni.getStorageSync('token')) {
      console.log('gg2')
      checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    } else {
      reject(false);
    }
  });
}

module.exports = {
  loginByWeixin,
  checkLogin,
};