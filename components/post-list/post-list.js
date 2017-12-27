Component({
  properties: {
    postList: {
      type: Array,
      value: [],
      // observer() {
      //   this.setData({
      //     posts: this.data.postList
      //   });
      // }
    }
  },
  attached() {
    // properties内的数据也用this.data来获取
    console.log(this.data.postList);
  },
  ready() {
    console.log(this.data.postList);
  },
  data: {
    // posts: []
  },
  methods: {

  }
});