const app = getApp()
const request = (url, data, method) => {
  let _url = app.globalData.host + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method || 'get',
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  request,
  getEvents: (data) => { // 获取活动列表
    return request('/json/events', data)
  },
  getEventDetail: (data) => { // 获取活动详情
    return request(`/json/event/${data.id}`)
  },
  getWebinar: (data) => { // 获取webinar列表
    return request('/json/webinar', data);
  },
  getDocuments: (data) => { // 获取技术文档列表
    return request('/json/documents', data);
  },
  getWhitePaper: (data) => { // 获取白皮书列表
    return request('/json/white-paper', data);
  },
  getTechnologyDetail: (data) => { // 获取技术详情
    return request(`/json/technology/${data.id}`)
  },
  getTechnologyComment: (data) => { // 获取技术评论
    return request(`/json/technology/${data.id}/comment`)
  },
  getProducts: (data) => { // 获取产品列表
    return request('/json/products', data);
  },
  getProductDetail: (data) => { // 获取产品详情
    return request(`/json/products/${data.id}`)
  },
  getUser: (data) => { // 获取用户信息
    return request('/json/user', data);
  },
  getBackgrounds: (data) => {
    return request('/json/backgrounds', data);
  },
  getFeaturedEvents: (data) => {
    return request('/json/featured-events', data);
  }
}