window.addEventListener('DOMContentLoaded', function(e){
    
    let changeAptNameBtn = document.getElementById('change-apt-name');
    let changeAptPassBtn = document.getElementById('change-apt-pass');
    let exitAptBtn = document.querySelector('button');
    
    changeAptNameBtn.addEventListener("click", () => {
        window.parent.postMessage({ action: "showChangeAptNamePopup" }, "*");
    });

    changeAptPassBtn.addEventListener("click", () => {
        window.parent.postMessage({ action: "showChangeAptPassPopup" }, "*");
    });

    exitAptBtn.addEventListener('click', function(e) {
        sessionStorage.clear();
        window.location.href = "https://yoana-stoyanova.github.io/Nexdor/catalogue.html";
    })

});