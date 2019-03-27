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
        tapDetail() {
            wx.navigateTo({
                url: `/pages/eventDetail/eventDetail?id=${this.data.data.id}`
            })
        },
        signUp(event) {
            console.log(event)
            console.log('报名')
        }
    }
})