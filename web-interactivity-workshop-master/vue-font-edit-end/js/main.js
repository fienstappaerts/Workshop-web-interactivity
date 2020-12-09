// prettier-ignore
const GLYPHS = {
  'A': [[0, 0], [4, 10], [8, 0]],
  'B': [[0, 0], [0, 10], [5, 10], [5, 5], [7, 5], [7, 0]],
  'C': [[0, 0], [0, 10], [8, 10], [8, 6], [3, 6], [3, 4], [8, 4], [8, 0]],
  'D': [[0, 0], [0, 3], [2, 3], [2, 7], [0, 7], [0, 10], [8, 10], [8, 0]],
  'E': [[0, 0], [0, 3], [0, 10], [8, 10], [8, 7], [3, 7], [3, 6], [5, 6], [5, 4], [3, 4], [3, 3], [8, 3], [8, 0]],
  'F': [[0, 0], [0, 3], [0, 10], [8, 10], [8, 7], [3, 7], [3, 6], [5, 6], [5, 3], [3, 3], [3, 0]],
  'G': [[0, 0], [0, 3], [0, 10], [8, 10], [8, 7], [3, 7], [3, 3], [5, 3], [5, 5], [8, 5], [8, 0]],
  'H': [[0, 0], [0, 3], [0, 7], [0, 10], [3, 10], [3, 7], [5, 7], [5, 10], [8, 10], [8, 0], [5, 0], [5, 3], [3, 3], [3, 0]],
  'I': [[0, 0], [0, 10], [3, 10], [3, 0]],
  'J': [[0, 0], [0, 3], [4, 3], [4, 10], [7, 10], [7, 0]],
  'K': [[0, 0], [0, 10], [3, 10], [3, 7], [5, 10], [8, 10], [5, 5], [8, 0], [5, 0], [3, 3], [3, 0]],
  'L': [[0, 0], [0, 10], [3, 10], [3, 3], [7, 3], [7, 0]],
  'M': [[0, 0], [0, 10], [3, 10], [4, 8], [5, 10], [8, 10], [8, 0], [5, 0], [5, 4], [4, 3], [3, 4], [3, 0]],
  'N': [[0, 0], [0, 10], [3, 10], [3, 9], [5, 7], [5, 10], [8, 10], [8, 0], [5, 0], [5, 3], [3, 5], [3, 0]],
  'O': [[0, 0], [0, 10], [7, 10], [7, 0]],
  'P': [[0, 0], [0, 10], [7, 10], [7, 4], [3, 4], [3, 0]],
  'Q': [[0, 0], [0, 10], [7, 10], [7, 0], [6, 0], [7, -1], [4, -1], [3, 0]],
  'R': [[0, 0], [0, 10], [7, 10], [7, 4], [5, 4], [7, 0], [4, 0], [3, 2], [3, 0]],
  'S': [[7, 10], [7, 7], [3, 7], [3, 6], [7, 6], [7, 0], [0, 0], [0, 3], [4, 3], [4, 4], [0, 4], [0, 10]],
  'T': [[2, 0], [2, 7], [0, 7], [0, 10], [7, 10], [7, 7], [5, 7], [5, 0]],
  'U': [[0, 0], [0, 10], [3, 10], [3, 3], [5, 3], [5, 10], [8, 10], [8, 0]],
  'V': [[0, 10], [3, 10], [4, 6], [5, 10], [8, 10], [5, 0], [3, 0]],
  'W': [[0, 10], [3, 10], [4, 6], [5, 8], [6, 6], [7, 10], [10, 10], [8, 0], [6, 0], [5, 3], [4, 0], [2, 0]],
  'X': [[0, 10], [3, 10], [4, 8], [5, 10], [8, 10], [5, 5], [8, 0], [5, 0], [4, 2], [3, 0], [0, 0], [3, 5]],
  'Y': [[0, 10], [3, 10], [4, 8], [5, 10], [8, 10], [5, 5], [5, 0], [3, 0], [3, 5]],
  'Z': [[0, 10], [7, 10], [7, 7], [3, 3], [7, 3], [7, 0], [0, 0], [0, 3], [4, 7], [0, 7]],
  '_': [[0, 0], [0, 1], [8, 1], [8, 0]]
};

const app = Vue.createApp({
  data() {
    return {
      glyphs: GLYPHS,
      gridSize: 50,
      currentGlyph: "A",
      currentIndex: 0,
    };
  },
  computed: {
    glyphNames() {
      return Object.keys(GLYPHS);
    },
    ticks() {
      let ticks = [];
      for (let i = 0; i < 2000; i += this.gridSize) {
        ticks.push(i);
      }
      return ticks;
    },
    glyphPoints() {
      return this.glyphs[this.currentGlyph].map(([x, y]) => this.pointToView(x, y));
    },

    glyphContour() {
      return this.glyphPoints.map(([x, y]) => `${x},${y}`).join(" ");
    },
  },
  methods: {
    pointToView(x, y) {
      return [this.gridSize * 2 + x * this.gridSize, (12 - y) * this.gridSize];
    },
    viewToPoint(x, y) {
      x = Math.round(x / this.gridSize) - 2;
      y = 12 - Math.round(y / this.gridSize);
      return [x, y];
    },
    handleMouseDown(index) {
      this.currentIndex = index;
      this.isDragging = true;
      window.addEventListener("mousemove", this.handleMouseDrag);
      window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseDrag(e) {
      if (!this.isDragging) return;
      e.preventDefault();
      const [x, y] = this.viewToPoint(e.offsetX, e.offsetY);
      this.glyphs[this.currentGlyph][this.currentIndex] = [x, y];
    },
    handleMouseUp(e) {
      e.preventDefault();
      window.removeEventListener("mousemove", this.handleMouseDrag);
      window.removeEventListener("mouseup", this.handleMouseUp);
    },
  },
});

const mountedApp = app.mount(".app");
