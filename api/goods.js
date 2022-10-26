const http = uni.$u.http

/** 商品分类 */
export const getCateApi = (params = {}) =>
  http.get('/wx/category/list', {
    params
  })

/** 商品列表*/
export const getListApi = (params = {}) =>
  http.get('/wx/goods/list', {
    params,
    custom: {
      auth: false
    }
  })

/** 商品列表 自己的*/
export const getListApi1 = (params = {}) =>
  http.get('/wx/goods/list', {
    params
  })

/** 商品详情*/
export const getInfoApi = (params = {}) =>
  http.get('/wx/goods/detail', {
    params
  })

/** 删除商品*/
export const removeById = (data = {}) => http.post('/wx/goods/delete ', data)

/** 上传商品*/
export const createApi = (data = {}) => http.post('/wx/goods/create', data)

/** 编辑商品*/
export const updateApi = (data = {}) => http.post('/wx/goods/update', data)

/** 供货商入驻 */
export const applyApi = (data = {}) => http.post('/wx/provider/apply ', data)
