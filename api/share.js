const http = uni.$u.http

/** 共享列表 */
export const getShareApi = (params = {}) =>
  http.get('/wx/share/goods/list', {
    params
  })

/** 上传共享商品*/
export const createShare = (data = {}) => http.post('/wx/share/goods/create', data, {
    custom: {
      auth: true
    }
  })

/** 编辑共享商品*/
export const editShare = (data = {}) => http.post('/wx/share/goods/update', data, {
    custom: {
      auth: true
    }
  })
  
  /** 删除共享商品*/
  export const deleteShare = (data = {}) => http.post('/wx/share/goods/delete', data, {
      custom: {
        auth: true
      }
    })