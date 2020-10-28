// pages/technicDetail/technicDetail.js
import { getTechnologyDetail, submitComment, sendEmail, statisticsAccess } from '../../wxApi/request'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    comments: [],
    comment: "",
    autoplay: false,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '技术详情'
    })
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      let url = encodeURIComponent(`/pages/technicDetail/technicDetail?id=${this.options.id}`)
      wx.reLaunch({
        url: `/pages/login/login?isTabbar=0&url=${url}`
      })
      return;
    }
    this.setData({
      userInfo: userInfo
    })
    if (!userInfo.email) {
      this.selectComponent("#editModal").showModal();
      return;
    }
    this._getTechnologyDetail();
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

  _getTechnologyDetail: function () {
    let id = this.options.id;
    let params = { id: id }
    getTechnologyDetail(params).then(res => {
      console.log(res)
      this.setData({
        data: res.length > 0 ? res[0] : {},
        autoplay: true
      })
    })
  },
  comment: function () {
    if (this.data.comment.length < 1) {
      return;
    }
    let id = this.options.id;
    const userInfo = wx.getStorageSync('userInfo');
    let params = {
      id: id,
      openid: app.globalData.openid,
      data: {
        comment: this.data.comment,
        uid: userInfo.id
      }
    }
    submitComment(params).then(res => {
      console.log(res)
      this._getTechnologyDetail();
      this.setData({
        comment: ''
      })
    })
  },
  bindChange: function (event) {
    this.setData({
      comment: event.detail.value
    })
  },

  preview: function () {
    let url = this.data.data.file_downloads[0].url;
    wx.navigateTo({
      url: `/pages/webview/webview?link=${url}`
    })
  },
  sendToEmail: function () {
    let id = this.options.id;
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return;
    }
    if (!app.globalData.userInfo.email) {
      wx.switchTab({
        url: '/pages/mine/mine',
        success: (result) => {
          wx.showToast({
            title: '请补充邮箱信息',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
          });
        }
      });
      return;
    }
    const params = {
      id: id,
      data: {
        email: app.globalData.userInfo.email
      }
    }
    wx.showToast({
      title: '发送中',
      icon: 'none',
      image: '',
      duration: 10000,
      mask: false,
    });
    sendEmail(params).then(res => {
      console.log(res)
      wx.showToast({
        title: '邮件发送成功',
        icon: 'success',
        duration: 2000
      })
      this._statisticsAccess();
    })
  },
  _statisticsAccess() {
    let id = this.options.id;
    const userInfo = wx.getStorageSync('userInfo');
    const params = {
      data: {
        uid: userInfo.id,
        entity_type: "technology",
        type: "play",
        entity_id: id
      }
    }
    statisticsAccess(params).then(res => {
      console.log(res)
    })
  },

  _cancelModal: function () {
    console.log(111111)
    wx.reLaunch({
      url: '/pages/index/index',
    });
  }
})