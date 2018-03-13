'use strict'
// var run2 = require("./runoob2.js");
// document.write(run2);
let before = [
    'meathill.me',
    '0.cn',
    'a.com',
    'a.b.com',
    'a.io',
    '*.a.b.com',
    'b.com',
    'meathill.me',
    '0.cn',
];
let expect = [
  'a.com',
  'b.com',
  '*.a.b.com',
  '0.cn',
  'a.io',
  'meathill.me',
];

function fnSetUrls(_aUrl){
    // Array.from 可以把类数组对象(array-like obj)和可迭代对象(iterable objects -- eg:Map or Set)转为常规数组。。。
    var cacheUrl, aUrl = Array.from(new Set(_aUrl));
    cacheUrl = aUrl.filter(function(ele, ind) {
            if(ele[0] === '*'){
                aUrl.splice(ind, 1);
                return ele
            }
        });   

    cacheUrl.forEach(function(item, count){ // *
        var cacheUrl_item = item.slice(-(item.length - 2), -1) + item.slice(-1);
        aUrl.forEach(function(unit, sub){   // .
            var aUrl_item = unit.slice(-(item.length), -1) + unit.slice(-1);
            if( cacheUrl_item === aUrl_item ) aUrl.splice(sub, 1);
        })
    })
    return [...aUrl, ...cacheUrl];// 最后的结果
}


// 测试用例:
console.log(
    fnSetUrls(before)
)
console.log(
    fnSetUrls(expect)
)