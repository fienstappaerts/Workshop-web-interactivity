console.log("loaded!!!!");

const app = Vue.createApp({
  data() {
    return {
      name: "Fien",
      catImage: "img/cat-sit.jpg",
    };
  },
  methods: {
    flipCat() {
      if (this.catImage.includes("sit")) {
        this.catImage = "img/cat-yawn.jpg";
      } else {
        this.catImage = "img/cat-sit.jpg";
      }
    },
  },
});

const mountedApp = app.mount(".app");
