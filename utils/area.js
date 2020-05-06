export const getSetting = () =>{
  return new Promise((resolve,reject) => {
    wx.getSetting({
      success: (res) => {
        resolve(res)
      },
      fail:(err) => {
        resolve(err)
      }
    })
  })
}

export const chooseAddress = () =>{
  return new Promise((resolve,reject) => {
    wx.chooseAddress({
      success: (res) => {
        resolve(res)
      },
      fail:(err) => {
        resolve(err)
      }
    })
  })
}

export const openSetting = () =>{
  return new Promise((resolve,reject) => {
    wx.openSetting({
      success: (res) => {
        resolve(res)
      },
      fail:(err) => {
        resolve(err)
      }
    })
  })
}

export const showModal = ({content}) => {
  return new Promise((resolve,reject) => {
    wx.showModal({
      title:'提示',
      content:content,
      success:(res) => {
        resolve(res)
      },
      fail:(err) => {
        reject(err)
      }
    })
  })
}

export const showToast = ({content}) => {
  return new Promise((resolve,reject) => {
    wx.showToast({
      title:content,
      icon: 'none',
      success:(res) => {
        resolve(res)
      },
      fail:(err) => {
        reject(err)
      }
    })
  })
}

export const login = () => {
  return new Promise((resolve,reject) => {
   wx.login({
     success: (res) => {
      resolve(res)
     },
     fail: (err) => {
       reject(err)
     }
   })
  })
}