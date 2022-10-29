const http = uni.$u.http

// 重置手机号
export const resetPhone = (data = {}) =>
  http.post('wx/auth/resetPhone', data, {
    custom: {
      auth: true
    }
  })

// 添加或更新实名信息
export const certifySave = (data = {}) =>
  http.post('wx/certify/save', data, {
    custom: {
      auth: true
    }
  })

// 个人实名信息
export const certifyDetail = (params = {}) =>
  http.get('wx/certify/detail', {
    params,
    custom: {
      auth: true
    }
  })