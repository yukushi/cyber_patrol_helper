let id,sn;

//main.jsからのレスポンス受け取り，返答
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.id != undefined || request.sn != undefined){
        sendResponse({"msg":"[OK]"});
        id = request.id;
        sn = request.sn;
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