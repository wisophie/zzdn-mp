const http = uni.$u.http

/** 不需要token => post  需要token则删除 auth:true */

// 微信登录
export const weixinLogin = (data = {}) =>
  http.post('wx/auth/login_by_weixin', data, {
    custom: {
      auth: false
    }
  })

// 注册接口
export const register = (data = {}) =>
  http.post('wx/auth/register', data, {
    custom: {
      auth: false
    }
  })

// 注册获取验证码
export const regCaptcha = (data = {}) =>
  http.post('wx/auth/regCaptcha', data, {
    custom: {
      auth: false
    }
  })

// 账号密码登录
export const loginByAccount = (data = {}) =>
  http.post('wx/auth/login', data, {
    custom: {
      auth: false
    }
  })

// 账号密码登录
export const bindPhone = (data = {}) =>
  http.post('wx/auth/bindPhone', data, {
    custom: {
      auth: true
    }
  })