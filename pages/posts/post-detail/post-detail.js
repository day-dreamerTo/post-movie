let postsData = require('../../../data/posts-data.js');
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    postId: '',
    collected: false,
    isPlayingMusic: false
  },
  onMusicTap() {
    let isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
    } else {
      wx.playBackgroundAudio({
        // 不能用本地的音乐 只能用网络流媒体文件
        dataUrl: postsData.postsList[this.data.postId].music.url,
        title: postsData.postsList[this.data.postId].music.title,
        coverImgUrl: postsData.postsList[this.data.postId].music.coverImg
      });
      this.setData({
        isPlayingMusic: true
      });
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = this.data.postId;
    }
  },
  onColletionTap() {
    let self = this;
    this.setData({
      collected: !this.data.collected
    });
    wx.setStorage({
      key: this.data.postId,
      data: this.data.collected,
      success() {
        wx.showToast({
          // 这里不能用this.data.collected
          title: self.data.collected ? '收藏成功' : '取消成功',
          icon: 'success',
          duration: 2000
        })
      }
    });
  },
  onShareTap() {
    wx.showActionSheet({
      itemList: ['分享到微信好友', '分享到微博', '分享到QQ'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let globalData = app.globalData;
    let postId = options.id;
    this.setData({
      postId: postId
    });
    let postData = postsData.postsList[postId];
    // 这里不能用下面这句话？
    // this.data.postData = postData;
    this.setData({
      postData: postData
    });
    let self = this;
    let collected = wx.getStorage({
      key: postId,
      success: function (res) {
        self.setData({
          collected: res.data
        });
      },
    });
    // 初始化音乐播放状态
    if (app.globalData.g_isPlayingMusic && 
    app.globalData.g_currentMusicPostId == this.data.postId) {
      this.setData({
        isPlayingMusic: true
      });
    }
    // 监听全局的音乐播放的状态
    wx.onBackgroundAudioPlay(function () {
      if (app.globalData.g_currentMusicPostId == self.data.postId) {
        self.setData({
          isPlayingMusic: true
        });
      }
    });
    wx.onBackgroundAudioPause(function () {
      self.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})