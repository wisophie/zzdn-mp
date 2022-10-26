const http = uni.$u.http

// 重置手机号
export const resetPhone = (data = {}) =>
  http.post('wx/auth/resetPhone', data, {
    custom: {
      auth: true
    }
  })

// 上传图片
export const uploadImg = (data = {}) =>
  http.post('wx/storage/create', data, {
    custom: {
      auth: true,
      contentType: 'application/x-www-form-urlencoded'
    }
  })