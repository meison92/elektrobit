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
        host: getApp().globalData.host,
        showModal: false,
        name: "",
        phone: "",
        company: "",
        job: "",
        verifyCode: "",
        email: ""
    },

    ready() {
        console.log(this.data)
        this.setData({
            name: this.data.name,
            phone: this.data.phone,
            company: this.data.company,
            email: this.data.email,
            job: this.data.job,
        })
    },

    /**
    * 组件的方法列表
    */
    methods: {
        catchtap: function () { },
        /**
         * 隐藏模态对话框
         */
        hideModal: function () {
            this.setData({
                showModal: false
            });
        },
        showModal: function () {
            this.setData({
                showModal: true
            });
        },
        bindChange: function (event) {

            console.log(event.detail.value)
        }
    }
})