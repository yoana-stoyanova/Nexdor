import { html, render } from 'https://cdn.skypack.dev/lit';
import { position } from './get-block.js';


let block = JSON.parse(localStorage.getItem('block'));

if(!block) window.open("../index.html?nocache=" + Date.now(), "_self");

document.addEventListener("DOMContentLoaded", function () {
    console.log('loaded');
    console.log(block, 'aaa');

    let settingsBtn = document.getElementById("profile-icon");
    let inputField = document.getElementById("search-bar");
    let searchBtn = document.getElementById("search-btn");
    let title = document.getElementById("block-apt")
    let aptList = document.getElementById("apt-list");

    // if(position == 'member') {
    //     settingsBtn.style.display = 'none';
    // }

    title.textContent = `Бл. ${block["name"]} - Апартаменти`;

    let apts = block["apartments"];
    render(fillAptList(apts), aptList);

    searchBtn.addEventListener('click', function(e){ //search
        let input = inputField.value;

        let res = apts.filter(x => String(x["id"]).includes(input));
        render(fillAptList(res), aptList);

        history.pushState({ search: input }, "", `?search=${input}`);
    });

    let searchQuery = localStorage.getItem("searchQuery");
    if (searchQuery) {
        inputField.value = searchQuery;
        searchBtn.click();
        localStorage.removeItem('searchQuery');
    }

    function createDoor(apt){
        return html`
            <div id="${apt["id"]}" class="apt">
                <img src="./icons/apt-door.png" alt="door">
                <p>${apt["id"]}</p>
            </div>
        `;
    }

    function fillAptList(apts){
        return html`
        ${apts.map(apt => createDoor(apt))}
        `;
    }

    window.addEventListener("popstate", (event) => {
        let input = event.state ? event.state.search : "";
        let filteredApts = apts.filter(x => String(x.id).includes(input));

        render(fillAptList(filteredApts), aptList);
    });
    
    const aptOptionsPopup = document.getElementById("apt-options-popup"); 

    document.addEventListener("click", function(event) { //show apt options
        const apt = event.target.closest(".apt");

        if (apt && aptList.contains(apt)) {
            const num = apt.getAttribute('id');
            localStorage.setItem('apt-id', num);
            console.log(localStorage.getItem('apt-id'));
            
                
            let x = event.clientX;
            let y = event.clientY;
            const popupWidth = aptOptionsPopup.offsetWidth;
            const popupHeight = aptOptionsPopup.offsetHeight;

            if (x + popupWidth > window.innerWidth) x = window.innerWidth - popupWidth - 10;
            if (x < 10) x = 10;
            if (y + popupHeight > window.innerHeight) y = window.innerHeight - popupHeight - 10;
            if (y < popupHeight + 10) y = popupHeight + 10;
            
            console.log("Clicked an apt! Position:", x, y);

            aptOptionsPopup.style.position = "absolute";
            aptOptionsPopup.style.left = `${x}px`;
            aptOptionsPopup.style.top = `${y - 30}px`;
    
            aptOptionsPopup.style.display = "block"; 
            aptOptionsPopup.style.opacity = "1";
        } 
        else if (!aptOptionsPopup.contains(event.target)) {
            console.log("Clicked outside, hiding popup");
            aptOptionsPopup.style.display = "none";
            aptOptionsPopup.style.opacity = "0";

            localStorage.removeItem('apt-id');
        }
    });

    document.addEventListener('click', function(event) { //toggle-untoggle
        const allApts = document.querySelectorAll('.apt');
        allApts.forEach(apt => apt.classList.remove('toggled'));
        
        if (event.target.closest('.apt')) {
            event.target.closest('.apt').classList.add('toggled');
        } else {
            allApts.forEach(apt => apt.classList.remove('toggled'));
        }


    });

    window.addEventListener("message", function (event) { //X-icon
        if (event.data.action === "hidePopup" && event.data.iframeId) {
            let iframe = document.getElementById(event.data.iframeId);
            
            if (iframe) {
                let popupDiv = iframe.closest("div");
                if (popupDiv) {
                    popupDiv.style.display = "none";
                }
            }
        }

        if (event.data.type === "searchQuery") {
            inputField.value = event.data.value;
            searchBtn.click();
        }
    });

    settingsBtn.addEventListener('click', function(e) {
        let blockSettingsPopup = document.getElementById('settings-popup');

        if(blockSettingsPopup.style.display != 'flex'){
            blockSettingsPopup.style.display = 'flex';
        }
        else {
            blockSettingsPopup.style.display = 'none';
        }
    });

    window.addEventListener('message', function(event) {
        if (event.data === 'iframe-updated') {
            setTimeout(() => {
            window.location.href = window.location.pathname + "?nocache=" + new Date().getTime();
            }, 100);
        }
    });

    window.addEventListener('message', (event) => {
        if (event.data === 'sendToIndex') {
            setTimeout(() => {
                window.open("../../index.html?nocache=" + Date.now(), "_self");
              }, 100);
        }
      });
    

});
