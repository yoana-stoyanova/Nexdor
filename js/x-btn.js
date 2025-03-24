document.addEventListener("DOMContentLoaded", function () {
    let closeBtn = document.getElementById("X-icon");
    let sendBtn = document.getElementById("send-btn");

    closeBtn.addEventListener("click", function () {
        window.parent.postMessage({ 
            action: "hidePopup", 
            iframeId: window.frameElement.id 
            }, "*");
    });

});
