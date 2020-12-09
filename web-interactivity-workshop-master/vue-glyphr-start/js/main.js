const GLYPHS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const app = Vue.createApp({
  data() {
    return {
      glyphs: GLYPHS,
      currentGlyph: "A",
      currentStyle: "regular",
    };
  },
});

const mountedApp = app.mount(".app");
