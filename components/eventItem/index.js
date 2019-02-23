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
        data: {}
    },

    ready() {
        console.log(this.data)
    },

    /**
    * 组件的方法列表
    */
    methods: {
        click: function () {
            console.log("component!");
        },
        tapDetail() {
            wx.navigateTo({
                url: `/pages/eventDetail/eventDetail?id=${this.data.data.id}`
            })
        }
    }
})