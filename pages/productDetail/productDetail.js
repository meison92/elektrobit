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
  },

  download: function (e) {
    let url = e.target.dataset.url;
    wx.downloadFile({
      url: url, // 仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        wx.showToast({
          title: '下载成功！',
          icon: 'success',
          duration: 2000
      })
      }
    })
  }
})