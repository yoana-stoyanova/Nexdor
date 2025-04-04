import { updateBlockKey } from "../../db-config/firebaseFunctions.js";
import { blockId as id, updateBlockStorage } from "../../js/get-block.js";

let block = JSON.parse(sessionStorage.getItem('block'));

let newKeyField = document.getElementById('new-key');
let passwordField = document.getElementById('password');
let sendBtn = document.getElementById('send-btn');
let xBtn = document.getElementById('X-icon');

sendBtn.addEventListener('click', async function(e) {
    const regex = /^.{2,}$/;

    if(regex.test(newKeyField.value.trim()) == '') return;
    if(passwordField.value != block['password']) return;

    updateBlockKey(id, newKeyField.value);

    newKeyField.value = '';
    passwordField.value = '';

    await updateBlockStorage(id);

    parent.postMessage('iframe-updated', '*');
});