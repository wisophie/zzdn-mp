module.exports = vm => {
  const baseURL = 'https://www.zhizaodainan.com/'
  uni.$u.http.setConfig(config => {
    config = Object.assign(config, {
      baseURL: baseURL,
      custom: {
        auth: true,
        toast: true
      }
    })
    return config
  })
  // 请求拦截
  uni.$u.http.interceptors.request.use(
    config => {
      // config.header['xxx'] = 'xxx' // 示例
      config.data = config.data || {}
      if (config?.custom?.auth) {
        config.header['X-Litemall-Token'] = uni.getStorageSync('token')
      }
      return config
    },
    config => {
      return Promise.reject(config)
    }
  )
  // 响应拦截
  uni.$u.http.interceptors.response.use(
    response => {
      const data = response.data
      const custom = response.config?.custom
      if (data.errno === 0) {
        return data ?? {}
      } else {
        if (data.errno === 501) {
          uni.removeStorageSync('token')
          uni.navigateTo({
             url: '/pages/login/login'
          });
        }
        if (custom.toast === true) {
          uni.$u.toast(data.errmsg)
        }
        return Promise.reject(data)
      }
    },
    response => {
      // 对响应错误做点什么 （statusCode !== 200）
      return Promise.reject(response)
    }
  )
}
