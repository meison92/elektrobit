const app = getApp()
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
            if (!app.globalData.userInfo) {
                wx.navigateTo({
                    url: '/pages/login/login'
                })
                return;
            }
            let id = event.currentTarget.dataset.id;
            wx.navigateTo({
                url: `/pages/technicDetail/technicDetail?id=${id}`
            })
        }
    }
})