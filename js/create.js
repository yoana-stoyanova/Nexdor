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
    
    const regex = /^\S{6,25}$/

    if(!(regex.test(id.trim()))) {
        document.getElementById('id').style.borderColor = 'red';
        return;
    } else {
        document.getElementById('id').style.borderColor = '#2B2742';
    }

    if(!(regex.test(password.trim()))) {
        document.getElementById('password').style.borderColor = 'red';
        return;
    } else {
        document.getElementById('password').style.borderColor = '#2B2742';
    }

    if(!(password == rePass)) {
        document.getElementById('re-pass').style.borderColor = 'red';
        return;
    } else {
        document.getElementById('re-pass').style.borderColor = '#2B2742';
    }

    document.getElementById("part-one").style.display = "none";
    document.getElementById("part-two").style.display = "flex";

    createBtn.addEventListener('click', async function(e) {
        e.preventDefault();

        let num = document.getElementById('num').value;
        let key = document.getElementById('key').value;
        let reKey = document.getElementById('re-key').value;  

        if(!num.trim()) {
            document.getElementById('num').style.borderColor = 'red';
            return;
        } else {
            document.getElementById('num').style.borderColor = '#2B2742';
        }

        if(!(regex.test(key.trim()))) {
            document.getElementById('key').style.borderColor = 'red';
            return;
        } else {
            document.getElementById('key').style.borderColor = '#2B2742';
        }

        if(key != reKey) {
            document.getElementById('re-key').style.borderColor = 'red';
            return;
        } else {
            document.getElementById('re-key').style.borderColor = '#2B2742';
        }

        let apartments = Array.from({ length: num }, (_, i) => ({
            id: i + 1,
            name: `Няма име`,
            password: generatePassword(),
            messages: [],
            events: []
        }));

        let block = {
            id,
            name: `(Блокът няма име)`,
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