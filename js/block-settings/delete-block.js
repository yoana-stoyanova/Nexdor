import { deleteBlock } from "../../db-config/firebaseFunctions.js";
import { blockId as id } from "../../js/get-block.js";

let block = JSON.parse(localStorage.getItem('block'));

let passwordField1 = document.getElementById('1-password');
let passwordField2 = document.getElementById('2-password');
let sendBtn = document.getElementById('send-btn');
let xBtn = document.getElementById('X-icon');

sendBtn.addEventListener('click', function(e) {
    const regex = /^.{2,}$/;

    if(passwordField1.value != block['password']) return;
    if(passwordField2.value != block['password']) return;

    deleteBlock(id);

    localStorage.clear();

    setTimeout(() => {
        window.location.href = "./index.html?nocache=" + new Date().getTime();
      }, 100);
});