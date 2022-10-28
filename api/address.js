const http = uni.$u.http

// 获取省市区列表
export const regionList = (params = {}) =>
  http.get('wx/region/list', {
    params
  })

// 根据id查询指定的市区
export const regionQueryByPid = (params = {}) =>
  http.get('wx/region/queryByPid', {
    params
  })

// 添加或者更新用户收货地址
export const addressSave = (data = {}) =>
  http.post('wx/address/save', data, {
    custom: {
      auth: true
    }
  })

// 用户收货地址列表
export const addressList = (params = {}) =>
  http.get('wx/address/list', {
    params,
    custom: {
      auth: true
    }
  })

// 删除用户的某个收货地址
export const addressDelete = (data = {}) =>
  http.post('wx/address/delete', data, {
    custom: {
      auth: true
    }
  })

// 请求用户的收货地址详情
export const addressDetail = (params = {}) =>
  http.get('wx/address/detail', {
    params,
    custom: {
      auth: true
    }
  })