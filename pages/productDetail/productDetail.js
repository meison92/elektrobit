// pages/productDetail/productDetail.js

var WxParse = require('../../wxParse/wxParse.js');
import { getProductDetail } from '../../wxApi/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '产品详情'
    })
    this._getProductDetail();
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

  _getProductDetail: function () {
    let id = this.options.id;
    let params = { id: id }
    getProductDetail(params).then(res => {
      console.log(res)
      this.setData({
        data: res.length > 0 ? res[0].body : {}
      })
      var article = '<div style="color:red">我是HTML代码</div>';
      var that = this;
      WxParse.wxParse('article', 'html', that.data.data, that, 5);
    })
  }
})