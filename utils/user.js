/**
 * 用户相关服务
 */
import { weixinLogin } from '@/api/login'
const util = require('../utils/util.js');

export const isAndroid = uni.getSystemInfoSync().platform === 'android'

/**
 * Promise封装wx.checkSession
 */
function checkSession() {
  return new Promise(function(resolve, reject) {
    if (uni.checkSession) {
      uni.checkSession({
        success: function() {
          resolve(true);
        },
        fail: function() {
          reject(false);
        }
      })
    } else {
      resolve(true)
    }
  });
}

/**
 * Promise封装wx.login
 */
function login() {
  return new Promise(function(resolve, reject) {
    uni.login({
      provider: 'weixin',
      onlyAuthorize: true,
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

function getUserInfo() {
  return new Promise(resolve => {
    uni.getUserInfo({
      provider: 'weixin',
      success: function(info) {
      // 获取用户信息成功, info.authResult保存用户信息
        resolve(info)
      },
      fail: err => {
        console.log(err, 'err--')
      }
    })
  })
}

/**
 * 调用微信登录
 */
function loginByWeixin(userInfo) {

  return new Promise(function(resolve, reject) {
    return login().then(async(res) => {
      if (isAndroid) {
        userInfo = await getUserInfo()
      }
      console.log(res, userInfo, 'uniloginres')
      weixinLogin({
        code: res.code,
        userInfo: userInfo,
				loginChannel: isAndroid ? 'APP' : 'MA'
      }).then(res => {
				console.log('登录成功：', res)
        if (res.errno === 0) {
          //存储用户信息
          uni.setStorageSync('userInfo', res.data.userInfo);
          uni.setStorageSync('token', res.data.token);
          
          resolve(res);
        } else {
          reject(res);
        }
      }).catch((err) => {
				console.log('登录失败：', err)
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
    if (uni.getStorageSync('userInfo') && uni.getStorageSync('token')) {
      checkSession().then(() => {
        console.log('gg')
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
  isAndroid
};