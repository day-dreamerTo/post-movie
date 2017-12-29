const app = getApp()
let fetch = (option) => {
  // wx.showLoading({ title: 'Loading...' });
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.douBan_api + option.url,
      data: option.data,
      header: option.header || { 'Content-Type': 'json' },
      method: option.method || 'GET',
      dataType: 'json',
      success: resolve,
      fail() {
        wx.showLoading({
          title: '豆瓣又挂了...'
        });
        reject
      },
      complete() {
        setTimeout(() => {
          wx.hideLoading();
        }, 500);
      }
    })
  });
}
module.exports = fetch;

