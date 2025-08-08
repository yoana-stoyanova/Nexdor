window.addEventListener('DOMContentLoaded', function(e){
    let sendMsgBtn = document.getElementById('send-msg-btn');
    let enterBtn = document.getElementById('enter-btn');

    enterBtn.addEventListener("click", () => {
        window.parent.postMessage({ action: "showEnterPopup" }, "*");
    });
});

