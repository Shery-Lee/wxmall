import regeneratorRuntime from '../../utils/runtime.js'
import {login} from '../../utils/area'
import {request} from '../../request/index'
Page({
  data: {

  },
  onLoad: function (options) {

  },
  async handelGetUserInfo(e){
    try {
      const {encryptedData,iv,signature,rawData} = e.detail
      const {code} = await login()
      console.log(code)
      const loginParams  = {
        encryptedData,iv,signature,rawData,code
      }
      //获取TOKEN 企业号才行
      const res = await request({url:'/users/wxlogin',data:loginParams,method:'POST'})
      //暂时写死一个
      const token = 'Ejudioadandoiiahjdladnnosiahdalnaciasmdaldjk'
      wx.setStorageSync('token', token)
      wx.navigateBack({
        delta:1
      })
    } catch (error) {
      console.log(error)
    }
  }

})