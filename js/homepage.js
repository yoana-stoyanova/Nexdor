import { html, render } from 'https://cdn.skypack.dev/lit';

let block = JSON.parse(localStorage.getItem('block'));
let apt = JSON.parse(localStorage.getItem('apt'));

document.addEventListener("DOMContentLoaded", function () {
    let inputField = document.getElementById("search-bar");
    let searchBtn = document.getElementById("search-btn");
    let title = document.getElementById('block-apt');
    let msgList = document.getElementById('messages');
    let evtList = document.getElementById('event');

    title.textContent = `Бл. ${block.name} - ап. ${apt.id} (${apt.name})`;
    render(fillMsgList(apt['messages']), msgList);
    render(fillEvtList(apt['events']), evtList);

    let apts = block["apartments"];
    searchBtn.addEventListener("click", function () {
        console.log('clicked');
        
        let searchValue = inputField.value;
        localStorage.setItem("searchQuery", searchValue);

        window.location.href = './catalogue.html';
    });

    document.getElementById('create-msg').addEventListener('click', function () {
        document.getElementById('new-msg').style.display = 'flex';
    })
    document.getElementById('create-evt').addEventListener('click', function () {
        document.getElementById('new-event').style.display = 'flex';
    })
    
    let showMsgIframe = document.getElementById('read-msg-popup');
    let showEvtIframe = document.getElementById('read-event-popup');

    window.addEventListener("message", function (event) { //X-icon && showMsgFromAll
        if (event.data.action === "hidePopup" && event.data.iframeId) {
            let iframe = document.getElementById(event.data.iframeId);
            
            if (iframe) {
                let popupDiv = iframe.closest("div");
                if (popupDiv) {
                    popupDiv.style.display = "none";
                }
            }
        }

        if (event.data.action === "ShowMsgFromAll") {
            let msgId = event.data.msgId;
            showMsgIframe.contentWindow.postMessage({ action: "updateShowMsgPopup", msgId }, "*");
            document.getElementById('read-msg').style.display = 'flex';
        }
    });

    msgList.addEventListener("click", (event) => {
        if(event.target.closest('div').getAttribute('class') == 'message'){
            let msgId = event.target.closest('div').getAttribute("id");
            showMsgIframe.contentWindow.postMessage({ action: "updateShowMsgPopup", msgId }, "*");
            document.getElementById('read-msg').style.display = 'flex';
        }
    });

    evtList.addEventListener("click", (event) => {
        if(event.target.closest('div').getAttribute('class') == 'event'){
            let evtId = event.target.closest('div').getAttribute("id");
            showEvtIframe.contentWindow.postMessage({ action: "updateShowEvtPopup", evtId }, "*");
            document.getElementById('read-event').style.display = 'flex';
        }
    });

    let allMsgPopup = document.getElementById('all-msg');
    let showAllMsg = document.getElementById('see-all-msg-btn');

    showAllMsg.addEventListener('click', function() {
        allMsgPopup.style.display = 'flex';
    });
});

function createMessage(msg) {
    let thumbnail;

    if (msg.title.length <= 40) {
        thumbnail = msg.title;
    } else {
        thumbnail = msg.title.slice(0, 40) + "...";
    }

    return html`
        <div id="${msg.id}" class="message">
            <img src="./icons/letter.png" alt="">
            <p>${thumbnail}</p>      
        </div>
    `;
}

function fillMsgList(msgs){
    return html`
        ${msgs.map(msg => createMessage(msg))}
    `;
}

function createEvent(evt){
    let thumbnail;

    if (evt.title.length <= 35) {
        thumbnail = evt.title;
    } else {
        thumbnail = evt.title.slice(0, 35) + "..."; 
    }

    return html`
        <div id="${evt.id}" class="event">
            <p>${thumbnail}</p>
        </div>
    `;
}

function fillEvtList(evts){
    return html`
        ${evts.map(evt => createEvent(evt))}
    `;
}

