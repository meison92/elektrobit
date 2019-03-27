// pages/technic/technic.js

import { getWebinar, getDocuments, getWhitePaper } from '../../wxApi/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: getApp().globalData.host,
    techIndex: 0,
    webinarList: [],
    documentList: [],
    paperList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getWebinar();
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
      title: '技术'
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

  _getWebinar: function () {
    let params = {}
    getWebinar(params).then(res => {
      console.log(res)
      this.setData({
        webinarList: res || []
      })
    })
  },

  _getDocuments: function () {
    let params = {}
    getDocuments(params).then(res => {
      console.log(res)
      this.setData({
        documentList: res || []
      })
    })
  },

  _getWhitePaper: function () {
    let params = {}
    getWhitePaper(params).then(res => {
      console.log(res)
      this.setData({
        paperList: res || []
      })
    })
  },

  tapNav: function (event) {
    let index = event.target.dataset.index;
    if (index == 0) {
      if (this.data.webinarList.length > 0) {
        return;
      }
      this._getWebinar();
    } else if (index == 1) {
      if (this.data.documentList.length > 0) {
        return;
      }
      this._getDocuments();
    } else if (index == 2) {
      if (this.data.paperList.length > 0) {
        return;
      }
      this._getWhitePaper();
    }
    this.setData({
      techIndex: index
    })
  }
})