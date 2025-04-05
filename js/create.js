import { addBlock, allBlocksArr, getAllBlocks } from "../db-config/firebaseFunctions.js";

let continueBtn = document.getElementById('continue-btn');
let createBtn = document.getElementById('create-btn');

continueBtn.addEventListener('click', async function(e) {
    e.preventDefault();

    let id = document.getElementById('id').value;
    let password = document.getElementById('password').value;
    let rePass = document.getElementById('re-pass').value;

    let arr = await allBlocksArr();

    let taken = false;
    if(arr.find(x => x.id == id)) taken = true;
    if(taken) return;
    
    const regex = /^.{6,}$/;

    if(!(regex.test(id.trim()) && regex.test(password.trim()) && password == rePass)) return;

    document.getElementById("part-one").style.display = "none";
    document.getElementById("part-two").style.display = "flex";

    createBtn.addEventListener('click', async function(e) {
        e.preventDefault();

        let num = document.getElementById('num').value;
        let key = document.getElementById('key').value;
        let reKey = document.getElementById('re-key').value;  

        if(!(num.trim() && regex.test(key.trim()) && key == reKey)) return;

        let apartments = Array.from({ length: num }, (_, i) => ({
            id: i + 1,
            name: `${i + 1}`,
            password: generatePassword(),
            messages: [],
            events: []
        }));

        let block = {
            id,
            name: `"${id}"`,
            password,
            key,
            apartments
        }

        await addBlock(block);

        console.log(localStorage.getItem('block'));

        setTimeout(() => {
            window.location.href = "./catalogue.html?nocache=" + new Date().getTime();
            // window.location.href = "https://yoana-stoyanova.github.io/Nexdor/catalogue.html";
        }, 100);

    });

});

function generatePassword(length = 6) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}