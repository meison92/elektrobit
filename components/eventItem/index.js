Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: {
            type: Object
        },
        type: {
            type: Number
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        data: {},
        type: 0,
        host: getApp().globalData.host
    },

    ready() {

    },

    /**
    * 组件的方法列表
    */
    methods: {
        tapDetail() {
            const { id } = this.data.data;
            if (this.data.type == 1) {
                this.triggerEvent("showPrompt", { id: id })
            } else {
                wx.navigateTo({
                    url: `/pages/eventDetail/eventDetail?id=${this.data.data.id}`
                })
            }
        },
        signUp(event) {
            console.log(event)
            console.log('报名')
        }
    }
})