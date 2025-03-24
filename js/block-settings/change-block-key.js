import { updateBlockKey } from "../../db-config/firebaseFunctions.js";
import { block } from "../get-block.js";

let newKeyField = document.getElementById('new-key');
let passwordField = document.getElementById('password');
let sendBtn = document.getElementById('send-btn');
let xBtn = document.getElementById('X-icon');

sendBtn.addEventListener('click', function(e) {
    const regex = /^.{2,}$/;

    if(regex.test(newKeyField.value.trim()) == '') return;
    if(passwordField.value != block['password']) return;

    updateBlockKey(block["id"], newKeyField.value);

    newKeyField.value = '';
    passwordField.value = '';

    xBtn.click();
});