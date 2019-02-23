// pages/event/event.js
const { getEvents } = require('../../wxApi/request')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventList: [],
    selectIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '精彩活动'
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
    getEvents().then(res => {
      console.log(res)
      this.setData({
        eventList: res || []
      })
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

  tapSelection(event) {
    let index = event.currentTarget.dataset.index;
    
    console.log(index)
    this.setData({
      selectIndex: index
    })
  },

  tapDetail() {
    wx.navigateTo({
      url: '/pages/eventDetail/eventDetail'
    })
  }
})