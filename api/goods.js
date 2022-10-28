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

/** 采购商入驻 */
export const buyerApply = (data = {}) => http.post('/wx/buyer/apply', data)

/** 采购商资料变更 */
export const buyerUpdate = (data = {}) => http.post('/wx/buyer/update', data)

/** 发布采购需求 */
export const buyNeedCreate = (data = {}) => http.post('/wx/buyer/buyNeed/create', data)

/** 编辑采购需求 */
export const buyNeedUpdate = (data = {}) => http.post('/wx/buyer/buyNeed/update', data)

/** 删除采购需求 */
export const buyNeedDelete = (data = {}) => http.post('/wx/buyer/buyNeed/delete/delete', data)

/** 采购需求列表 */
export const buyNeedList = (params = {}) =>
  http.get('/wx/buyer/buyNeed/list', {
    params
  })

/** 采购需求详情 */
export const buyNeedDetail = (params = {}) =>
  http.get('/wx/buyer/buyNeed/detail', {
    params
  })