// pages/login/login.js
const app = getApp();
const { getUser } = require('../../wxApi/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTabbar: 0,
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isTabbar: options.isTabbar,
      url: options.url,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '登录'
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  quitLogin: function () {
    wx.reLaunch({
      url: `/pages/index/index`
    })
  },

  bindLogin: function (result) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功:' + res.code)
        app.globalData.code = res.code;
        console.log(result);
        const detail = result.detail;
        const userInfo = detail.userInfo;
        let params = {
          code: app.globalData.code,
          encrypted_data: detail.encryptedData,
          iv: detail.iv
        }
        getUser(params).then(res => {
          console.log(res)
          wx.setStorageSync('updateTime', new Date().getTime());
          wx.setStorageSync('openid', res.openid);
          wx.setStorageSync('session_key', res.session_key);
          app.globalData.openid = res.openid;
          app.globalData.session_key = res.session_key;
          this._getUserData();
        })
      }
    })
  },

  _getUserData() {
    console.log(app.globalData.openid)
    const { isTabbar, url } = this.data;
    let params = {
      openid: app.globalData.openid
    }
    getUser(params).then(res => {
      console.log(res)

      wx.setStorageSync('userInfo', res)
      app.globalData.userInfo = res || {};
      if (isTabbar == 1) {
        if (url) {
          wx.switchTab({
            url: url
          })
        } else {
          wx.reLaunch({
            url: `/pages/index/index`
          })
        }
      } else {
        if (url) {
          wx.reLaunch({
            url: decodeURIComponent(url)
          });
        } else {
          wx.navigateBack({
            delta: 1
          });
        }
      }
    })
  }
})