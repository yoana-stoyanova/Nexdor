import { updateAptPassword } from "../../db-config/firebaseFunctions.js";
import { blockId as id, updateAptStorage, updateBlockStorage } from "../../js/get-block.js";

let block = JSON.parse(localStorage.getItem('block'));
let apt = JSON.parse(localStorage.getItem('apt'));

let newPassField = document.getElementById('new-password');
let passwordField = document.getElementById('old-password');
let sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async function(e) {
    const regex = /^\S{6,25}$/

    if(regex.test(newPassField.value.trim()) == '') return;
    if(passwordField.value != apt['password']) return;

    updateAptPassword(id, apt['id'], newPassField.value);

    await updateBlockStorage();
    await updateAptStorage();

    parent.postMessage('iframe-updated', '*');
});