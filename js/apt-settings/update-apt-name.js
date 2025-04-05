import { updateAptName } from "../../db-config/firebaseFunctions.js";
import { blockId as id, updateAptStorage, updateBlockStorage } from "../../js/get-block.js";

let block = JSON.parse(localStorage.getItem('block'));
let apt = JSON.parse(localStorage.getItem('apt'));

let newNameField = document.getElementById('new-name');
let passwordField = document.getElementById('password');
let sendBtn = document.getElementById('send-btn');

newNameField.value = apt['name'];

sendBtn.addEventListener('click', async function(e) {
    const regex = /^.{6,}$/;

    if(regex.test(newNameField.value.trim()) == '') return;
    if(passwordField.value != apt['password']) return;

    updateAptName(id, apt['id'], newNameField.value);

    await updateBlockStorage();
    await updateAptStorage();

    parent.postMessage('iframe-updated', '*');
});