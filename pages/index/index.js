//index.js
//获取应用实例
const app = getApp()
const { getEvents, getBackgrounds, getFeaturedEvents, getNews, getTrends, getExclusiveEvents, registrations, verifyCode, getTrainingCourses, getMarketingActivities } = require('../../wxApi/request')
Page({
  data: {
    bannerList: [],
    host: getApp().globalData.host,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    eventList: [],
    exclusiveList: [],
    myEventList: [],
    news: [],
    trends: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: false,
    swiperHeight: 150,
    homeIndex: 0,
    invitation_code: null,
    eventId: null,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onReady: function () {
    this.prompt = this.selectComponent("#prompt");
  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.screenWidth)
        let swiperHeight = res.screenWidth * 259 / 566;
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
    // this._getFeaturedEvents();
    this._getTrainingCourses();
    // this._getNews();
    // this._getTrends();
    // this._getExclusiveEvents();
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
        eventList: res.data || []
      })
    })
  },

  _getTrainingCourses() {
    getTrainingCourses().then(res => {
      const { data } = res
      console.log(res)
      this.setData({
        eventList: data || []
      })
    })
  },

  _getMarketingActivities() {
    getMarketingActivities().then(res => {
      const { data } = res;
      console.log(data)
      this.setData({
        exclusiveList: data || []
      })
    })
  },

  _getExclusiveEvents() {
    getExclusiveEvents().then(res => {
      // console.log(res)
      this.setData({
        exclusiveList: res.data || []
      })
    })
  },

  _getMyEvents: function () {
    let uid = app.globalData.userInfo.id;
    registrations({ uid: uid }).then(res => {
      console.log(res)
      if (res.length < 1) {
        return;
      }
      let myEventList = [];
      res.map((item, index) => {
        myEventList.push(item.event)
      })
      this.setData({
        myEventList
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
      this.setData({
        bannerList: res || []
      })
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
    // let id = event.currentTarget.dataset.id;
    // wx.navigateTo({
    //   url: `/pages/eventDetail/eventDetail?id=${id}`
    // })
    let link = event.currentTarget.dataset.link;
    if (link.indexOf('http') > -1) {
      wx.navigateTo({
        url: `/pages/webview/webview?link=${link}`
      })
    } else {
      if (link.indexOf('technic/') > -1) {
        wx.switchTab({
          url: link
        })
      } else {
        wx.navigateTo({
          url: link
        })
      }
    }
  },

  tapMoreNews: function () {
    wx.navigateTo({
      url: `/pages/webview/webview?link=https://www.elektrobit.cn/newsroom/`
    })
  },

  tapNav: function (event) {
    let index = event.target.dataset.index;
    if (index == 0) {
      if (this.data.eventList.length < 1) {
        this._getTrainingCourses();
      }
    } else if (index == 1) {
      if (this.data.exclusiveList.length < 1) {
        this._getMarketingActivities();
      }
    } else if (index == 2) {
      if (this.data.myEventList.length < 1) {
        this._getMyEvents();
      }
    }
    this.setData({
      homeIndex: index
    })
  },
  showPrompt: function (e) {
    console.log(e.detail.id)
    this.setData({
      eventId: e.detail.id
    })
    this.prompt.showPrompt();
  },
  getInput: function (e) {
    this.setData({
      invitation_code: e.detail.value
    })
  },
  cancel: function () {
    this.prompt.hidePrompt();
  },
  confirm: function () {
    const { invitation_code, eventId } = this.data;
    console.log(invitation_code)
    if (invitation_code) {
      const params = {
        data: {
          invitation_code: invitation_code
        },
        id: eventId,
      }
      verifyCode(params).then(res => {
        console.log(res)
        const { code } = res;
        if (code == 0) {
          this.cancel();
          wx.navigateTo({
            url: `/pages/eventDetail/eventDetail?id=${eventId}`
          })
        } else {
          wx.showToast({
            title: '邀请码错误',
            icon: 'none',
            image: '',
            duration: 1500,
          });
        }
      })
    }
  }
})