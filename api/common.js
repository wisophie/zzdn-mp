const http = uni.$u.http

/** 文件上传 */
export const uploadApi = (path, type = null) => {
  const formData = {}
  if (type) formData['type'] = type
  http.upload('/wx/storage/create', {
    filePath: path,
    name: 'file',
    formData
  })
}

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
