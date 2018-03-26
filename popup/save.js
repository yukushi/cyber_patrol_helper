// 保存内容の確認

chrome.storage.local.get(function (localData) {
	for(let key in localData){
		if(key!="zCount"){
			// console.log(localData[key]);
			let obj = localData[key].split("/");
			console.log(obj);

			//ソースキモすぎ，他のやり方模索中
			let table = document.getElementById("repoTable")
			let tr = document.createElement('tr');
			let trs = table.appendChild(tr);

			let time = document.createElement('td');
			let sn = document.createElement('td');
			let id = document.createElement('td');

			trs.appendChild(time).innerText=obj[0];
			trs.appendChild(sn).innerText=obj[1];
			trs.appendChild(id).innerText=obj[2];
			

		}
	}
});

