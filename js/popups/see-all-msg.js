import { html, render } from 'https://cdn.skypack.dev/lit';
import { deleteMessage } from '../../db-config/firebaseFunctions.js';
import { updateAptStorage, updateBlockStorage } from '../get-block.js';

let block = JSON.parse(localStorage.getItem('block'));
let apt = JSON.parse(localStorage.getItem('apt'));

let msgList = document.getElementById("all-msg-list");
render(fillMsgList(apt['messages']), msgList);

msgList.addEventListener("click", (event) => {
    if(event.target.getAttribute('class') == 'del-btn') return;

    if(event.target.closest('div').getAttribute('class') == 'all-message'){
        let msgId = event.target.closest('div').getAttribute("id");

        console.log(`Id from aLL: ${msgId}`);
        
        
        window.parent.postMessage({ action: "ShowMsgFromAll", msgId }, "*");
    }
});

let delBtns = document.querySelectorAll('.del-btn');

delBtns.forEach(btn => 
    btn.addEventListener('click', async function(event) {
        if(event.target.getAttribute('class') != 'del-btn') return;

        if(event.target.closest('div').getAttribute('class') == 'all-message'){
            let msgId = event.target.closest('div').getAttribute("id");
            console.log(msgId);

            await deleteMessage(block.id, apt.id, msgId);

            await updateBlockStorage();
            await updateAptStorage();
            
            parent.postMessage('iframe-updated', '*');
        }
    })
);

function createMessage(msg){
    let thumbnail;

    if (msg.title.length <= 40) {
        thumbnail = msg.title;
    } else {
        thumbnail = msg.title.slice(0, 40) + "...";
    }

    return html`
        <div id=${msg.id} class="all-message">
            <img src="../../icons/letter.png" alt="">
            <p>${thumbnail}</p>
            <button class="del-btn">Изтриване</button>      
        </div>
    `
}

function fillMsgList(msgs){
    return html`
        ${msgs.map(msg => createMessage(msg))}
    `;
}