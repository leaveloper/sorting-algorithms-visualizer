import AlgorithmList from "./components/algorithm-list/algorithm-list.js";
import SortingVisualizer from "./components/sorting-visualizer/sorting-visualizer.js";
import Event from "./consts/eventTypes.js";
import Sort from "./consts/sortTypes.js";
import ArrayListen from "./utils/arrayListen.js";
import randomNumbersInRange from "./utils/randomNumbersInRange.js";
import SortingAlgorithms from "./utils/sortingAlgorithms.js";

const minRandomNumber = 1;
const maxRandomNumber = 200;
const maxNumbers = 50;

function fillArray(array) {
  array.value = randomNumbersInRange(
    minRandomNumber,
    maxRandomNumber,
    maxNumbers
  );
}

function initialize() {
  const sortingVirtualizer = new SortingVisualizer();

  // Para conservar el contexto de esta clase
  // al llamar al método setStyle desde otro sitio
  // se utiliza sortingVirtualizer.setStyle.bind(sortingVirtualizer)
  const array = new ArrayListen(
    sortingVirtualizer.setStyle.bind(sortingVirtualizer)
  );
  fillArray(array);

  sortingVirtualizer.createBoxes(array);

  const sortingAlgorithms = new SortingAlgorithms(array);

  const sortDict = {
    [Sort.BUBBLE]: sortingAlgorithms.bubble,
    [Sort.HEAP]: {},
    [Sort.INSERTION]: sortingAlgorithms.insertion,
    [Sort.MERGE]: sortingAlgorithms.merge,
    [Sort.QUICK]: {},
    [Sort.RADIX]: {},
    [Sort.SELECTION]: sortingAlgorithms.selection,
  };

  const algorithmList = new AlgorithmList(sortDict);
  Object.defineProperty(algorithmList, "done", {
    set(value) {
      if (!value) {
        fillArray(array);
      }
    },
  });
}

document.addEventListener(Event.MAIN_LOADED, () => {
  initialize();
});
