//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
      const openid = wx.getStorageSync('openid');
      if (openid) {
        this.globalData.openid = openid;
      }
    }

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log('登录成功:' + res.code)
    //     this.globalData.code = res.code;
    //     const openid = wx.getStorageSync('openid');
    //     const updateTime = wx.getStorageSync('updateTime');
    //     const userInfo = wx.getStorageSync('userInfo');
    //     if ((new Date().getTime()) - Number(updateTime) <= 86400000) {
    //       console.log(openid)
    //       if (openid) {
    //         this.globalData.openid = openid;
    //         this.globalData.userInfo = userInfo;
    //       } else {
    //         wx.reLaunch({
    //           url: '/pages/login/login'
    //         })
    //       }
    //     } else {
    //       wx.reLaunch({
    //         url: '/pages/login/login'
    //       })
    //     }
    //   }
    // })

  },
  globalData: {
    host: 'https://mp.elektrobit.cn',
    userInfo: null,
    openid: null
  },

  // 获取用户信息
  getSetting() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              const userInfo = wx.getStorageSync('userInfo');
              this.globalData.userInfo = { ...res.userInfo, ...userInfo }

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})