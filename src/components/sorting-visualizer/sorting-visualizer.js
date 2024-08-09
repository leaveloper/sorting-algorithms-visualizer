import ArrayListen from "../../utils/arrayListen.js";
import randomNumbersInRange from "../../utils/randomNumbersInRange.js";
import SortingAlgorithms from "../../utils/sortingAlgorithms.js";

const container = document.getElementById("sorting-visualizer-container");

const arr = new ArrayListen(setStyle);
fillArray();

const sortingAlgorithms = new SortingAlgorithms(arr.value);
let length = 1;

arr.value.map((n, i) => {
  const id = `block-${i}`;

  const newDiv = document.createElement("div");
  newDiv.classList.add("bar");
  newDiv.id = id;
  setWidth(newDiv, length * n);

  container.appendChild(newDiv);
});

function fillArray() {
  arr.value = randomNumbersInRange(1, 200, 50);
}

function setWidth(element, height) {
  element.style.height = height + "px";
}

function setStyle(e) {
  const element = document.getElementById(`block-${e.index}`);
  setWidth(element, length * e.item);
}
