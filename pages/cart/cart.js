// pages/cart/cart.js
import regeneratorRuntime from '../../utils/runtime.js'
import {getSetting,chooseAddress,openSetting,showModal,showToast} from '../../utils/area'
Page({
  data:{
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    const address = wx.getStorageSync('address')||{}
    const cart = wx.getStorageSync('cart') || []
    this.setData({
      address
    })
    this.setCart(cart)
  },
    async handleAddress(){
      try {
        const res1 = await getSetting()
      const scope = res1.authSetting["scope.address"]
      if(scope===false){
        await openSetting()
      }
      const address = await chooseAddress()
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
      wx.setStorageSync('address', address)
      } catch (error) {
        console.log(error)
      }
    },
    handleCheck(e){
      const {id} = e.currentTarget.dataset;
      console.log(id)
      let {cart} = this.data
      const index = cart.findIndex(v => v.goods_id === id)
      // console.log(index)
      cart[index].checked = !cart[index].checked
      this.setCart(cart)
    },
    handleAllChecked(){
      let {cart,allChecked} = this.data
      allChecked = !allChecked
      cart.forEach(v => v.checked = allChecked)
      this.setCart(cart)
    },
    async handleNumEdit(e){
      const {id,operation} = e.currentTarget.dataset
      let {cart} = this.data
      // console.log(typeof(id),typeof(cart[0].goods_id))
      const index = cart.findIndex(v => v.goods_id == id)
      console.log(cart[index].num)
      if(cart[index].num === 1 && operation === -1){
        const res = await showModal({content:"您是否要删除该商品?"})
        if(res.confirm){
          cart.splice(index,1)
          this.setCart(cart)
        }
      }else{
        cart[index].num += operation
        this.setCart(cart)
      }
    },
    setCart(cart){
      let allChecked = true
      let totalPrice = 0
      let totalNum = 0
      cart.forEach(v => {
        if(v.checked){
          totalPrice+= v.goods_price * v.num
          totalNum += v.num  
        }else{
          allChecked = false
        }
      })
      allChecked = cart.length!=0?allChecked:false
      this.setData({
        cart,
        allChecked,
        totalPrice,
        totalNum
      })
      wx.setStorageSync('cart', cart)
    },
    async handlePay(){
      const {address,totalNum} = this.data
      if(!address.userName){
        await showToast({content:"您还没有选择地址"})
        return;
      }
      if(totalNum === 0){
        await showToast({content:"您还没有选择商品"})
        return
      }
      wx.navigateTo({
        url: '/pages/pay/pay',
      })
    }
})