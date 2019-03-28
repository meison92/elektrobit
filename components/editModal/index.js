Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: {
            type: Object
        },
        title: {
            type: String
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
        email: "",
        title: ""
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
            let id = event.currentTarget.dataset.id;
            let value = event.detail.value;
            if (id == 'name') {
                this.setData({
                    name: value
                })
            } else if (id == 'phone') {
                this.setData({
                    phone: value
                })
            } else if (id == 'company') {
                this.setData({
                    company: value
                })
            } else if (id == 'email') {
                this.setData({
                    email: value
                })
            } else if (id == 'job') {
                this.setData({
                    job: value
                })
            } else if (id == 'verifyCode') {
                this.setData({
                    verifyCode: value
                })
            }
        },
        cancel: function () {
            this.hideModal();
        },
        confirm: function () {
            if (!this.data.name) {
                wx.showToast({
                    title: '请输入姓名！',
                    icon: 'none',
                    duration: 2000
                })
                return;
            } else if (!this.data.company) {
                wx.showToast({
                    title: '请输入公司！',
                    icon: 'none',
                    duration: 2000
                })
                return;
            } else if (!this.data.job) {
                wx.showToast({
                    title: '请输入职位！',
                    icon: 'none',
                    duration: 2000
                })
                return;
            } else if (!this.data.email) {
                wx.showToast({
                    title: '请输入正确的邮箱！',
                    icon: 'none',
                    duration: 2000
                })
                return;
            } else if (!this.data.phone) {
                wx.showToast({
                    title: '请输入正确的手机号！',
                    icon: 'none',
                    duration: 2000
                })
                return;
            } else if (!this.data.verifyCode) {
                wx.showToast({
                    title: '请输入验证码！',
                    icon: 'none',
                    duration: 2000
                })
                return;
            }
            this.hideModal();
        },
        getVerify: function () {
            if (!this.data.phone) {
                wx.showToast({
                    title: '请输入正确的手机号！',
                    icon: 'none',
                    duration: 2000
                })
                return;
            }
            wx.showToast({
                title: '获取验证码成功',
                icon: 'success',
                duration: 2000
            })
        }
    }
})