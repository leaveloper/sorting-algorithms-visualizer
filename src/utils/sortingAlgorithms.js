import sleep from "./asyncSleep.js";

export default class SortingAlgorithms {
  #array;

  constructor(array) {
    this.#array = array;
  }

  // async bubble() { } no funciona, ya que utiliza
  // el contexto del botón que realiza la acción como
  // valor para 'this'
  bubble = async () => {
    const len = this.#array.value.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (this.#array[j] > this.#array[j + 1]) {
          [this.#array[j], this.#array[j + 1]] = [
            this.#array[j + 1],
            this.#array[j],
          ];
          await sleep(1);
        }
      }
    }
  };

  insertion = async () => {
    const len = this.#array.value.length;

    for (let i = 1; i < len; i++) {
      let current = this.#array[i];
      let j = i - 1;
      while (j >= 0 && this.#array[j] > current) {
        this.#array[j + 1] = this.#array[j];
        j--;
      }
      this.#array[j + 1] = current;
      await sleep(1);
    }
  };

  merge = async (
    arr = this.#array,
    left = 0,
    right = this.#array.value.length - 1
  ) => {
    if (left >= right) {
      return;
    }

    let middle = left + parseInt((right - left) / 2);

    await this.merge(arr, left, middle);
    await this.merge(arr, middle + 1, right);

    await this.#innerMerge(arr, left, middle, right);
  };

  #innerMerge = async (arr, left, middle, right) => {
    let l1 = middle - left + 1;
    let l2 = right - middle;

    let arr1 = new Array(l1);
    let arr2 = new Array(l2);

    for (let i = 0; i < l1; ++i) {
      arr1[i] = arr[left + i];
      await sleep(1);
    }
    for (let i = 0; i < l2; ++i) {
      arr2[i] = arr[middle + 1 + i];
      await sleep(1);
    }

    let i = 0,
      j = 0,
      k = left;

    while (i < l1 && j < l2) {
      if (arr1[i] < arr2[j]) {
        arr[k] = arr1[i];
        ++i;
      } else {
        arr[k] = arr2[j];
        j++;
      }
      k++;
      await sleep(1);
    }

    while (i < l1) {
      arr[k] = arr1[i];
      i++;
      k++;
      await sleep(1);
    }
    while (j < l2) {
      arr[k] = arr2[j];
      j++;
      k++;
      await sleep(1);
    }
  };

  selection = async () => {
    const len = this.#array.value.length;

    for (let i = 0; i < len - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < len; j++) {
        if (this.#array[j] < this.#array[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [this.#array[i], this.#array[minIndex]] = [
          this.#array[minIndex],
          this.#array[i],
        ];
        await sleep(1);
      }
    }
  };
}
