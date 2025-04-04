export function showSendMessagePopup() {
    window.parent.postMessage({ action: 'showSendMsgPopup' }, '*');
}

export function showEnterPopup() {
    window.parent.postMessage({ action: 'showEnterPopup' }, '*');
}

export function showChangeBlockNamePopup(){
    window.parent.postMessage({ action: 'showChangeBlockNamePopup' }, '*');
}

export function showChangeBlockPassPopup(){
    window.parent.postMessage({ action: 'showChangeBlockPassPopup' }, '*');
}

export function showChangeBlockKeyPopup(){
    window.parent.postMessage({ action: 'showChangeBlockKeyPopup' }, '*');
}

export function showAptPassPopup(){
    window.parent.postMessage({ action: 'showAptPassPopup' }, '*');
}

export function showDeleteBlockPopup(){
    window.parent.postMessage({ action: 'showDeleteBlockPopup' }, '*');
}

window.addEventListener("message", (event) => {
    if (event.data.action === "showSendMsgPopup") {
        let popup = document.getElementById("apt-send-msg-popup");
        if (popup) {
            popup.style.display = "flex";
        }
    }

    if (event.data.action === "showEnterPopup") {
        let popup = document.getElementById("apt-enter-popup");
        if (popup) {
            console.log(sessionStorage.getItem('apt-id'));
            popup.style.display = "flex";
        }
    }

    if (event.data.action === "showChangeBlockNamePopup") {
        let popup = document.getElementById("change-block-name-popup");
        if (popup) {
            popup.style.display = "flex";
        }
    }

    if (event.data.action === "showChangeBlockPassPopup") {
        let popup = document.getElementById("change-block-password-popup");
        if (popup) {
            popup.style.display = "flex";
        }
    }

    if (event.data.action === "showChangeBlockKeyPopup") {
        let popup = document.getElementById("change-block-key-popup");
        if (popup) {
            popup.style.display = "flex";
        }
    }

    if (event.data.action === "showAptPassPopup") {
        let popup = document.getElementById("show-apt-passwords-popup");
        if (popup) {
            popup.style.display = "flex";
        }
    }

    if (event.data.action === "showDeleteBlockPopup") {
        let popup = document.getElementById("delete-block-popup");
        if (popup) {
            popup.style.display = "flex";
        }
    }

    
});