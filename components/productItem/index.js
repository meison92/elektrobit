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
            let id = e.currentTarget.dataset.id;
            wx.navigateTo({
                url: `/pages/productDetail/productDetail?id=${id}`
            })
        }
    }
})