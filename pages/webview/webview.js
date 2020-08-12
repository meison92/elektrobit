// pages/webview/webview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '详情'
    })
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        let isIphone = res.model.search(/iPhone/) != -1;
        if (isIphone) {
          this.setData({
            link: options.link
          })
        } else {
          this.downloadFile(options.link);
        }
      }
    });

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

  downloadFile: function (url) {

    wx.showLoading({
      title: "下载中",
      mask: true
    });
    wx.downloadFile({
      url: url, // 仅为示例，并非真实的资源
      success(res) {
        console.log(res)
        let filePath = res.tempFilePath;
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        wx.showToast({
          title: '下载成功！',
          icon: 'success',
          duration: 2000
        })
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (res) {
            console.log('打开文档失败')
            wx.showToast({
              title: '打开文档失败！',
              icon: 'error',
              duration: 2000
            })
          }
        })
      }
    })
  }
})