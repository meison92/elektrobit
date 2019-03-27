// pages/eventDetail/eventDetail.js
import { getEventDetail } from '../../wxApi/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: getApp().globalData.host,
    data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '活动详情'
    })
    this._getEventDetail();
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
    let params = { id: this.options.id }
    getEventDetail(params).then(res => {
      console.log(res)
      this.setData({
        data: res.length > 0 ? res[0] : {}
      })
    })
  },

  submit: function () {
    this.selectComponent("#editModal").showModal();
  },

  onlineSearch: function () {
    wx.showToast({
      title: '在线调研',
      icon: 'success',
      duration: 2000
    })
  }
})