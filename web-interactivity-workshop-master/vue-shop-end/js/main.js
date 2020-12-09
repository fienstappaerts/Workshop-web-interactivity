const app = Vue.createApp({
  data() {
    return {
      name: "",
      styleLight: false,
      styleRegular: true,
      styleBlack: false,
    };
  },
  computed: {
    styleCount() {
      let count = 0;
      if (this.styleLight) {
        count += 1;
      }
      if (this.styleRegular) {
        count += 1;
      }
      if (this.styleBlack) {
        count += 1;
      }
      return count;
    },

    netPrice() {
      let letterPrice = 5;
      return this.name.length * letterPrice * this.styleCount;
    },
    total() {
      return this.netPrice + this.shipping;
      // How many styles are selected?
    },
    shipping() {
      if (this.netPrice < 50) {
        return 4;
      } else {
        return 0;
      }
    },
  },
});

const mountedApp = app.mount(".app");
