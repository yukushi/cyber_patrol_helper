let id,sn;
// chrome.storage.local.clear();

//main.jsからのレスポンス受け取り，返答
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.id != undefined || request.sn != undefined){
        sendResponse({"msg":"[OK]"});
        id = request.id;
        sn = request.sn;

        let time = new Date();
        let keyNo;

        //通報情報の保存
        chrome.storage.local.get(["zCount"],function (value) {
            if(value.zCount == undefined){
                //初回の動作
                keyNo = 0;
                chrome.storage.local.set({
                    "zCount":"0",
                    [keyNo]:`${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}/${sn}/${id}`
                });
            }else{
                keyNo = Number(value.zCount) + 1;
                chrome.storage.local.set({
                    "zCount":keyNo,
                    [keyNo]:`${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}/${sn}/${id}`
                });
            }
            });

        // 保存内容の確認
        chrome.storage.local.get(function (value2) {
        console.log(value2);
        });

    }
});


//report.jsからのレスポンス受け取り，返答
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.res == 1){
        sendResponse({
            "id":id,
            "sn":sn
        });
    }
});