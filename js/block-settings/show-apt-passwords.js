import { html, render } from 'https://cdn.skypack.dev/lit';

let block = JSON.parse(localStorage.getItem('block'));

let aptPasswords = [];

block['apartments'].forEach(apt => {
    aptPasswords.push(apt.password);
});

let passwordList = document.getElementById("all-msg-list");

render(block['apartments'].map(apt => createPasswordLine(apt.id)), passwordList);

passwordList.querySelectorAll('.all-message').forEach(el => {
    el.querySelector('p').addEventListener('click', () => togglePassword(el));
})

function createPasswordLine(num){
    return html`
        <div class="all-message">
            <h4 class="apt-num">${num}: </h4>
            <p class="apt-pass">Покажи парола</p>   
        </div>
    `
}

function togglePassword(element) {
    let num = element.querySelector('h4').textContent;
    num = num.split(':');
    num = Number(num[0]);

    const passwordText = element.querySelector('p');
    if (passwordText.textContent == "Покажи парола") {
        passwordText.textContent = `${block['apartments'][num - 1].password}`;
    } else {
        passwordText.textContent = "Покажи парола";
    }
}