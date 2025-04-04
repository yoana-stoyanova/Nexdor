window.addEventListener('DOMContentLoaded', function(e){
    let changeBlockNameBtn = document.getElementById('change-block-name');
    let changeBlockPassBtn = document.getElementById('change-block-pass');
    let changeBlockKeyBtn = document.getElementById('change-block-key');
    let showAptPassBtn = document.getElementById('show-apt-passwords');
    let deleteBlockBtn = document.getElementById('delete-block');
    let exitBlockBtn = document.querySelector('button');
    let blockIdField = document.getElementById('block-id');
    
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

    exitBlockBtn.addEventListener('click', function(e) {
        localStorage.clear();
        setTimeout(() => {
            window.location.href = "../../catalogue.html?nocache=" + new Date().getTime();
          }, 100);
    })

    blockIdField.textContent = `(ID: ${localStorage.getItem('id')})`;
});
