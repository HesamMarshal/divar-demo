const isTrue = (value) => ["true", "True", 1, true].includes(value);
const isFalse = (value) => ["false", "False", 0, false].includes(value);

module.exports = {
  isTrue,
  isFalse,
};
