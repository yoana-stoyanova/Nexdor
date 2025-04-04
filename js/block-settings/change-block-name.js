import { updateBlockName } from "../../db-config/firebaseFunctions.js";
import { blockId as id, updateBlockStorage } from "../../js/get-block.js";

let block = JSON.parse(sessionStorage.getItem('block'));

let newNameField = document.getElementById('new-name');
let passwordField = document.getElementById('password');
let sendBtn = document.getElementById('send-btn');
let xBtn = document.getElementById('X-icon');

newNameField.value = block['name'];

sendBtn.addEventListener('click', async function(e) {
    const regex = /^.{2,}$/;

    if(regex.test(newNameField.value.trim()) == '') return;
    if(passwordField.value != block['password']) return;

    updateBlockName(id, newNameField.value);

    newNameField.value = block['name'];
    passwordField.value = '';

    await updateBlockStorage(id);

    parent.postMessage('iframe-updated', '*');
});



