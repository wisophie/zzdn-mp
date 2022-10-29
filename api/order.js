const http = uni.$u.http

/** 订单列表 */
export const getOrderApi = (params = {}) =>
  http.get('/wx/order/list', {
    params
  })

/** 创建订单*/
export const createApi = (data = {}) => http.post('/wx/order/submit', data)
