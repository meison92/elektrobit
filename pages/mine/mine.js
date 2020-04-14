// pages/mine/mine.js
const { getUser } = require('../../wxApi/request')
const util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
    })
    const openid = wx.getStorageSync('openid');
    const updateTime = wx.getStorageSync('updateTime');
    const userInfo = wx.getStorageSync('userInfo');
    if ((new Date().getTime()) - Number(updateTime) <= 86400000) {
      if (openid) {
        this._getUser();
      } else {
        wx.reLaunch({
          url: '/pages/login/login'
        })
      }
    } else {
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
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
      title: '个人中心'
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

  tapEdit() {
    this.selectComponent("#editModal").showModal();
  },

  _getUser() {
    console.log(app.globalData.openid)
    let params = {
      openid: app.globalData.openid
    }
    getUser(params).then(res => {
      console.log(res)

      wx.setStorageSync('userInfo', res)
      this.setData({
        data: res || {}
      })
    })
  },
  tapEvent() {
    wx.navigateTo({
      url: '/pages/event/event'
    })
  },
})