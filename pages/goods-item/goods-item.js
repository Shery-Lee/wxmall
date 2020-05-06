// pages/goods-item/goods-item.js
import {request} from '../../request/index'
Page({
  data: {
    tabs:[
      {
        id:0,
        title:"综合",
        isActive:true
      },
      {
        id:1,
        title:"销量",
        isActive:false
      },
      {
        id:2,
        title:"价格",
        isActive:false
      }
    ],
    cid:"",
    goods:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalpages:1,
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || ""
    this.QueryParams.query = options.query || ""
    this.getSearchData()
  },
  getSearchData(){
    request({url:'/goods/search',data:this.QueryParams}).then(res => {
      console.log(res.data.message.total)
      this.totalpages = Math.ceil( res.data.message.total / this.QueryParams.pagesize)
      console.log(this.totalpages)
      const goodslist = res.data.message.goods
      const goods = this.data.goods
      goods.push(...goodslist)
      this.setData({
        goods:goods
      })
      wx.stopPullDownRefresh()
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
  // 上拉加载更多
  onReachBottom(){ 
    if(this.QueryParams.pagenum  >= this.totalpages){
      wx.showToast({
        title: '没有数据了',
        icon:"none"
      })
    }else{
      this.QueryParams.pagenum++
      this.getSearchData()
      console.log(this.QueryParams.pagenum)
    }
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.setData({
      goods:[]
    })
    this.QueryParams.pagenum = 1
    this.getSearchData()
  }
})