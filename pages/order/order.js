// pages/order/order.js
import regeneratorRuntime from '../../utils/runtime.js'
import {request} from '../../request/index'
Page({
  data: {
    tabs:[
      {
        id:0,
        title:"全部",
        isActive:true
      },
      {
        id:1,
        title:"待付款",
        isActive:false
      },
      {
        id:2,
        title:"待发货",
        isActive:false
      },
      {
        id:3,
        title:"退款/售后",
        isActive:false
      },
    ]
  },
  onShow(){
    const page = getCurrentPages()
    console.log(page)
    const currentPage = page[page.length - 1].options.type
    console.log(currentPage)
    this.changeTabIndex(currentPage - 1)
    this.getOrder(currentPage)
  },
  async getOrder(type){
    const res = await request({url:'/orders/all',data:{type}})
    console.log(res)
  },
  changeTabIndex(index){
    this.data.tabs.forEach((v,i)=> i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs:this.data.tabs
    })
  },
  tabsclick(e){
    console.log(e)
    const index = e.detail.index
    this.changeTabIndex(index)
    this.getOrder(index + 1)
  },
})