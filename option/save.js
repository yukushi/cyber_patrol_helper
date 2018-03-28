//テーブル見出し
let allObj = [["No","Date","Site","Category","Reason","User_ID","URL"]];

//CSV化関数
//参考：http://amazarashi.me/archives/901
function exportcsv(allObj){
	var finalVal = '';
	for (var i = 0; i < allObj.length; i++) {
	  var value = allObj[i];
  
	  for (var j = 0; j < value.length; j++) { var innerValue = value[j]===null?'':value[j].toString(); var result = innerValue.replace(/"/g, '""'); if (result.search(/("|,|\n)/g) >= 0)
		result = '"' + result + '"';
		if (j > 0)
		finalVal += ',';
		finalVal += result;
	  }
	  finalVal += '\n';
	}
  
	//set csv-data to a-tag on html
	var download = document.getElementById('download');
	download.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(finalVal));
	download.setAttribute('download', 'test.csv');
  }

//ローカルストレージの処理
chrome.storage.local.get(function (localData) {
	for(let key in localData){
		if(key!="zCount"){

			let obj,table,tr,trs,time,sn,id,urltd,url;
			let s,t,u;

			 obj = localData[key].split("/");

			//ソースキモすぎ，他のやり方模索中
			//insertRow,insertCellを使うとよさそう
			table = document.getElementById("repoTable")
			tr = document.createElement('tr');
			trs = table.appendChild(tr);

			time = document.createElement('td');
			sn = document.createElement('td');
			id = document.createElement('td');
			urltd = document.createElement('td');
			url = `https://twitter.com/${obj[1]}/status/${obj[2]}`;

			trs.appendChild(time).innerText=obj[0];
			trs.appendChild(sn).innerText=obj[1];
			trs.appendChild(id).innerText=obj[2];
			trs.appendChild(id).innerHTML=`<a href="${url}">${url}</a>`;

			timeCSV = obj[0];//date
			idCSV = obj[1];//id

			//CSV用にIDをURLに置き換えて追加
			obj = [key, timeCSV, "Twitter", "", "", idCSV, url];
			allObj.push(obj);
		}
	}
	self.exportcsv(allObj);
});