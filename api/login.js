// 登录与个人信息相关接口

const http = uni.$u.http

/** 不需要token => post  需要token则删除 auth:true */

// 微信登录
export const weixinLogin = (data = {}) =>
  http.post('wx/auth/login_by_weixin', data, {
    custom: {
      auth: false
    }
  })

// 退出登录
export const logout = (data = {}) =>
  http.post('wx/auth/logout', data, {
    custom: {
      auth: true
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

// 账号密码重置
export const resetPwd = (data = {}) =>
  http.post('wx/auth/reset', data, {
    custom: {
      auth: true
    }
  })

// 账号信息更新
export const updateInfo = (data = {}) =>
  http.post('wx/auth/profile', data, {
    custom: {
      auth: true
    }
  })

// 请求验证码
export const captcha = (data = {}) =>
  http.post('wx/auth/captcha', data, {
    custom: {
      auth: false
    }
  })

// 获取个人信息
export const fetchUserInfo = (params = {}) =>
  http.get('wx/auth/info', {
    params,
    custom: {
      auth: true
    }
  })
// export const fetchUserInfo = (data = {}) =>
//   http.post('wx/auth/info', data, {
//     custom: {
//       auth: true
//     }
//   })

// 