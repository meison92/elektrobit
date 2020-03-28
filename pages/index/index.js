//index.js
//获取应用实例
const app = getApp()
const { getEvents, getBackgrounds, getFeaturedEvents, getNews, getTrends } = require('../../wxApi/request')
Page({
  data: {
    bannerList: [],
    host: getApp().globalData.host,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    eventList: [],
    news: [],
    trends: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: false,
    swiperHeight: 150
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.screenWidth)
        let swiperHeight = res.screenWidth * 240 / 335;
        console.log(swiperHeight)
        that.setData({
          swiperHeight
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      // app.userInfoReadyCallback = res => {
      //   this.setData({
      //     userInfo: res.userInfo,
      //     hasUserInfo: true
      //   })
      // }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          // app.globalData.userInfo = res.userInfo
          // this.setData({
          //   userInfo: res.userInfo,
          //   hasUserInfo: true
          // })
        }
      })
    }
    this._getBackgrounds();
    this._getFeaturedEvents();
    // this._getEvents();
    this._getNews();
    this._getTrends();
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
    wx.setNavigationBarTitle({
      title: '首页'
    })
  },
  _getEvents() {
    getEvents().then(res => {
      console.log(res)
      this.setData({
        eventList: res || []
      })
    })
  },

  _getNews() {
    getNews().then(res => {
      console.log(res)
      this.setData({
        news: res || []
      })
    })
  },
  _getTrends() {
    getTrends().then(res => {
      console.log(res)
      this.setData({
        trends: res || []
      })
    })
  },
  _getBackgrounds() {
    getBackgrounds().then(res => {
      console.log(res)
      // this.setData({
      //   eventList: res || []
      // })
    })
  },
  _getFeaturedEvents() {
    getFeaturedEvents().then(res => {
      console.log(res)
      this.setData({
        bannerList: res || []
      }, () => {
        // const query = wx.createSelectorQuery()
        // query.select('.class-item').boundingClientRect()
        // query.exec(function (res) {
        //   console.log(res)
        //   console.log(res[0].height)
        //   console.log(res[0].height * data.t.length)
        //   let sumHeigth = res[0].height * data.t.length;
        //   _this.setData({
        //     swiperHeight: sumHeigth
        //   })
        // })
      })
    })
  },
  tapDetail: function (event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/eventDetail/eventDetail?id=${id}`
    })
  }
})