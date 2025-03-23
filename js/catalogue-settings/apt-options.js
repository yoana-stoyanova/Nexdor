window.addEventListener('DOMContentLoaded', function(e){
    let sendMsgBtn = document.getElementById('send-msg-btn');
    let enterBtn = document.getElementById('enter-btn');
    
    sendMsgBtn.addEventListener("click", () => {
        window.parent.postMessage({ action: "showSendMsgPopup" }, "*");
    });

    enterBtn.addEventListener("click", () => {
        window.parent.postMessage({ action: "showEnterPopup" }, "*");
    });
});

