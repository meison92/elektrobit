// pages/technicDetail/technicDetail.js
import { getTechnologyDetail, getTechnologyComment } from '../../wxApi/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    commentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getTechnologyDetail();
    this._getTechnologyComment();
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
        data: res.length > 0 ? res[0] : {}
      })
    })
  },
  _getTechnologyComment: function () {
    let id = this.options.id;
    let params = { id: id }
    getTechnologyComment(params).then(res => {
      console.log(res)
      this.setData({
        commentList: res || []
      })
    })
  },
})