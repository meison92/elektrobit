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
            // let id = event.currentTarget.dataset.id;
            // wx.navigateTo({
            //     url: `/pages/technicDetail/technicDetail?id=${id}`
            // })
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
        }
    }
})