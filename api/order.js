const http = uni.$u.http

/** 订单列表 */
export const getOrderApi = (params = {}) =>
  http.get('/wx/order/list', {
    params
  })
