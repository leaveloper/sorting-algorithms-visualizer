export default class ArrayListen {
  constructor(callBack = () => {}) {
    const isNumeric = (string) => Number.isFinite(+string);

    return new Proxy(this, {
      set: (target, property, value) => {
        if (!isNumeric(property)) {
          const preValue = target[property];
          target[property] = value;

          if (preValue) {
            for (let i = 0; i < value.length; i++) {
              callBack({ index: i, item: value[i] });
            }
          }
        } else {
          target.value[property] = value;
          callBack({ index: property, item: value });
        }

        return true;
      },
      get: (target, property) => {
        if (property in target) {
          return target[property];
        } else if (!isNaN(property)) {
          return target.value[property];
        }
      },
    });
  }
}
