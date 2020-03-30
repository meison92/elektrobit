
const app = getApp()
const { sendEmail } = require('../../wxApi/request')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: {
            type: Object
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        data: {},
        host: getApp().globalData.host
    },

    ready() {
    },

    /**
    * 组件的方法列表
    */
    methods: {
        tapDetail: function (event) {
            wx.showActionSheet({
                itemList: ['在线预览', '发送至邮箱'],
                success(res) {
                    console.log(res.tapIndex)
                    let tapIndex = res.tapIndex;
                    if (tapIndex == 0) {
                        let file = event.currentTarget.dataset.file;
                        console.log(file)

                        if (file.length > 0) {
                            let url = file[0].url;
                            wx.navigateTo({
                                url: `/pages/webview/webview?link=${url}`
                            })
                        } else {
                            wx.showToast({
                                title: '打开文档失败！',
                                icon: 'error',
                                duration: 2000
                            })
                        }
                    } else {
                        let id = event.currentTarget.dataset.id;
                        if (!app.globalData.userInfo) {
                            wx.reLaunch({
                                url: '/pages/login/login'
                            })
                            return;
                        }
                        const params = {
                            id: id,
                            data: {
                                email: app.globalData.userInfo.email
                            }
                        }
                        sendEmail(params).then(res => {
                            console.log(res)
                            wx.showToast({
                                title: '邮件发送成功',
                                icon: 'success',
                                duration: 2000
                            })
                        })
                    }
                },
                fail(res) {
                    console.log(res.errMsg)
                }
            })
        }
    }
})