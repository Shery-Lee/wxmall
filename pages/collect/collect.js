// pages/collect/collect.js
Page({
  data: {
    tabs:[
      {
        id:0,
        title:"商品收藏",
        isActive:true
      },
      {
        id:1,
        title:"品牌收藏",
        isActive:false
      },
      {
        id:2,
        title:"店铺收藏",
        isActive:false
      },
      {
        id:3,
        title:"浏览足迹",
        isActive:false
      },
    ],
    collect:[]
  },
  onShow(){
    let collect = wx.getStorageSync('collect')||[]
    this.setData({
      collect
    })
  },
  tabsclick(e){
    console.log(e)
    const index = e.detail.index
    this.data.tabs.forEach((v,i)=> i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs:this.data.tabs
    })
  },
})