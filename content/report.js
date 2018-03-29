let id,sn,temp,yourMail;

let waitLoad = function(){
    let twURL;
    
    //ラジオボタンチェック
    document.getElementById("twitter_cse").click();

    //URL生成
    twURL = `https://twitter.com/${sn}/status/${id}`

    //入力
    document.getElementById("tweet_url_1").value = twURL;
    document.getElementById("twitter_username").value = sn;
    document.getElementById("anything_else").value = temp;
    document.getElementById("email").value = yourMail;
}
setTimeout(waitLoad, 1000);

//バックグラウンドからidとsnを取得
chrome.runtime.sendMessage({
    res: 1
  },
  function (response) {
    if (response) {
      id = response.id;
      sn = response.sn;
      temp = response.any;
      yourMail = response.mail;
      console.log(id);
      console.log(sn);
      console.log(temp);
      console.log(yourMail);
    }
  }
);