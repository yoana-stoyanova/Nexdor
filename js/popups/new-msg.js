import { html, render } from 'https://cdn.skypack.dev/lit';
import { addMessageToApartment } from '../../db-config/firebaseFunctions.js';
import { updateAptStorage } from '../get-block.js';

let block = JSON.parse(localStorage.getItem('block'));
let apt = JSON.parse(localStorage.getItem('apt'));

document.addEventListener("DOMContentLoaded", function () {

let optionsList = document.querySelector('select');
    
render(allRecipientOptions(block['apartments']), optionsList);

let msgTitle = document.getElementById('topic').querySelector('input');
let textarea = document.querySelector('textarea');
let sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async function() {
    let titleRegex = /^.{1,70}$/;
    let msgRegex = /^.{1,2000}$/;
    
    if(!titleRegex.test(msgTitle.value)) return;
    if(!msgRegex.test(textarea.value)) return;

    let message = {
        id: generateId(),
        to: optionsList.value,
        from: apt.id,
        title: msgTitle.value,
        content: textarea.value
    }

    console.log(message.to);
    

    await addMessageToApartment(block.id, message.to, message);
    await updateAptStorage();  

    msgTitle.value = '';
    textarea.value = '';
    
    parent.postMessage('iframe-updated', '*');
    
});

function createRecipientOption(apt) {
    return html`
        <option class="input" value=${apt.id}>ап. ${apt.id} (${apt.name})</option>
    `;
}

function allRecipientOptions (apts) {
    return html`
        ${apts.map(apt => createRecipientOption(apt))}
    `;
}

function generateId(length = 6) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

});