export function showChangeBlockNamePopup(){
    window.parent.postMessage({ action: 'showChangeAptNamePopup' }, '*');
}

export function showChangeBlockPassPopup(){
    window.parent.postMessage({ action: 'showChangeAptPassPopup' }, '*');
}

window.addEventListener("message", (event) => {
    
    if (event.data.action === "showChangeAptNamePopup") {
        let popup = document.getElementById("change-name");
        if (popup) {
            popup.style.display = "flex";
        }
    }

    if (event.data.action === "showChangeAptPassPopup") {
        let popup = document.getElementById("change-password");
        if (popup) {
            popup.style.display = "flex";
        }
    }
    
});