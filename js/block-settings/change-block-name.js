import { updateBlockName } from "../../db-config/firebaseFunctions.js";
import { updateBlockStorage } from "../../js/get-block.js";

let block = JSON.parse(localStorage.getItem('block'));

let newNameField = document.getElementById('new-name');
let passwordField = document.getElementById('password');
let sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async function(e) {
    const regex = /^\S{6,25}$/;

    if(regex.test(newNameField.value.trim()) == '') return;
    if(passwordField.value != block['password']) return;

    updateBlockName(block.id, newNameField.value);

    newNameField.value = block['name'];
    passwordField.value = '';

    await updateBlockStorage(block.id);

    parent.postMessage('iframe-updated', '*');
});



