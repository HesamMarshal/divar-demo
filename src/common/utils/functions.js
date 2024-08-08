const isTrue = (value) => ["true", "True", 1, true].includes(value);
const isFalse = (value) => ["false", "False", 0, false].includes(value);

const removePropertyInObject = (target = {}, propeties = []) => {
  for (const item of propeties) {
    delete target[item];
  }
  return target;
};
module.exports = {
  isTrue,
  isFalse,
  removePropertyInObject,
};
