const http = uni.$u.http

/** 文件上传 */
export const uploadApi = path =>
  http.upload('/upload', {
    filePath: path,
    name: 'file'
  })

/** get */
export const getDemo = (params = {}) =>
  http.get('api/rand.qinghua', {
    params
  })

/** 不需要token => post  需要token则删除 auth:true */
export const loginByPwd = (data = {}) =>
  http.post('api/rand.qinghua', data, {
    custom: {
      auth: false
    }
  })

/** 不需要token => get 需要token则删除 auth:true*/
export const noToken = params =>
  http.get('xxx', {
    params,
    custom: {
      auth: false
    }
  })
