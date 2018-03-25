import functions from './functions';

/**
 * find all functions whose name matches keyword
 * @param {string} keyword
 * @return {array}
 */

export default function (keyword) {
  keyword = keyword.toLowerCase();
  let result;
  let index = 0;
  const records = {};
  while(index < keyword.length && (!result || result.length > 0)) {
    const char = keyword.charAt(index);
    result = (result || functions).filter(func => {
      const end = records[func] || [0];
      for (let i = 0, len = end.length; i < len; i++) {
        if (end[i] === -1) {
          continue;
        }
        const start = end[i];
        if (func.charAt(start) === char) {
          end[i] += 1;
        } else {
          end[i] = -1;
        }
        const subStart = func.substr(start).indexOf(`-${char}`);
        if (subStart !== -1) {
          end.push(start + subStart + 2);
        }
      }
      if (end.every(start => start === -1)) {
        return false;
      }
      records[func] = end;
      return true;
    });
    index++;
  }
  result.forEach(func => {
    records[func] = records[func].find(key => {
      return key > -1;
    });
  });
  result.sort((funcA, funcB) => {
    return records[funcA] - records[funcB];
  });
  return result;
}