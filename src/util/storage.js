import type from './type';

const { localStorage } = window;

const storage = {
  set(key, value) {
    if (type.isObject(value)) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },
  get(key) {
    return localStorage.getItem(key);
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};

export default storage;
