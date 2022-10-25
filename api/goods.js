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

/** 供货商入驻 */
export const applyApi = (data = {}) => http.post('/wx/provider/apply  ', data)
