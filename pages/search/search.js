import regeneratorRuntime, { async } from '../../utils/runtime.js'
import { request } from '../../request/index'
Page({
  data: {
    goods:[],
    isFouce:false,
    inpvalue:''
  },
  TimeId : -1,
  handleInput(e){
    const {value} = e.detail

    if(!value.trim()){
      this.setData({
        isFouce:false
      })
      return; 
    }
    this.setData({
      isFouce:true
    })
    clearTimeout(this.TimeId)
    console.log(value)
    this.TimeId = setTimeout(() => {
      this.qsearch(value)
    },1000)
  
  },
  async qsearch(query){
    const res = await request({url:"/goods/qsearch",data:{query}})
    this.setData({
      goods:res.data.message
    })
  },
  handleCancle(){
    this.setData({
      isFouce:false,
      goods:[],
      inpvalue:''
    })
  }
})