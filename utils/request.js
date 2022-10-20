module.exports = vm => {
  const baseURL = 'http://7dgvmk.natappfree.cc/'
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
      // if (config?.custom?.auth) {
      // 	config.header['accessToken'] = vm.$store.state.token
      // }
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
        if (custom.toast === true) {
          uni.$u.toast(data.message)
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
