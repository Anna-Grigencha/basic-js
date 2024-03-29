const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (Array.isArray(arr) === false) {
    throw new Error("'arr' parameter must be an instance of the Array!")
  }
  else {

    let resultWithEmpty = [];
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '--double-next' && arr[i + 1] !== undefined) {
        resultWithEmpty.push(arr[i + 1]);
      }

      if (arr[i] === '--double-prev' && arr[i - 1] !== undefined && arr[i - 2] !== '--discard-next') {
        resultWithEmpty.push(arr[i - 1]);
      }
      if (arr[i] === '--discard-prev' && resultWithEmpty.length !== 0) {
        resultWithEmpty.pop();
      }
      if (arr[i] === '--discard-next' && arr.length !== i + 1) {

        resultWithEmpty.push("empty");
        i = i + 1;

      }
      else if (arr[i] !== '--double-next' && arr[i] !== '--double-prev' && arr[i] !== '--discard-prev' && arr[i] !== '--discard-next') {
        resultWithEmpty.push(arr[i]);
      }
    }

    for (let i = 0; i < resultWithEmpty.length; i++) {
      if (resultWithEmpty[i] !== "empty") {
        result.push(resultWithEmpty[i]);
      }
    }
    console.log(result);
    return result;
  }
}
module.exports = {
  transform
};
