import { updateBlockPassword } from "../../db-config/firebaseFunctions.js";
import { block } from "../get-block.js";

let newPassField = document.getElementById('new-password');
let passwordField = document.getElementById('old-password');
let sendBtn = document.getElementById('send-btn');
let xBtn = document.getElementById('X-icon');

sendBtn.addEventListener('click', function(e) {
    const regex = /^.{2,}$/;

    if(regex.test(newPassField.value.trim()) == '') return;
    if(passwordField.value != block['password']) return;

    updateBlockPassword(block["id"], newPassField.value);

    newPassField.value = '';
    passwordField.value = '';

    xBtn.click();
});