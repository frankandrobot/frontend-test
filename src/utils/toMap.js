/**
 * transforms an array to a map with items converted to keys
 * @param {Array} arr
 * @returns {Array}
 */
export default function toMap(arr) {
  return arr.reduce((total, cur) => Object.assign(total, { [cur]: true }), {});
}
