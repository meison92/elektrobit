// pages/login/login.js
const app = getApp();
const { getUser } = require('../../wxApi/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  bindLogin: function (result) {
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
      wx.setStorageSync('openid', res.openid);
      wx.reLaunch({
        url: `/pages/index/index`
      })
    })
  },
})