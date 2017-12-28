let app = getApp();
Component({
  properties: {
    // 这里不能用movieClass:{}
    topMovies: {
      type: null,
      observer(newVal) {
        if (newVal.subjects && newVal.subjects.length) {
          this.setData({
            topThree: newVal.subjects.slice(0, 3)
          })
        }
      }
    }
  },
  data: {
    topThree: []
  },
  methods: {
    onMoreTap() {
      // app.globalData.movieSet = this.data.topMovies;
      wx.navigateTo({
        url: '/pages/movies/more-movies/more-movies?title=' + this.data.topMovies.title,
      })
    }
  }
})