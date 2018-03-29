//テーブル見出し
let allObj = [["No","Date","Site","Category","Reason","User_ID","URL"]];
let keyLength,fullCountNo;

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

	//現在の通報数取得
	keyLength = Object.keys(localData).length;

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
	//データがあるときのみCSV化
	if(allObj.length != 1) self.exportcsv(allObj);
});

//通報数の表示
chrome.storage.local.get("zCount",function(value){
	fullCountNo = value.zCount;

	//０の場合に0と表示されるよう調整
	if (fullCountNo == undefined){
		fullCountNo = -1;
		keyLength = 1;
	}
	document.getElementById("fullCountNo").innerText = "今までの総通報数：" + Number(fullCountNo+1);
	document.getElementById("countNo").innerText = "現在の通報数：" + Number(keyLength-1);
});

//リセットボタン処理
document.getElementById("reset").onclick = function(){
	let full,current,x;
	full = fullCountNo;
	current = keyLength-2;
	x = full - current;

	//データがあるときのみリセット有効
	if(keyLength-1 > 0){
		let result = window.confirm(keyLength-1 + "件が削除されます (総通報数はリセットされません)\n本当によろしいですか？");
		if(result){
			for(x; x <= fullCountNo; x++){
				chrome.storage.local.remove(`${x}`, function() {
				});			
			}
			alert("完了");
			location.reload();
		}
	}
}

//総数リセットボタン処理
document.getElementById("countReset").onclick = function(){
	let result = window.confirm("総数含め，全て消去されます");
	if(result){
		try{
			chrome.storage.local.clear();
			alert("完了");
			location.reload();
		}catch(e){
			alert("Error");
		}
	}
}