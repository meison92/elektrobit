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
        tapProductDetail: function (e) {
            console.log(this.data.data.link)
            let link = this.data.data.link;
            wx.navigateTo({
                url: `/pages/webview/webview?link=${link}`
            })
        }
    }
})