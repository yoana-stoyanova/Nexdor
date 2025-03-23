window.addEventListener('DOMContentLoaded', function(e){
    let changeBlockNameBtn = document.getElementById('change-block-name');
    let changeBlockPassBtn = document.getElementById('change-block-pass');
    let changeBlockKeyBtn = document.getElementById('change-block-key');
    let showAptPassBtn = document.getElementById('show-apt-passwords');
    let deleteBlockBtn = document.getElementById('delete-block');
    
    changeBlockNameBtn.addEventListener("click", () => {
        window.parent.postMessage({ action: "showChangeBlockNamePopup" }, "*");
    });

    changeBlockPassBtn.addEventListener("click", () => {
        window.parent.postMessage({ action: "showChangeBlockPassPopup" }, "*");
    });

    changeBlockKeyBtn.addEventListener("click", () => {
        window.parent.postMessage({ action: "showChangeBlockKeyPopup" }, "*");
    });

    showAptPassBtn.addEventListener("click", () => {
        window.parent.postMessage({ action: "showAptPassPopup" }, "*");
    });

    deleteBlockBtn.addEventListener("click", () => {
        window.parent.postMessage({ action: "showDeleteBlockPopup" }, "*");
    });
});