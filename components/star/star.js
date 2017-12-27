Component({
  properties: {
    score: {
      type: String,
      observer(newVal) {
        let num = parseInt(newVal);
        let arr = [];
        for (let i = 0; i < 5; i++) {
          if (i*2 <= num) {
            arr.push(1);
          } else {
            arr.push(0);
          }
        }
        this.setData({
          stars: arr 
        });
      }
    }
  },
  data: {
    stars: []
  }
})