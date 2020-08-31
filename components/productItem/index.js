
const { statisticsAccess } = require('../../wxApi/request')
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
            // wx.navigateTo({
            //     url: `/pages/productDetail/productDetail?id=${id}`
            // })
            let link = this.data.data.link;
            this._statisticsAccess(id);
            wx.navigateTo({
                url: `/pages/webview/webview?link=${link}`
            })
        },
        _statisticsAccess(id) {
            const userInfo = wx.getStorageSync('userInfo');
            const params = {
                data: {
                    uid: userInfo.id,
                    entity_type: "product",
                    type: "view",
                    entity_id: id
                }
            }
            statisticsAccess(params).then(res => {
                console.log(res)
            })
        },
    }
})