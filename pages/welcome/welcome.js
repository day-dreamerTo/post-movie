Page({
  onTap() {
    // 不能加.wxml
    wx.switchTab({
      url: "../posts/posts"
    });
    // 同级页面之间的跳转
    // wx.redirectTo({
    //   url: "../posts/post"
    // });
  },
  onUnload() {
    // wx.redirectTo
    // console.log('onunload')
  },
  onHide() {
    // wx.navigateTo
    // console.log('onhide')
  }
})