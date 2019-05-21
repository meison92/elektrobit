const app = getApp();
const { getUser, register, getPhone } = require('../../wxApi/request')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: {
            type: Object,
            value: {},
            observer: function (newVal, oldVal) {
                console.log(newVal)
                if (!newVal.name) {
                    return;
                }
                this.setData({
                    name: newVal.name,
                    phone: newVal.phone,
                    company: newVal.company,
                    position: newVal.position,
                    email: newVal.email,
                    uid: newVal.id
                })
            }
        },
        eventid: {
            type: String,
            value: 0,
            observer: function (newVal, oldVal) {
                this.setData({
                    eventid: newVal
                })
            }
        },
        type: {
            type: String,
            value: 'update'
        },
        title: {
            type: String,
            value: ''
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
        position: "",
        email: "",
        eventid: 0
    },

    ready() {
        console.log(this.data)
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
            } else if (id == 'position') {
                this.setData({
                    position: value
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
            } else if (!this.data.position) {
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
            }
            if (this.data.type == "update") {
                this._updateUser();
            } else if (this.data.type = "submit") {
                this._register();
            }
        },
        getVerify: function (e) {
            let params = {
                session_key: app.globalData.session_key,
                encrypted_data: e.detail.encryptedData,
                iv: e.detail.iv
            }
            getPhone(params).then(res => {
                console.log(res.phone_number)
                this.setData({
                    phone: res.phone_number
                })

                wx.showToast({
                    title: '获取手机号成功',
                    icon: 'success',
                    duration: 2000
                })
            })
        },
        _register: function () {
            let params = {
                id: this.data.eventid,
                openid: app.globalData.openid,
                data: {
                    name: this.data.name,
                    company: this.data.company,
                    phone: this.data.phone,
                    email: this.data.email,
                    position: this.data.position,
                    uid: this.data.uid
                }
            }
            register(params).then(res => {
                console.log(res)
                if (res.error == '50001') {
                    wx.showToast({
                        title: '该活动已报名',
                        icon: 'none',
                        duration: 2000
                    })
                    this.cancel();
                    return;
                }
                if (res.message == 'success') {
                    wx.showToast({
                        title: '报名成功',
                        icon: 'success',
                        duration: 2000
                    })
                    this.cancel();
                }
            })
        },
        _updateUser() {
            let params = {
                openid: app.globalData.openid,
                data: {
                    name: this.data.name,
                    company: this.data.company,
                    phone: this.data.phone,
                    email: this.data.email,
                    position: this.data.position,
                    uid: this.data.uid
                }
            }
            getUser(params).then(res => {
                console.log(res)
                this.setData({
                    data: res
                })
                wx.showToast({
                    title: '更新成功',
                    icon: 'success',
                    duration: 2000
                })
                this.cancel();
                this.triggerEvent('parentEvent')
            })
        },
    }
})