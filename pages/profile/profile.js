// pages/profile/profile.js
Page({
  data: {
    userinfo:{},
    collectNum:0
  },
  onShow(){
    const userinfo = wx.getStorageSync('userInfo')
    const collect = wx.getStorageSync('collect')
    this.setData({userinfo,collectNum:collect.length})
  },
  onLoad: function (options) {

  },
  handelGetUserInfo(e){
    console.log(e)
  },
  clear(){
    console.log("111111")
    let userinfo = {}
    wx.setStorageSync('userInfo', userinfo)
    this.setData({userinfo})
  }
})