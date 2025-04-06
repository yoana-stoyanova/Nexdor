import { updateBlockPassword } from "../../db-config/firebaseFunctions.js";
import { blockId as id, updateBlockStorage } from "../../js/get-block.js";

let block = JSON.parse(localStorage.getItem('block'));

let newPassField = document.getElementById('new-password');
let passwordField = document.getElementById('old-password');
let sendBtn = document.getElementById('send-btn');
let xBtn = document.getElementById('X-icon');

sendBtn.addEventListener('click', async function(e) {
    const regex = /^\S{6,25}$/

    if(regex.test(newPassField.value.trim()) == '') return;
    if(passwordField.value != block['password']) return;

    updateBlockPassword(id, newPassField.value);

    newPassField.value = '';
    passwordField.value = '';

    await updateBlockStorage(id);

    parent.postMessage('iframe-updated', '*');
});