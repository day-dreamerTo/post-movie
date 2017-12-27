let app = getApp();
Component({
  properties: {
    movie: Object
  },
  methods: {
    onMovieTap() {
      app.globalData.movie = this.data.movie;
      wx.navigateTo({
        url: '/pages/movies/movie-detail/movie-detail'
      })
    }
  }
})