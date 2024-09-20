

/**
 * Filters an array of objects based on a key-value pair.
 * @param {Array} array 
 * @param {string} key 
 * @param {string} value 
 * @returns {Array} 
 */
const filterArrayByKeyValue = (array, key, value) => {
    return array.filter(item => item[key] === value);
  };
  
  
  export default filterArrayByKeyValue;
  