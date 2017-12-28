// pages/movie/movie.js
const app = getApp();
const fetch = require('../../utils/fetch.js');
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
    wx.showLoading({ title: 'Loading...' });
    fetch({
      url: top250_url,
      method: 'GET',
      header: {
        'Content-Type': 'json'
      }
    }).then((res) => {
      // 箭头函数的this指的是当前定义这个箭头函数的环境，而不是调用方
      this.setData({
        topMovies: res.data
      })
    });
    fetch({
      url: inTheater_url,
      method: 'GET',
      header: {
        'Content-Type': 'json'
      }
    }).then((res) => {
      this.setData({
        theaterMovies: res.data
      })
    })
    // this.getMovies(top250_url, (res) => {
    //   this.setData({
    //     topMovies: res.data
    //   })
    // });
    // this.getMovies(inTheater_url, (res) => {
    //   this.setData({
    //     theaterMovies: res.data
    //   })
    // });
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
        if (_this.data.count === 2) {
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