//app.js
App({
  // 保存全局的数据, 当应用退出时就被清空；
  // 缓存中的数据除非手动清除否则一直存在
  globalData: {
    // 保存音乐播放状态
    g_isPlayingMusic: false, 
    g_currentMusicPostId: null,
    douBan_api: 'https://api.douban.com/',
    movieSet: {},
    movie: {}
  },
  onLaunch() {
    // console.log('onLaunch')
  },
  onShow() {
    // console.log('onshow')
  },
  onHide() {
    // console.log('onhide')
  }
})