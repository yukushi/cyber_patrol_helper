document.getElementById("saveTemp").onclick = function(){
    let anythingElse,yourMail;
    anythingElse = document.getElementById("template").value;
    yourMail = document.getElementById("mail").value;

    chrome.runtime.sendMessage({
        setTemp: anythingElse,
        setMail: yourMail
      }
    );

}