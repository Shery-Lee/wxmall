import regeneratorRuntime from '../../utils/runtime.js'
import { request } from '../../request/index'
import {showToast} from '../../utils/area'
Page({
  data:{
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    const address = wx.getStorageSync('address')||{}
    let cart = wx.getStorageSync('cart') || []
    cart = cart.filter(v => v.checked)
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      totalPrice+= v.goods_price * v.num
      totalNum += v.num  
    })
    this.setData({
      address,
      cart,
      totalPrice,
      totalNum
    })
  },
  async handlePay(){
    try {
      const token =wx.getStorageSync('token')
      if(!token){
        wx.navigateTo({
          url: '/pages/auth/auth',
        })
      }
      //创建订单
      const header = {Authorization:token}
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address.all
      const cart = this.data.cart
      let goods = [] 
      cart.forEach(v => goods.push({
        goods_id:v.goods_id,
        goods_number:v.num,
        goods_price:v.goods_price})
      )
      const orderParams = {
        order_price,consignee_addr,goods
      }
      const res = await request({url:'/my/orders/create',data:orderParams,method:"POST",header})
      await showToast({content:"无效的TOKEN"})
      //删除支付成功的商品
      let newCart = wx.getStorageSync('cart')
      newCart = newCart.filter(v => !v.checked)
      wx.setStorageSync('cart', newCart)
    } catch (error) {
      console.log(error)
    }
  }
})