const http = uni.$u.http

/** 投票列表 */
export const getVotelist = (params = {}) =>
  http.get('/wx/vote/list', {
    params
  })
  
/** 投票内容明细 */
export const getVoteDetail = (params = {}) =>
  http.get('/wx/vote/detail', {
    params
  })

/** 发起订单纠纷或者意见反馈投票*/
export const createVote = (data = {}) => http.post('/wx/vote/save', data, {
    custom: {
      auth: false
    }
  })

/** 投票*/
export const toVote = (data = {}) => http.post('/wx/vote/vote', data, {
    custom: {
      auth: false
    }
  })
/** 修改投票*/
export const editVote = (data = {}) => http.post('/wx/vote/update', data, {
  custom: {
	auth: false
  }
})
  
  /**删除投票*/
  export const deleteVote = (data = {}) => http.post('/wx/vote/delete', data, {
      custom: {
        auth: false
      }
    })
	
	/** 管理后台查询投票列表*/
	export const adminGetVotelist = (params = {}) => http.get('/admin/vote/list', {
		params,
	    custom: {
	      auth: false
	    }
	  })
  /** 管理后台审核投票*/
  export const adminJudgeVote = (data = {}) => http.post('/admin/vote/update', data, {
	  custom: {
		auth: false
	  }
	})