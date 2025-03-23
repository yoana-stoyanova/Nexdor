document.addEventListener("DOMContentLoaded", function () {
    let closeBtn = document.getElementById("X-icon");

    closeBtn.addEventListener("click", function () {
        window.parent.postMessage({ 
            action: "hidePopup", 
            iframeId: window.frameElement.id 
            }, "*");
    });
});
