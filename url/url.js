import {forOwn, mapValues} from 'lodash';

export default function uniqueURLs (urls) {
  if (!urls || urls.length === 0) {
    return [];
  }

  const splited = urls.map(url => url.split('.'));
  const uniqued = uniqueDomain(splited, 0);

  return uniquedToArray(uniqued).sort(sortOn);
}

function sortOn(a, b) {
  const arrA = a.split('.');
  const arrB = b.split('.');
  let isFirst = true;
  while (arrA.length > 0 && arrB.length > 0) {
    a = arrA.pop();
    b = arrB.pop();
    let result;
    if (isFirst && (a === 'com' || b === 'com')) {
      result = (b === 'com') - (a === 'com');
    } else {
      result = a === b ? 0 : (a < b ? -1 : 1);
    }
    isFirst = false;
    if (result !== 0) {
      return result;
    }
  }
  return arrA.length - arrB.length;
}

function uniqueDomain(list, position) {
  const map = {};
  let isWildcard = false;
  list.forEach(parts => {
    if (isWildcard) {
      return;
    }
    if (position > parts.length - 1) {
      map[parts.join('.')] = null;
      return;
    }
    const key = parts.length - 1 - position;
    if (parts[key] === '*') {
      isWildcard = true;
      return;
    }

    const domain = parts.slice(key).join('.');
    if (domain in map) {
      map[domain].push(parts);
    } else {
      map[domain] = [parts];
    }
  });

  return isWildcard ? '*' : mapValues(map, parts => {
    return !parts || parts.length === 1 ? parts : uniqueDomain(parts, position + 1);
  });
}

function uniquedToArray(obj, result = []) {
  forOwn(obj, (value, key) => {
    if (value === '*') {
      result.push(`*.${key}`);
    } else if (value === null) {
      result.push(key);
    } else if (value.length === 1) {
      result.push(value[0].join('.'));
    } else {
      uniquedToArray(value, result);
    }
  });
  return result;
}
