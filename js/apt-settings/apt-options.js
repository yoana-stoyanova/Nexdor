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
        localStorage.removeItem('apt');
        
        setTimeout(() => {
            window.top.location.href = "../../catalogue.html?nocache=" + Date.now();
          }, 100);
    })

});