const app = Vue.createApp({
  data() {
    return {
      name: "Frederik",
      catImage: "./img/cat-sit.jpg",
    };
  },
  computed: {
    greeting() {
      const d = new Date();
      const hour = d.getHours();
      let greeting;
      if (hour <= 6 || hour >= 22) {
        greeting = "Good night, " + this.name;
      } else if (hour < 12) {
        greeting = "Good morning, " + this.name;
      } else if (hour < 18) {
        greeting = "Good afternoon, " + this.name;
      } else if (hour < 22) {
        greeting = "Good evening, " + this.name;
      }
      return greeting;
    },
  },
  methods: {
    flipCat() {
      if (this.catImage.includes("sit")) {
        this.catImage = "./img/cat-yawn.jpg";
      } else {
        this.catImage = "./img/cat-sit.jpg";
      }
    },
  },
});

const mountedApp = app.mount(".app");
