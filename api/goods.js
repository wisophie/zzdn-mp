const http = uni.$u.http

/** 商品分类 */
export const getCateApi = (params = {}) =>
  http.get('/wx/category/list', {
    params
  })

  /** 商品分类 */
export const getListApi = (params = {}) =>
http.get('/wx/goods/list', {
  params
})

// 注册接口
export const register = (data = {}) =>
  http.post('/wx/category/list  ', data, {
    custom: {
      auth: false
    }
  })