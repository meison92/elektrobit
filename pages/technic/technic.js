// pages/technic/technic.js

import { getWebinar, getDocuments, getWhitePaper } from '../../wxApi/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: getApp().globalData.host,
    techIndex: 0,
    webinarPage: 0,
    webinarLoadMore: true,
    webinarList: [],
    documentPage: 0,
    documentLoadMore: true,
    documentList: [],
    paperPage: 0,
    paperLoadMore: true,
    paperList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const { index = 0 } = options;
    this.setData({
      techIndex: index
    })
    if (index == 0) {
      this._getWebinar();
    } else if (index == 1) {
      this._getDocuments();
    } else if (index == 2) {
      this._getWhitePaper();
    }
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
    const { webinarPage, webinarLoadMore, webinarList } = this.data;
    if (!webinarLoadMore) {
      return;
    }
    let params = { page: webinarPage }
    getWebinar(params).then(res => {
      console.log(res)
      this.setData({
        webinarList: webinarList.concat(res.data || []),
        webinarPage: res.current_page + 1,
        webinarLoadMore: res.current_page + 1 < res.total_page
      })
    })
  },

  _getDocuments: function () {
    const { documentPage, documentLoadMore, documentList } = this.data;
    if (!documentLoadMore) {
      return;
    }
    let params = { page: documentPage }
    getDocuments(params).then(res => {
      console.log(res)
      this.setData({
        documentList: documentList.concat(res.data || []),
        documentPage: res.current_page + 1,
        documentLoadMore: res.current_page + 1 < res.total_page
      })
    })
  },

  _getWhitePaper: function () {
    const { paperPage, paperLoadMore, paperList } = this.data;
    if (!paperLoadMore) {
      return;
    }
    let params = { page: paperPage }
    getWhitePaper(params).then(res => {
      console.log(res)
      this.setData({
        paperList: paperList.concat(res.data || []),
        paperPage: res.current_page + 1,
        paperLoadMore: res.current_page + 1 < res.total_page
      })
    })
  },

  tapNav: function (event) {
    let index = event.target.dataset.index;
    if (index == 0) {
      if (this.data.webinarList.length < 1) {
        this._getWebinar();
      }
    } else if (index == 1) {
      if (this.data.documentList.length < 1) {
        this._getDocuments();
      }
    } else if (index == 2) {
      if (this.data.paperList.length < 1) {
        this._getWhitePaper();
      }
    }
    this.setData({
      techIndex: index
    })
  },

  _loadMore() {
    console.log('loadmore....')
    const { techIndex = 0 } = this.data;
    if (techIndex == 0) {
      this._getWebinar();
    } else if (techIndex == 1) {
      this._getDocuments();
    } else if (techIndex == 2) {
      this._getWhitePaper();
    }
  }
})