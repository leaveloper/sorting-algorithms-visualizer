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

  heap = async () => {
    let N = this.#array.value.length;

    for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
      await this.#innerHeap(this.#array, N, i);

    for (var i = N - 1; i > 0; i--) {
      var temp = this.#array[0];
      this.#array[0] = this.#array[i];
      await sleep(1);
      this.#array[i] = temp;
      await sleep(1);
      await this.#innerHeap(this.#array, i, 0);
    }
  };

  #innerHeap = async (arr, N, i) => {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < N && arr[l] > arr[largest]) largest = l;

    if (r < N && arr[r] > arr[largest]) largest = r;

    if (largest != i) {
      let swap = arr[i];
      arr[i] = arr[largest];
      await sleep(1);
      arr[largest] = swap;
      await sleep(1);
      await this.#innerHeap(arr, N, largest);
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
        await sleep(1);
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

  quick = async (
    arr = this.#array,
    low = 0,
    high = this.#array.value.length - 1
  ) => {
    if (low >= high) return;
    let pi = await this.#innerQuick(arr, low, high);

    await this.quick(arr, low, pi - 1);
    await this.quick(arr, pi + 1, high);
  };

  #innerQuick = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        await sleep(1);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    await sleep(1);
    return i + 1;
  };

  radix = async () => {
    const arr = this.#array.value;
    if (arr.length <= 1) return;

    const max = Math.max(...arr);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
      await this.#countingSort(this.#array, exp);
      exp *= 10;
    }
  };

  #countingSort = async (arr, exp) => {
    const n = arr.value.length;
    const count = new Array(10).fill(0);
    const output = new Array(n);

    // Contar las ocurrencias de cada dígito en la posición actual
    for (let i = 0; i < n; i++) {
      const index = Math.floor(arr[i] / exp) % 10;
      count[index]++;
    }

    // Transformar `count` para que contenga posiciones reales
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Construir la salida
    for (let i = n - 1; i >= 0; i--) {
      const index = Math.floor(arr[i] / exp) % 10;
      output[count[index] - 1] = arr[i];
      count[index]--;
    }

    // Copiar la salida al array original
    for (let i = 0; i < n; i++) {
      if (this.#array[i] !== output[i]) {
        this.#array[i] = output[i];
        await sleep(1);
      }
    }
  };

  selection = async () => {
    const len = this.#array.value.length;

    for (let i = 0; i < len - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < len; j++) {
        if (this.#array[j] < this.#array[minIndex]) {
          minIndex = j;
          await sleep(1);
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
