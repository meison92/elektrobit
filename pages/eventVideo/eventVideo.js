// pages/eventDetail/eventDetail.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
import { getEventDetail, sendEmail, submitComment } from '../../wxApi/request'
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
    comment: ""
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

  sendToEmail: function () {
    let id = this.options.id;
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return;
    }
    if (!userInfo.email) {
      wx.switchTab({
        url: '/pages/mine/mine',
        success: (result) => {
          wx.showToast({
            title: '请补充邮箱信息',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (result) => {

            },
            fail: () => { },
            complete: () => { }
          });
        },
        fail: () => { },
        complete: () => { }
      });
      return;
    }
    const params = {
      id: id,
      data: {
        email: userInfo.email
      }
    }
    wx.showToast({
      title: '发送中',
      icon: 'none',
      image: '',
      duration: 10000,
      mask: false,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
    sendEmail(params).then(res => {
      console.log(res)
      wx.showToast({
        title: '邮件发送成功',
        icon: 'success',
        duration: 2000
      })
    })
  },
  bindChange: function (event) {
    this.setData({
      comment: event.detail.value
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
      this._getEventDetail();
      this.setData({
        comment: ''
      })
    })
  },
})