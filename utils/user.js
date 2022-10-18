/**
 * 用户相关服务
 */
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
      //登录远程服务器
      util.request('http://r6m59y.natappfree.cc/wx/auth/login_by_weixin', {
        code: res.code,
        userInfo: userInfo
      }, 'POST').then(res => {
        if (res.errno === 0) {
          //存储用户信息
          uni.setStorageSync('userInfo', res.data.userInfo);
          uni.setStorageSync('token', res.data.token);

          resolve(res);
        } else {
          reject(res);
        }
      }).catch((err) => {
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