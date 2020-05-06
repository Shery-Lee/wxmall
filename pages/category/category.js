// pages/cateory/category.js
import { request } from '../../request/index'
const Cates = []
Page({
  data: {
    leftMenuList:[],
    rightContent:[],
    currentIndex:0,
    scrollTop:0
  },
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates')
    if(!Cates){
      this.getCategoryData()
    }else{
      if(Date.now() - Cates.time > 1000*300){
        this.getCategoryData()
      }else{
        this.Cates = Cates.data
        this.setData({
          leftMenuList:this.Cates.map(v => v.cat_name),
          rightContent:this.Cates[0].children
        })
      }
    }
  },
  getCategoryData(){
    request({
      url:'/categories'
    }).then(res => {
      console.log(res)
      this.Cates = res.data.message
      wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
      this.setData({
        leftMenuList:this.Cates.map(v => v.cat_name),
        rightContent:this.Cates[0].children
      })
    })
  },
  handleMenuClick(e){
    const index = e.currentTarget.dataset.index
    this.setData({
      currentIndex:index,
      rightContent:this.Cates[index].children,
      scrollTop:0
    })
  }
})