import { base64encode } from '../utils/util'
const app = getApp();
const request = (url, data, method) => {
  let _url = app.globalData.host + url;
  const session_key = wx.getStorageSync('session_key');
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method || 'get',
      data: { ...data, session_key },
      header: {
        'Content-Type': 'application/json'
      },
      success(request) {
        if (request.data.error == -41003) {
          wx.reLaunch({
            url: '/pages/login/login'
          })
          return;
        }
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

const requestWithAuth = (url, data, method) => {
  let _url = app.globalData.host + url;
  const session_key = wx.getStorageSync('session_key');
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method || 'get',
      data: { ...data, session_key },
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'basic ' + base64encode(app.globalData.openid + '123456')
      },
      success(request) {
        if (request.data.error == -41003) {
          wx.reLaunch({
            url: '/pages/login/login'
          })
          return;
        }
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

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
}

module.exports = {
  request,
  getEvents: (data) => { // 获取活动列表
    return request('/json/events', data)
  },
  getExclusiveEvents: (data) => { // 获取专属活动列表
    return request('/json/exclusive-events', data)
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
  getProducts: (data) => { // 获取产品列表
    return request('/json/products', data);
  },
  getProductDetail: (data) => { // 获取产品详情
    return request(`/json/product/${data.id}`)
  },
  getUser: (data) => { // 获取用户信息
    return request('/json/user', data, 'post');
  },
  getBackgrounds: (data) => {
    return request('/json/backgrounds', data);
  },
  getFeaturedEvents: (data) => {
    return request('/json/featured-events', data);
  },
  registrations: (data) => {
    return requestWithAuth(`/json/registrations/${data.uid}`);
  },
  register: (data) => {
    return requestWithAuth(`/json/event/${data.id}/register`, data, 'post');
  },
  submitComment: (data) => { // 提交评论
    return requestWithAuth(`/json/technology/${data.id}/comment`, data, 'post')
  },
  getPhone: (data) => { // 提交评论
    return request(`/json/user/phone`, data, 'post')
  },
  getNews: (data) => { // 获取新闻
    return request(`/json/news`, data)
  },
  getTrends: (data) => { // 获取应用领域
    return request(`/json/trends`, data)
  },
  sendEmail: (data) => { //发送邮件
    return requestWithAuth(`/json/email/${data.id}`, data, 'post');
  },
}