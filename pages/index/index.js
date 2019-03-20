//index.js
//获取应用实例
const app = getApp()
const { getEvents } = require('../../wxApi/request')
Page({
  data: {
    imgUrls: [
      'http://hbimg.b0.upaiyun.com/c2ba7d736ddbb2a96dab9fe9b610bbd130950a4915fca-F6dK0D_fw658',
      'http://hbimg.b0.upaiyun.com/5ef2dd45c01ee0396da790bd4258be91bc39b7e5809e3-YwDAAJ_fw658',
      'http://s9.sinaimg.cn/mw690/006hikKrzy7pzDEQbFe68&690'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    eventList: [1, 2, 3],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this._getEvents();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  _getEvents() {
    getEvents().then(res => {
      console.log(res)
      this.setData({
        eventList: res || []
      })
    })
  }
})