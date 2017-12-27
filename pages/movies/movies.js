// pages/movie/movie.js
let app = getApp();
Page({
  data: {
    topMovies: {},
    theaterMovies: {},
    count: 0
  },
  onLoad: function (options) {
    let _this = this;
    let top250_url = 'v2/movie/top250';
    let inTheater_url = 'v2/movie/in_theaters';
    wx.showLoading({
      title: 'loading...',
      mask: true
    });
    this.getMovies(top250_url, (res) => {
      this.setData({
        topMovies: res.data
      })
    });
    this.getMovies(inTheater_url, (res) => {
      this.setData({
        theaterMovies: res.data
      })
    });
  },
  getMovies(url, callback) {
    let _this = this;
    wx.request({
      url: app.globalData.douBan_api + url,
      method: 'GET',
      header: {
        'Content-Type': 'json'
      },
      success(res) {
        _this.data.count++;
        if(_this.data.count === 2) {
          wx.hideLoading();
        }
        callback && callback(res);
      },
      fail() {
        wx.hideLoading();
      }
    })
  }
})