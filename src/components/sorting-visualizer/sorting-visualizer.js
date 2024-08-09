import ArrayListen from "../../utils/arrayListen.js";
import randomNumbersInRange from "../../utils/randomNumbersInRange.js";

export default class SortingVisualizer {
  #length;

  constructor() {
    // Para conservar el contexto de esta clase
    // al llamar al método #setStyle desde otro sitio
    // se utiliza this.#setStyle.bind(this)
    this.arr = new ArrayListen(this.#setStyle.bind(this));
    this.fillArray();

    this.#length = 1;
    this.#createBoxes();
  }

  #createBoxes() {
    const container = document.getElementById("sorting-visualizer-container");

    this.arr.value.map((n, i) => {
      const id = `bar-${i}`;

      const newDiv = document.createElement("div");
      newDiv.classList.add("bar");
      newDiv.id = id;
      this.#setWidth(newDiv, this.#length * n);

      container.appendChild(newDiv);
    });
  }

  fillArray() {
    this.arr.value = randomNumbersInRange(1, 200, 50);
  }

  #setWidth(element, height) {
    element.style.height = height + "px";
  }

  #setStyle(e) {
    const element = document.getElementById(`bar-${e.index}`);
    this.#setWidth(element, this.#length * e.item);
  }
}
