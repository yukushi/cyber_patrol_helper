//DOM変化時に実行する関数
function setButton(){
    // let tweet = document.getElementsByClassName("js-stream-tweet");
    let tweet = document.getElementsByClassName("ProfileTweet-actionList");
    let len = tweet.length;
    
    //ツイートの差異発生で実行
    //（トレンド等の変化による無駄なリソース消費対策）
    let diff = tweet.length - count;
    count = tweet.length;

    //URL取得
    let newUrl = location.href;
    
    if(newUrl != oldUrl){
        changeURL = 1;
        oldUrl = newUrl;
    }

    console.log("diff=" + diff);
    console.log("count=" +count);
    
    //タイムラインの変化があったら実行，URL移動があったら無制限に実行
    if(diff > 0 || changeURL == 1){
        changeURL = 0;
        for(let i = 0;i<len;i++){
            let twAction = document.getElementsByClassName("ProfileTweet-actionList")[i];

            //要素数
            let twActionChild = twAction.childElementCount;

            //2重設置回避
            if(twActionChild==4){

                //タイムライン用
                //ツイートIDとスクリーンネーム取得
                let oya = twAction.parentNode.parentNode.parentNode;
                let tweetId = oya.getAttribute("data-tweet-id");
                let screenName = oya.getAttribute("data-screen-name");

                //ツイート詳細画面用
                if(tweetId == null || screenName == null){
                    let url = location.href;
                    url = url.substr(8).split('/');

                    tweetId = url[3];
                    screenName = url[1];
                }

                //親要素の作成設置
                let parentDiv = document.createElement('div');
                twAction.appendChild(parentDiv);
                parentDiv.className = 'ProfileTweet-action TwRepo';

                //ボタン要素作成
                let origButton = document.createElement('button');

                //ProfileTweet-actionの子要素としてボタン設置
                parentDiv.appendChild(origButton);

                //ボタンの設定
                origButton.innerText = "★";
                origButton.id = tweetId;
                origButton.setAttribute("data-sn",screenName);
                origButton.style.width = '70px';
                origButton.style.fontSize = '13px';
                origButton.addEventListener('click', reportFunc)
            }
        }
    }
}

//ボタンが押されたらidをsnをバックグラウンドへ渡し，報告ページを開く
function reportFunc(){
    let setTweetId = this.id;
    let setScreenName = this.dataset.sn;

    chrome.runtime.sendMessage({
        id: setTweetId,
        sn: setScreenName
      },
      function (response) {
        if (response) {
          console.log("bg->main");
        }
      }
    );

    //"児童の性的搾取に関する問題を報告する"ページを開き
    //以降はreport.jsで処理
    window.open('https://help.twitter.com/forms/cse');
}


let count = 0;
let changeURL = 1;
let oldUrl = location.href;
//DOM変化検知
let TagId = document.getElementsByTagName('html')[0];
let observer = new MutationObserver(setButton);
let config = {childList: true, subtree: true};
observer.observe(TagId, config);