import {request} from '../../request/index'
Page({
  data: {
    goodsList:{},
    goods_id:null,
    isCollect:false
  },
  goodsInfo:{},
  onShow: function () {
    const page = getCurrentPages()
    const currentPage = page[page.length - 1]
    const options = currentPage.options
    this.data.goods_id = options.goods_id
    this.getGoodsDetail()
  },
  getGoodsDetail(){
    request({url:'/goods/detail',data:{goods_id:this.data.goods_id}}).then(res => {
      this.goodsInfo = res.data.message
      let collent = wx.getStorageSync('collect') || []
      let isCollect = collent.some(v => v.goods_id === this.goodsInfo.goods_id)
      console.log(this.goodsInfo)
      this.setData({
        goodsList:{
          goods_id:res.data.message.goods_id,
          goods_name:res.data.message.goods_name,
          goods_price:res.data.message.goods_price,
          pics:res.data.message.pics,
          goods_introduce:res.data.message.goods_introduce
        },
        isCollect
      })
    })
  },
  handleImgClick(e){
    const index = e.currentTarget.dataset.index
    const urls = this.data.goodsList.pics.map(v=>v.pics_mid)
    console.log(urls)
    wx.previewImage({
      current: urls[index], // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  handeleAddCart(){
    let cart = wx.getStorageSync('cart')||[]
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id)
    if(index=== -1){
      this.goodsInfo.num=1
      this.goodsInfo.checked = true
      cart.push(this.goodsInfo)
    }else{
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '添加购物车成功',
      mask:true
    })
  },
  handleCollect(){
    // this.data.isCollect = !this.data.isCollect
    const collect = wx.getStorageSync('collect') || []
    const index = collect.findIndex(v => v.goods_id === this.goodsInfo.goods_id)
    if(index !== -1){
      //收藏过 删除
      collect.splice(index,1)
    }else{
      //没有收藏
      collect.push(this.goodsInfo)
    }
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect:!this.data.isCollect
    })
  }
})