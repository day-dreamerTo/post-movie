// pages/movies/more-movie/more-movie.js
const app = getApp();
const fetch = require('../../../utils/fetch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMovies: [],
    isHideLoadMore: true,
    isNoMoreData: false,
    url: '',
    title: '',
    start: 0,
    count: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let title = options.title;
    this.setData({ title });
    let top250_url = 'v2/movie/top250';
    let inTheater_url = 'v2/movie/in_theaters';
    if (title == '豆瓣电影Top250') {
      this.setData({ url: top250_url });
    } else {
      this.setData({ url: inTheater_url });
    }
    fetch({
      url: this.data.url + '?start=' + this.data.start + '&count=' + this.data.count
    }).then((res) => {
      this.setData({
        topMovies: res.data.subjects
      });
    })
    // this.setData({
    //   topMovies: app.globalData.movieSet
    // });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 只能在onReady中
    wx.setNavigationBarTitle({
      title: this.data.title
    })
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
    this.setData({
      start: 0, 
      count: 20, 
      isHideLoadMore: true,
      isNoMoreData: false
    });
    fetch({ url: this.data.url }).then((res) => {
      this.setData({
        topMovies: res.data.subjects
      });
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({ isHideLoadMore: false });
    let newStart = this.data.start + 20;
    this.setData({ start: newStart });
    let baseUrl = this.data.url + '?start=' + newStart + '&count=' + this.data.count;
    fetch({ url: baseUrl }).then((res) => {
      if (!res.data.subjects.length) {
        this.setData({
          isNoMoreData: true,
          isHideLoadMore: true
        });
        return;
      }
      let arr = this.data.topMovies.concat(res.data.subjects);
      this.setData({ topMovies: arr });
      setTimeout(() => {
        this.setData({
          isHideLoadMore: true
        });
      }, 2000);
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})