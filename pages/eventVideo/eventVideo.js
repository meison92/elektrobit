// pages/eventDetail/eventDetail.js
var WxParse = require('../../wxParse/wxParse.js');
import { getEventDetail } from '../../wxApi/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: getApp().globalData.host,
    data: {},
    userInfo: {},
    id: 0,
    type: 0,
    showModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '活动详情'
    })
    let that = this;
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
    this._getEventDetail();

    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      id: options.id,
      type: options.type,
      userInfo: userInfo
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

  _getEventDetail: function () {
    let that = this;
    let params = { id: this.options.id }
    getEventDetail(params).then(res => {
      console.log(res)
      WxParse.wxParse('article', 'html', res[0].body, that, 5);
      this.setData({
        data: res.length > 0 ? res[0] : {}
      })
    })
  },
})