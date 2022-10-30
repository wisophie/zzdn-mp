const http = uni.$u.http

/** 订单列表 */
export const getOrderApi = (params = {}) =>
  http.get('/wx/order/list', {
    params
  })

/** 创建订单*/
export const createApi = (data = {}) => http.post('/wx/order/submit', data)

/** 订单详情 */
export const getOrderInfoApi = (params = {}) =>
  http.get('/wx/order/detail', {
    params
  })

/** 发起退款 */
export const refundApi = (data = {}) => http.post('/wx/order/applyRefund', data)

/** 发表评论 */
export const commentApi = (data = {}) => http.post('/wx/order/comment', data)

/** 确认收货 */
export const receiveApi = (data = {}) => http.post('/wx/order/confirm', data)

/** 取消订单 */
export const cancelApi = (data = {}) => http.post('/wx/order/cancel', data)

/** 删除订单 */
export const removeApi = (data = {}) => http.post('/wx/order/delete', data)

/** 同意退款 */
export const agreeApi = (data = {}) => http.post('/wx/order/agreeRefund', data)

/** 拒绝退款 */
export const refuseApi = (data = {}) => http.post('/wx/order/rejectRefund', data)

/** 发货 */
export const deliveryApi = (data = {}) => http.post('/wx/order/ship', data)

/** 申请售后 */
export const applyAfterSaleApi = (data = {}) => http.post('/wx/aftersale/submit', data)

/** 取消售后 */
export const cancelAfterSaleApi = (data = {}) => http.post('/wx/aftersale/cancel', data)

