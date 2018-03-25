function main(arr) {
	arr = uniqueArray(arr);
	var exist_list = [],
			new_list = [];
	for(var i=0;i<arr.length;i++) {
		var domainName = getDomainName(arr[i]);
		// 如果主域名不存在，则在exist_list和new_list中都加入
		if(exist_list.indexOf(domainName) == -1){
			exist_list.push(domainName);
			new_list.push(arr[i])
		}else{
			// 如果主域名已存在，则找到new_list中与该url主域名相同的元素,替换他
			for(var j=0;j<new_list.length;j++){
				// 找到主域名相等的，则替换并跳出循环
				if(getDomainName(new_list[j]) == domainName){
					//替换
					new_list.splice(j, 1, arr[i]);
					break;
				}
			}
		}
	}

	return new_list;
}

// 获取主域名
function getDomainName(url){
	var index = url.lastIndexOf('.');
	var tmp = url.slice(index);
	var url2 = url.slice(0, index);
	index = url2.lastIndexOf('.');
	if(index == -1){
		return url;
	}else{
		return url2.slice(index+1) + tmp;
	}
}

// arr去重
function uniqueArray(arr){
	var new_list = [];
	for(var i=0;i<arr.length;i++){
		if(new_list.indexOf(arr[i]) == -1){
			new_list.push(arr[i])
		}
	}
	return new_list;
}




console.log(main(['a.com', 'a.b.com', 'a.io', 'c.a.b.com', '*.a.io'])) // ["a.com", "c.a.b.com", "*.a.io"]
console.log(main(['b.a.io', 'a.io', '*.a.io'])); // ["*.a.io"]