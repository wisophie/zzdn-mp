const http = uni.$u.http

export const regionList = (params = {}) =>
  http.get('wx/region/list', {
    params
  })