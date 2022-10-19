const http = uni.$u.http

/** 不需要token => post  需要token则删除 auth:true */
export const register = (data = {}) =>
  http.post('wx/auth/register', data, {
    custom: {
      auth: false
    }
  })