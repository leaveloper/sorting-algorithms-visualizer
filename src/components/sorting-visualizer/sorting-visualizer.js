export default class SortingVisualizer {
  #length;

  constructor() {
    this.#length = 1;
  }

  createBoxes(array) {
    const container = document.getElementById("sorting-visualizer-container");

    array.value.map((n, i) => {
      const id = `bar-${i}`;

      const newDiv = document.createElement("div");
      newDiv.classList.add("bar");
      newDiv.id = id;
      this.#setWidth(newDiv, this.#length * n);

      container.appendChild(newDiv);
    });
  }

  #setWidth(element, height) {
    element.style.height = height + "px";
  }

  setStyle(e) {
    const element = document.getElementById(`bar-${e.index}`);
    this.#setWidth(element, this.#length * e.item);
  }
}
