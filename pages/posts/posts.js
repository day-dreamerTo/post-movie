// 只能用相对路径
let postsData = require('../../data/posts-data.js');
// 数据单向绑定
Page({
  data: {
   // 小程序种事会读取data对象来做数据绑定，这个动作是在onload事件执行之后发生的
    imgUrls: [
   '/images/iqiyi.png',   '/images/vr.png',   '/images/wx.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad() {
    // 这种方法不可以
    // this.data.posts_key = postsData.postsList;
    this.setData({
      posts_key: postsData.postsList
    });
  },
  onReady() {

  },
  // 从swiper-item 冒泡到swiper
  onSwiperTap(event) {
    // target 指的是当前点击的组件
    // currentTarget指的是事件捕获的组件
    console.log(event);
  },
  onPostTap(event) {
    let postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    console.log(e);
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})