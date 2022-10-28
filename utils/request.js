module.exports = vm => {

  const baseURL = 'http://z3gfy8.natappfree.cc/'

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
        // config.header['X-Litemall-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aGlzIGlzIGxpdGVtYWxsIHRva2VuIiwiYXVkIjoiTUlOSUFQUCIsImlzcyI6IkxJVEVNQUxMIiwiZXhwIjoxNjY2NjQwMjkyLCJ1c2VySWQiOjgsImlhdCI6MTY2NjYxODY5Mn0.CI1kirLVGlJsW3gvLK8iqG1Sm31SKlMdp629HD8MHuQ'
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
