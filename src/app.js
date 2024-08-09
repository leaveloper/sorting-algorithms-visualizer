import AlgorithmList from "./components/algorithm-list/algorithm-list.js";
import SortingVisualizer from "./components/sorting-visualizer/sorting-visualizer.js";
import Event from "./consts/eventTypes.js";
import Sort from "./consts/sortTypes.js";
import SortingAlgorithms from "./utils/sortingAlgorithms.js";

function initialize() {
  const sortingVirtualizer = new SortingVisualizer();

  const sortingAlgorithms = new SortingAlgorithms(sortingVirtualizer.arr);

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
  algorithmList.createCards();
}

document.addEventListener(Event.MAIN_LOADED, () => {
  initialize();
});
