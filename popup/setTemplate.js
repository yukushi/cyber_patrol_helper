let temp,mail;

temp = localStorage.getItem("template");
mail = localStorage.getItem("yourMail");

if(temp != undefined) document.getElementById("template").value = temp;
if(mail != undefined) document.getElementById("mail").value = mail;

// document.getElementById("template").value = localStorage.getItem('template');
// document.getElementById("mail").value = localStorage.getItem('yourMail');

document.getElementById("saveTemp").onclick = function(){
    let anythingElse,yourMail;
    anythingElse = document.getElementById("template").value;
    yourMail = document.getElementById("mail").value;

    if(anythingElse != "" || yourMail != ""){
        document.getElementById("notification").innerText = "保存されました";
    }

    chrome.runtime.sendMessage({
        setNo: 1,
        setTemp: anythingElse,
        setMail: yourMail
      }
    );
}

document.getElementById("resetTemp").onclick = function(){
    localStorage.removeItem("template");
    localStorage.removeItem("yourMail");
    document.getElementById("notification").innerText = "リセットされました";
}