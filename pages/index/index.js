//index.js
//获取应用实例
import { request } from '../../request/index'
const app = getApp()

Page({
  data: {
   swiperList:[],
   tabnavList:[],
   floorData:[]
  },
  onLoad(){
    this.getSwiperData()
    this.getTabData()
    this.getFloorData()
  },
  getSwiperData(){
    request({'url': '/home/swiperdata'}).then(res => {
      this.setData({
        swiperList:res.data.message
      })
    })
  },
  getTabData(){
    request({url: '/home/catitems'}).then(res => {
      console.log(res)
      this.setData({
        tabnavList:res.data.message
      })
    })
  },
  getFloorData(){
    request({url: '/home/floordata'}).then(res => {
      // console.log(res)
      this.setData({
        floorData:res.data.message
      })
    })
  }

})
