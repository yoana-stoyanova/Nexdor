import { addEventToApartments, addMessageToApartment } from '../../db-config/firebaseFunctions.js';
import { updateAptStorage } from '../get-block.js';

let block = JSON.parse(localStorage.getItem('block'));
let apt = JSON.parse(localStorage.getItem('apt'));

document.addEventListener("DOMContentLoaded", function () {

let evtTitle = document.getElementById('topic').querySelector('input');
let textarea = document.querySelector('textarea');
let sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async function() {
    let titleRegex = /^.{1,70}$/;
    let evtRegex = /^.{1,2000}$/;
    
    if(!titleRegex.test(evtTitle.value)) return;
    if(!evtRegex.test(textarea.value)) return;

    let event = {
        id: generateId(),
        from: apt.id,
        title: evtTitle.value,
        content: textarea.value
    }

    await addEventToApartments(block.id, event);
    await updateAptStorage();

    evtTitle.value = '';
    textarea.value = '';

    parent.postMessage('iframe-updated', '*');
    
});

function generateId(length = 6) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

});