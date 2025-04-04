import { html, render } from 'https://cdn.skypack.dev/lit';
import { allBlocksArr } from '../db-config/firebaseFunctions.js';

let info = document.getElementById('left-side-info');

function formOption(type) { 
    let memberTemplate = html`
        <h1>Влизане в блок</h1>
        <p>Добре дошли! Моля въведете ID и общия ключ на Вашия блок.</p>
        <p>
            <a id="member" style="color: ${type === "member" ? "black" : "#2B2742"}">Жител</a> /
            <a id="manager" style="color: ${type === "manager" ? "black" : "#2B2742"}">Управител</a>
        </p>
        <form id="member-form" action="POST">
            <label for="id">ID:</label>
            <input id="id" name="id" type="text" placeholder="Въведете ID...">
            <label for="key">Общ ключ:</label>
            <input id="key" name="key" type="password" placeholder="Въведете ключ...">
            <button id="enter-btn">Вход</button>
            <p>Искате да <a href="./create.html">създадете</a> нов блок?</p>
        </form>
    `;
    
    let managerTemplate = html`
        <h1>Влизане в блок</h1>
        <p>Добре дошли! Моля въведете ID и паролата на Вашия блок.</p>
        <p>
            <a id="member" style="color: ${type === "member" ? "black" : "#2B2742"}">Жител</a> /
            <a id="manager" style="color: ${type === "manager" ? "black" : "#2B2742"}">Управител</a>
        </p>
        <form id="manager-form" action="POST">
            <label for="id">ID:</label>
            <input id="id" name="id" type="text" placeholder="Въведете ID...">
            <label for="password">Парола:</label>
            <input id="password" name="password" type="password" placeholder="Въведете парола...">
            <button id="enter-btn">Вход</button>
            <p>Искате да <a href="./create.html">създадете</a> нов блок?</p>
        </form>
    `;

    render(type == "member" ? memberTemplate : managerTemplate, info);

    document.getElementById("member").addEventListener("click", () => formOption("member"));
    document.getElementById("manager").addEventListener("click", () => formOption("manager"));

    if(type == "member"){
        document.getElementById('enter-btn').addEventListener('click', memberEnter);
    } else {
        document.getElementById('enter-btn').addEventListener('click', managerEnter);
    }
}

formOption('member');

async function memberEnter(e) {
    e.preventDefault();

    let id = document.getElementById('id').value;
    
    let key = document.getElementById('key').value;

    const regex = /^.{2,}$/;

    if(!(regex.test(id.trim()) != '' && regex.test(key.trim()) != '')) return;

    let arr = await allBlocksArr();

    let block = arr.find(x => x.id == id && x.key == key);

    if(block){
        sessionStorage.setItem('position', 'member');
        sessionStorage.setItem('block', JSON.stringify(block));
        sessionStorage.setItem('id', id);
    } else {
        return;
    }

    window.location.href = "https://yoana-stoyanova.github.io/Nexdor/catalogue.html";

}

async function managerEnter(e) {
    e.preventDefault();

    let id = document.getElementById('id').value;
    let password = document.getElementById('password').value;

    const regex = /^.{2,}$/;

    if(!(regex.test(id.trim() )!= '' && regex.test(password.trim()) != '')) return;

    let arr = await allBlocksArr();

    let block = arr.find(x => x.id == id && x.password == password);

    if(block){
        sessionStorage.setItem('position', 'manager');
        sessionStorage.setItem('block', JSON.stringify(block));
        sessionStorage.setItem('id', id);
    } else {
        return;
    }

    window.location.href = "https://yoana-stoyanova.github.io/Nexdor/catalogue.html";

}

