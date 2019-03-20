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
        console.log(this.data);
        // let start = this.data.data.date.start;
        // let end = this.data.data.date.end;
        // this.data.data.date.start = this.sliceDate(start);
        // this.data.data.date.end = this.sliceDate(end);
        // console.log(this.data.data)
        // this.setData({
        //     data: this.data.data
        // })
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
        },
        sliceDate(date) {
            console.log(date)
            return date;
        }
    }
})