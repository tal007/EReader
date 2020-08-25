const type = {
  isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
  },
};

export default type;
