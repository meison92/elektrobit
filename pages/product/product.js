// pages/product/product.js
import { getProducts } from '../../wxApi/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [],
    page: 0,
    loadMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getProducts();
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
      title: '产品'
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

  _getProducts() {
    const { productList = [], loadMore, page = 0 } = this.data;
    if (!loadMore) {
      return;
    }
    let params = {
      page: page
    }
    getProducts(params).then(res => {
      console.log(res)
      this.setData({
        productList: productList.concat(res.data || []),
        page: res.current_page + 1,
        loadMore: res.current_page + 1 < res.total_pages
      })
    })
  }
})