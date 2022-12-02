const http = uni.$u.http

/** 查询跑腿任务列表 */
export const getHelplist = (params = {}) =>
  http.get('/wx/errand/order/list', {
    params
  })
  
/** 订单详情 */
export const getHelpDetail = (params = {}) =>
  http.get('/wx/errand/order/detail', {
    params
  })

/** 发布跑腿订单需求*/
export const createHelp = (data = {}) => http.post('/wx/errand/order/create', data, {
    custom: {
      auth: true
    }
  })
/** 更新跑腿订单*/
export const updateHelp = (data = {}) => http.post('/wx/errand/order/update', data, {
    custom: {
      auth: true
    }
  })

/** 接单*/
export const takeHelp = (data = {}) => http.post('/wx/errand/order/takeOrder', data, {
    custom: {
      auth: true
    }
  })
  
  /** 结束订单*/
  export const fulfillHelp = (data = {}) => http.post('/wx/errand/order/overOrder', data, {
      custom: {
        auth: true
      }
    })
	
	/** 取消接单*/
	export const cancelTakeOrder = (data = {}) => http.post('/wx/errand/order/cancelTakeOrder', data, {
	    custom: {
	      auth: true
	    }
	  })
	/** 发布人同意订单完成*/
	export const agreeHelp = (data = {}) => http.post('/wx/errand/order/agreeOverOrder', data, {
	    custom: {
	      auth: true
	    }
	  })
  /** 取消订单或者不认同订单完成*/
  export const unAgreeHelp = (data = {}) => http.post('/wx/errand/order/cancel', data, {
	  custom: {
		auth: true
	  }
	})