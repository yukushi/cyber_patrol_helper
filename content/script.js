 $(function(){
    //クラス取得
    var head = document.getElementsByClassName("heading");

    //休日休暇の項目を取得
    for(var num = 0; num<head.length; num++)
        if(head[num].textContent == "休日休暇") break;
    
    //休日休暇の項目が見つからない時
    if((head[num].textContent == "休日休暇")==false){
        console.log("見つからない");
    }
    //テキストのみ抽出
    var yasumiText = head[num].nextElementSibling.textContent;
    
    //特定文字が出現した場合のみ実行
    if(yasumiText.indexOf("年間休日") > -1 || yasumiText.indexOf("年間") > -1){ 
        //（年間）休日xxx日という場合のインデックス取得
        if(yasumiText.indexOf("年間休日") > -1){
            var nenkanIndex = yasumiText.indexOf('年間休日');
        }else{
            var nenkanIndex = yasumiText.indexOf('年間');
        }
        
        var nissuIndex = yasumiText.indexOf('日以上',nenkanIndex+4);

        if(nissuIndex == -1){
            nissuIndex = yasumiText.indexOf('日',nenkanIndex+4);
            var cmp = 1;
        }

        //インデックスの調整
        if(cmp){
            var resultYasumi = yasumiText.substring(nenkanIndex,nissuIndex+1);
        }else{
            var resultYasumi = yasumiText.substring(nenkanIndex,nissuIndex+3);
        }
        // console.log(nenkanIndex + "~" +  nissuIndex);
        // console.log(yasumiText.substring(nenkanIndex,nissuIndex+1));

        $('body').append(`
        <div class="pop">
        <div class="poptitle">休日数チェッカー</div><br>
        ${resultYasumi}
        </div>
        </style>
        `);

    }else{
        $('body').append(`
        <div class="pop">
        <div class="poptitle">休日数チェッカー</div><br>
        <div class="tyu">注意</div>
        年間休日数不明
        </div>
        </style>
        `);
    }
    
 });