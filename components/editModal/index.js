const app = getApp();
const { getUser, register, getPhone, statisticsAccess } = require('../../wxApi/request')
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
            value: 'update',
            observer: function (newVal, oldVal) {
                console.log(newVal)
                this.setData({
                    type: newVal
                })
            }
        },
        title: {
            type: String,
            value: '',
            observer: function (newVal, oldVal) {
                console.log(newVal)
                this.setData({
                    title: newVal
                })
            }
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
        eventid: 0,
        opt_in_email: 1
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
            this.triggerEvent("cancelEvent")
        },
        confirm: function () {
            if (!this.data.name) {
                wx.showToast({
                    title: '请输入姓名！',
                    icon: 'none',
                    duration: 2000
                })
                return;
            }
            if (!this.data.company) {
                wx.showToast({
                    title: '请输入公司！',
                    icon: 'none',
                    duration: 2000
                })
                return;
            }
            if (!this.data.position) {
                wx.showToast({
                    title: '请输入职位！',
                    icon: 'none',
                    duration: 2000
                })
                return;
            }
            if (!this.data.email) {
                wx.showToast({
                    title: '请输入正确的邮箱！',
                    icon: 'none',
                    duration: 2000
                })
                return;
            }
            if (!/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(this.data.email)) {
                wx.showToast({
                    title: '请输入正确的邮箱格式！',
                    icon: 'none',
                    duration: 2000
                })
                return;
            }
            if (!this.data.phone) {
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
                session_key: wx.getStorageSync("session_key"),
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
                openid: wx.getStorageSync('openid'),
                data: {
                    name: this.data.name,
                    company: this.data.company,
                    phone: this.data.phone,
                    email: this.data.email,
                    position: this.data.position,
                    uid: this.data.uid,
                    opt_in_email: this.data.opt_in_email
                }
            }
            register(params).then(res => {
                console.log(res)
                this.triggerEvent("parentEvent")
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

                    this._statisticsAccess();
                    this.cancel();
                }
            })
        },
        _updateUser() {
            let params = {
                openid: wx.getStorageSync('openid'),
                data: {
                    name: this.data.name,
                    company: this.data.company,
                    phone: this.data.phone,
                    email: this.data.email,
                    position: this.data.position,
                    uid: this.data.uid,
                    opt_in_email: this.data.opt_in_email
                }
            }
            getUser(params).then(res => {
                console.log(res)
                this.setData({
                    data: res
                })
                wx.setStorageSync('userInfo', res)
                wx.showToast({
                    title: '更新成功',
                    icon: 'success',
                    duration: 2000
                })
                this.hideModal();
                this.triggerEvent('parentEvent')
            })
        },
        _statisticsAccess() {
            const userInfo = wx.getStorageSync('userInfo');
            const params = {
                data: {
                    uid: userInfo.id,
                    entity_type: "event",
                    type: "sign_up",
                    entity_id: this.data.eventid
                }
            }
            statisticsAccess(params).then(res => {
                console.log(res)
            })
        },
        goWebview() {
            wx.navigateTo({
                url: `/pages/webview/webview?link=https://www.elektrobit.cn/privacy-policy/`
            })
        },
        checkboxChange(e) {
            console.log(e.detail.value)
            const value = e.detail.value;
            if (value.length > 0) {
                this.setData({
                    opt_in_email: 1
                })
            } else {
                this.setData({
                    opt_in_email: 0
                })
            }
        }
    }
})