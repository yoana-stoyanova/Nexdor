import { html, render } from 'https://cdn.skypack.dev/lit';
import { deleteEvent } from '../../db-config/firebaseFunctions.js';
import { updateAptStorage, updateBlockStorage } from '../get-block.js';

let block = JSON.parse(localStorage.getItem('block'));
let apt = JSON.parse(localStorage.getItem('apt'));

let evtList = document.getElementById("all-event-list");
render(fillEvtList(apt['events']), evtList);

evtList.addEventListener("click", (event) => {
    if(event.target.getAttribute('class') == 'del-btn') return;

    let evtId = event.target.closest('.event-container').getAttribute("id");
    
    window.parent.postMessage({ action: "ShowEvtFromAll", evtId }, "*");
});

let delBtns = document.querySelectorAll('.del-btn');

delBtns.forEach(btn => 
    btn.addEventListener('click', async function(event) {
        if(event.target.getAttribute('class') != 'del-btn') return;
        if(event.target.getAttribute('id') == 'all-event-list') return;

        let evtId = event.target.closest('.event-container').getAttribute("id");

        await deleteEvent(block.id, apt.id, evtId);

        await updateBlockStorage();
        await updateAptStorage();
        
        parent.postMessage('iframe-updated', '*');
    })
);

function createEvent(evt){
    let thumbnail;

    if (evt.title.length <= 50) {
        thumbnail = evt.title;
    } else {
        thumbnail = evt.title.slice(0, 50) + "..."; 
    }

    return html`
        <div id=${evt.id} class="event-container">
            <div class="event">
                <p>${thumbnail}</p>
            </div>
            <button class="del-btn">Изтриване</button>
        </div>
    `;
}

function fillEvtList(evts){
    return html`
        ${evts.map(evt => createEvent(evt))}
    `;
}